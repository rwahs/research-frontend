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
            'util/safelyParseJson'
        ],
        function (_, ko, qs, routes, container, DynamicRecord, ListModeSwitcher, ListSorter, ListPager, safelyParseJson) {
            var int = function (value) {
                    return value ? parseInt(value, 10) : undefined;
                };

            return function (context) {
                var settings = container.resolve('settings.' + context.params.type),
                    submittedQuery = ko.observable(),
                    results = ko.observableArray(),
                    initialUrlParameters = qs.parse(window.location.search.replace(/^\?/, '')),
                    overlay = container.resolve('ui.overlay'),
                    doSearch = function (callback) {
                        submittedQuery(this.query());
                        results([]);
                        overlay.loading(true);
                        this.displayResults(false);
                        container.resolve('search.' + context.params.type)(
                            this.query(),
                            function (err, searchServiceResults) {
                                overlay.loading(false);
                                if (err) {
                                    overlay.error(err);
                                    return _.isFunction(callback) ? callback(err) : undefined;
                                }
                                results(_.map(searchServiceResults, function (result) {
                                    return new DynamicRecord(result, this.resultFields);
                                }.bind(this)));
                                this.displayResults(true);
                                if (_.isFunction(callback)) {
                                    callback();
                                }
                            }.bind(this)
                        );
                    }.bind(this);

                this.query = ko.observable(initialUrlParameters.query ? safelyParseJson(initialUrlParameters.query) : undefined);
                this.advancedMode = ko.observable(!!initialUrlParameters.advanced);
                this.inputFields = ko.observableArray();
                this.resultFields = ko.observableArray();
                this.displayResults = ko.observable(false);

                this.modeSwitcher = new ListModeSwitcher(initialUrlParameters.mode);
                this.sorter = new ListSorter(results, this.resultFields, initialUrlParameters.sort, initialUrlParameters.dir);
                this.pager = new ListPager(this.sorter.sortedList, int(initialUrlParameters.start), int(initialUrlParameters.size));

                this.displayedResults = ko.pureComputed(function () {
                    return this.pager.currentPage();
                }.bind(this));

                this.start = ko.pureComputed(function () {
                    return this.pager.start();
                }.bind(this));

                this.submittedQuery = ko.pureComputed(function () {
                    return submittedQuery();
                });

                this.submittedQueryText = ko.pureComputed(function () {
                    var labelText, convertToDisplayValue;
                    labelText = function (child) {
                        return _.find(this.inputFields(), { key: child.field }).labelText;
                    }.bind(this);
                    convertToDisplayValue = function (parameters) {
                        return _(parameters.children)
                            .map(function (child) {
                                return child.hasOwnProperty('children') ?
                                    '(' + convertToDisplayValue(child) + ')' :
                                    labelText(child) + ' ' + child.comparator + ' "' + child.value + '"';
                            }.bind(this))
                            .join(' ' + parameters.operator + ' ');
                    }.bind(this);
                    return convertToDisplayValue(submittedQuery());
                }.bind(this));

                this.heading = ko.pureComputed(function () {
                    return settings.collectionName + ' Search';
                });

                this.advancedModeToggleText = ko.pureComputed(function () {
                    return this.advancedMode() ? 'Back to basic mode' : 'Advanced search';
                }.bind(this));

                this.hasResults = ko.pureComputed(function () {
                    return results().length > 0;
                });

                this.resultsLimit = ko.pureComputed(function () {
                    var options = container.isRegistered('options.service') ? container.resolve('options.service') : {};
                    return options ? options.limit : undefined;
                });

                this.hasLimitedResults = ko.pureComputed(function () {
                    var limit = this.resultsLimit();
                    return !!limit && results().length >= limit;
                }.bind(this));

                this.canSubmit = ko.pureComputed(function () {
                    return !!this.query() && this.query().children.length > 0;
                }.bind(this));

                this.attaching = function (element, callback) {
                    require(
                        [
                            settings.searchInputFields,
                            settings.searchResultFields
                        ],
                        function (inputFields, resultFields) {
                            this.inputFields(inputFields);
                            this.resultFields(resultFields);
                            callback();
                        }.bind(this)
                    );
                };

                this.binding = function (element, callback) {
                    if (this.query()) {
                        doSearch(callback);
                    } else {
                        callback();
                    }
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
                    this.query(undefined);
                }.bind(this);

                this.submit = function (callback) {
                    if (!this.canSubmit()) {
                        return;
                    }
                    this.pager.start(0);
                    routes.pushState(this.searchUrlFor({ query: JSON.stringify(this.query()) }));
                    doSearch(callback);
                    return false;
                }.bind(this);

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
            };
        }
    );
}());
