(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'querystring',
            'ui/responsive',
            'config/routes',
            'util/container',
            'models/DynamicRecord',
            'models/ListModeSwitcher',
            'models/ListSorter',
            'models/ListPager',
            'ui/pages/search/SearchType'
        ],
        function (_, ko, qs, responsive, routes, container, DynamicRecord, ListModeSwitcher, ListSorter, ListPager, SearchType) {
            var int = function (value) {
                    return value ? parseInt(value, 10) : undefined;
                };

            return function (context) {
                var settings = container.resolve('settings.' + context.params.type),
                    selectedSearchType = ko.observable(),
                    submittedQuery = ko.observable(),
                    results = ko.observableArray(),
                    query = qs.parse(window.location.search.replace(/^\?/, '')),
                    doSearch = function (callback) {
                        submittedQuery(this.searchText());
                        results([]);
                        this.loading(true);
                        this.displayResults(false);
                        container.resolve('search.' + context.params.type)(
                            _.zipObject(
                                [ selectedSearchType() ],
                                [ submittedQuery() ]
                            ),
                            function (err, searchServiceResults) {
                                this.loading(false);
                                if (err) {
                                    // TODO Display error
                                    return;
                                }
                                results(_.map(searchServiceResults, function (result) {
                                    return new DynamicRecord(result, this.searchResultFields);
                                }.bind(this)));
                                this.displayResults(true);
                                responsive.update();
                                if (_.isFunction(callback)) {
                                    callback();
                                }
                            }.bind(this)
                        );
                    }.bind(this);

                this.searchText = ko.observable(query.query || '');
                this.searchTypes = ko.observableArray();
                this.searchResultFields = ko.observableArray();
                this.loading = ko.observable(false);
                this.displayResults = ko.observable(false);

                this.modeSwitcher = new ListModeSwitcher(query.mode);
                this.sorter = new ListSorter(results, this.searchResultFields, query.sort, query.dir);
                this.pager = new ListPager(this.sorter.sortedList, int(query.start), int(query.size));

                this.displayedResults = ko.pureComputed(function () {
                    return this.pager.currentPage();
                }.bind(this));

                this.type = ko.pureComputed(function () {
                    return context.params.type;
                });

                this.submittedQuery = ko.pureComputed(function () {
                    return submittedQuery();
                });

                this.heading = ko.pureComputed(function () {
                    return settings.collectionName + ' Search';
                });

                this.placeholder = ko.pureComputed(function () {
                    return selectedSearchType() ?
                        _.find(this.searchTypes(), { key: selectedSearchType() }).placeholder :
                        'Enter your search terms...';
                }.bind(this));

                this.hasResults = ko.pureComputed(function () {
                    return results().length > 0;
                });

                this.binding = function (element, callback) {
                    require(
                        [
                            settings.searchTypes,
                            settings.searchResultFields
                        ],
                        function (searchTypes, searchResultFields) {
                            this.searchTypes(_.map(searchTypes, function (type) {
                                return new SearchType(type, selectedSearchType);
                            }));
                            this.searchTypes()[0].makeActive();
                            this.searchResultFields(searchResultFields);
                            if (this.searchText()) {
                                doSearch(callback);
                            } else {
                                callback();
                            }
                        }.bind(this)
                    );
                };

                this.ready = function (element, callback) {
                    responsive.update();
                    callback();
                };

                this.reset = function () {
                    results([]);
                    this.displayResults(false);
                    this.searchText('');
                    this.searchTypes()[0].makeActive();
                };

                this.submit = function (callback) {
                    if (!this.searchText()) {
                        return;
                    }
                    this.pager.start(0);
                    routes.pushState(this.searchUrlFor({ query: this.searchText() }));
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
                    return this.displayFor(settings.labelField, result);
                };

                this.resultFor = function (result) {
                    return {
                        name: 'collections/' + context.params.type + '/' + this.modeSwitcher.mode().toLowerCase() + '-result',
                        params: this
                    };
                };

                this.searchUrlFor = function (overrides) {
                    return routes.searchUrlFor(
                        context.params.type,
                        _.defaults(
                            overrides,
                            {
                                query: submittedQuery(),
                                sort: this.sorter.field(),
                                dir: this.sorter.direction(),
                                start: this.pager.start(),
                                size: this.pager.pageSize(),
                                mode: this.modeSwitcher.mode()
                            }
                        )
                    );
                };

                this.detailUrlFor = function (result) {
                    return routes.detailUrlFor(context.params.type, result.id());
                };
            };
        }
    );
}());
