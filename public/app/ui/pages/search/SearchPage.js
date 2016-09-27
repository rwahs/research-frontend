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
            var int, labelText, convertToDisplayValue;

            int = function (value) {
                return value ? parseInt(value, 10) : undefined;
            };

            labelText = function (child, fields) {
                return _.find(fields, { key: child.field }).labelText;
            };

            convertToDisplayValue = function (parameters, fields) {
                if (!parameters || !parameters.children || !parameters.children.length) {
                    return '';
                }
                return _(parameters.children)
                    .filter(function (child) {
                        return child.hasOwnProperty('children') ? child.children.length > 0 : child.value.length > 0;
                    })
                    .map(function (child) {
                        return child.hasOwnProperty('children') ?
                        '(' + convertToDisplayValue(child, fields) + ')' :
                        labelText(child, fields) + ' ' + child.comparator + ' "' + child.value + '"';
                    })
                    .join(' ' + parameters.operator + ' ');
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

                this.queryText = ko.pureComputed(function () {
                    return convertToDisplayValue(this.query(), this.inputFields());
                }.bind(this));

                this.submittedQueryText = ko.pureComputed(function () {
                    return convertToDisplayValue(submittedQuery(), this.inputFields());
                }.bind(this));

                this.queryModified = ko.pureComputed(function () {
                    return this.queryText() !== this.submittedQueryText();
                }.bind(this));

                this.heading = ko.pureComputed(function () {
                    return settings.collectionName + ' Search';
                });

                this.advancedModeToggleText = ko.pureComputed(function () {
                    return this.advancedMode() ? 'Back to basic mode' : 'Advanced search';
                }.bind(this));

                this.resultsCountText = ko.pureComputed(function () {
                    var count = results().length;
                    return count === 1 ? '1 result' : count + ' results';
                });

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

                this.shopBaseUrl = ko.pureComputed(function () {
                    var shopOptions = container.resolve('options.shop');
                    return shopOptions ? shopOptions.baseUrl : undefined;
                });

                this.shopSearchUrl = ko.pureComputed(function () {
                    var shopOptions = container.resolve('options.shop');
                    if (!shopOptions) {
                        return undefined;
                    }
                    return shopOptions.baseUrl + shopOptions.path.search + '?q=' + _(submittedQuery().children).map('value').filter().join('+');
                });

                this.shopSearchText = ko.pureComputed(function () {
                    return _.map(submittedQuery().children, 'value').join(' ');
                });

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
