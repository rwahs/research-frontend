(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'querystring',
            'config/routes',
            'util/container',
            'models/DynamicRecord',
            'models/ListModeSwitcher',
            'models/ListSorter',
            'models/ListPager',
            'ui/pages/search/SearchInputField',
            'util/safelyParseJson'
        ],
        function (_, ko, qs, routes, container, DynamicRecord, ListModeSwitcher, ListSorter, ListPager, SearchInputField, safelyParseJson) {
            var int = function (value) {
                    return value ? parseInt(value, 10) : undefined;
                };

            return function (context) {
                var settings = container.resolve('settings.' + context.params.type),
                    selectedInputField = ko.observable(),
                    submittedQuery = ko.observable(),
                    results = ko.observableArray(),
                    query = qs.parse(window.location.search.replace(/^\?/, '')),
                    overlay = container.resolve('ui.overlay'),
                    typeFor = function (result) {
                        return container.resolve('types')[result.data().type];
                    },
                    doSearch = function (callback) {
                        submittedQuery(this.currentQuery());
                        results([]);
                        overlay.loading(true);
                        this.displayResults(false);
                        container.resolve('search.' + context.params.type)(
                            this.currentQuery(),
                            function (err, searchServiceResults) {
                                overlay.loading(false);
                                if (err) {
                                    overlay.error(err);
                                    return _.isFunction(callback) ? callback(err) : undefined;
                                }
                                results(_.map(searchServiceResults, function (result) {
                                    return new DynamicRecord(result, this.searchResultFields);
                                }.bind(this)));
                                this.displayResults(true);
                                if (_.isFunction(callback)) {
                                    callback();
                                }
                            }.bind(this)
                        );
                    }.bind(this);

                this.searchText = ko.observable(query.advanced ? '' : query.query || ''); // TODO FIXME
                this.advancedSearchQuery = ko.observable(query.advanced ? safelyParseJson(query.query) : undefined);
                this.advancedMode = ko.observable(!!query.advanced);
                this.searchInputFields = ko.observableArray();
                this.searchResultFields = ko.observableArray();
                this.displayResults = ko.observable(false);

                this.modeSwitcher = new ListModeSwitcher(query.mode);
                this.sorter = new ListSorter(results, this.searchResultFields, query.sort, query.dir);
                this.pager = new ListPager(this.sorter.sortedList, int(query.start), int(query.size));

                this.currentQuery = ko.pureComputed(function () {
                    return (this.advancedMode && this.advancedMode()) ?
                        this.advancedSearchQuery() :
                        this.basicSearchQuery();
                }.bind(this));

                this.basicSearchInputFields = ko.pureComputed(function () {
                    return this.searchInputFields().filter(function (field) {
                        return field.basicSearch();
                    });
                }.bind(this));

                this.basicSearchQuery = ko.pureComputed(function () {
                    var text = this.searchText();
                    return (text.length === 0) ?
                        undefined :
                        {
                            operator: 'AND',
                            children: _.map(
                                text.split(/\s+/),
                                function (term) {
                                    return {
                                        field: selectedInputField(),
                                        operator: 'contains',
                                        value: term
                                    };
                                }
                            )
                        };
                }.bind(this));

                this.displayedResults = ko.pureComputed(function () {
                    return this.pager.currentPage();
                }.bind(this));

                this.submittedQuery = ko.pureComputed(function () {
                    return submittedQuery();
                });

                this.heading = ko.pureComputed(function () {
                    return settings.collectionName + ' Search';
                });

                this.placeholder = ko.pureComputed(function () {
                    return selectedInputField() ?
                        _.find(this.searchInputFields(), function (field) {
                            return field.key() === selectedInputField();
                        }).placeholder() :
                        'Enter your search terms...';
                }.bind(this));

                this.advancedModeToggleText = ko.pureComputed(function () {
                    return this.advancedMode() ? 'Back to basic mode' : 'Advanced search';
                }.bind(this));

                this.hasResults = ko.pureComputed(function () {
                    return results().length > 0;
                });

                this.displaySearchInputFieldSwitch = ko.pureComputed(function () {
                    return this.basicSearchInputFields() && this.basicSearchInputFields().length > 1;
                }.bind(this));

                this.canSubmit = ko.pureComputed(function () {
                    return this.advancedMode() ?
                        this.advancedSearchQuery() && this.advancedSearchQuery().children.length > 0 :
                        this.searchText() && this.searchText().length > 0;
                }.bind(this));

                this.binding = function (element, callback) {
                    require(
                        [
                            settings.searchInputFields,
                            settings.searchResultFields
                        ],
                        function (searchInputFields, searchResultFields) {
                            this.searchInputFields(_.map(searchInputFields, function (type) {
                                return new SearchInputField(type, selectedInputField);
                            }));
                            this.searchInputFields()[0].makeActive();
                            this.searchResultFields(searchResultFields);
                            if (this.currentQuery()) {
                                doSearch(callback);
                            } else {
                                callback();
                            }
                        }.bind(this)
                    );
                };

                this.ready = function (element, callback) {
                    overlay.loading(false);
                    callback();
                };

                this.toggleAdvancedMode = function () {
                    this.advancedMode(!this.advancedMode());
                };

                this.reset = function () {
                    results([]);
                    this.displayResults(false);
                    this.searchText('');
                    this.searchInputFields()[0].makeActive();
                    this.advancedSearchQuery(undefined);
                };

                this.submit = function (callback) {
                    if (!this.canSubmit()) {
                        return;
                    }
                    this.pager.start(0);
                    routes.pushState(this.searchUrlFor({ query: JSON.stringify(this.currentQuery()) }));
                    doSearch(callback);
                    return false;
                };

                this.displayFor = function (field, result) {
                    if (_.isString(field)) {
                        field = _.find(this.searchResultFields(), { key: field });
                    }
                    return {
                        name: 'display/' + (field.display || 'text'),
                        params: {
                            data: result.data,
                            name: field.key,
                            display: field.display,
                            placeholder: field.placeholder
                        }
                    };
                };

                this.displayForLabelField = function (result) {
                    return this.displayFor(container.resolve('settings.' + typeFor(result)).labelField, result);
                };

                this.resultFor = function (result) {
                    return {
                        name: 'collections/' + typeFor(result) + '/' + this.modeSwitcher.mode().toLowerCase() + '-result',
                        params: this
                    };
                };

                this.searchUrlFor = function (overrides) {
                    var query;
                    query = {
                        query: JSON.stringify(submittedQuery()),
                        sort: this.sorter.field(),
                        dir: this.sorter.direction(),
                        start: this.pager.start(),
                        size: this.pager.pageSize(),
                        mode: this.modeSwitcher.mode()
                    };
                    if (this.advancedMode()) {
                        query.advanced = true;
                    }
                    return routes.searchUrlFor(context.params.type, _.defaults(overrides, query));
                }.bind(this);

                this.detailUrlFor = function (result) {
                    return routes.detailUrlFor(typeFor(result), result.id());
                };
            };
        }
    );
}());
