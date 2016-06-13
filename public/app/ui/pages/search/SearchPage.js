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
            'models/PaginatedList',
            'ui/pages/search/SearchType'
        ],
        function (_, ko, qs, routes, container, DynamicRecord, PaginatedList, SearchType) {
            return function (context) {
                var selectedSearchType,
                    settings = container.resolve('settings.' + context.params.type),
                    submittedQuery = ko.observable(),
                    results = ko.observableArray(),
                    query = qs.parse(window.location.search.replace(/^\?/, '')),
                    pushState = function (url) {
                        window.history.pushState({}, window.title, url);
                    },
                    doSearch = function (callback) {
                        submittedQuery(this.searchText() || '*');
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
                                if (_.isFunction(callback)) {
                                    callback();
                                }
                            }.bind(this)
                        );
                    }.bind(this);

                // TODO Controls for page size
                this.paginatedResults = new PaginatedList(
                    results,
                    query.start ? parseInt(query.start, 10) : undefined,
                    query.size ? parseInt(query.size, 10) : undefined,
                    function (start) {
                        return routes.getSearchUrl(context.params.type, { query: submittedQuery(), start: start });
                    }.bind(this),
                    pushState
                );

                this.searchText = ko.observable(query.query || '');
                this.searchTypes = ko.observableArray();
                this.searchResultFields = ko.observableArray();
                this.loading = ko.observable(false);
                this.displayResults = ko.observable(false);

                selectedSearchType = ko.observable();

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

                this.reset = function () {
                    results([]);
                    this.displayResults(false);
                    this.searchText('');
                    this.searchTypes()[0].makeActive();
                };

                this.submit = function (callback) {
                    this.paginatedResults.start(0);
                    pushState(routes.getSearchUrl(context.params.type, { query: this.searchText(), start: 0 }));
                    doSearch(callback);
                    return false;
                };

                this.displayFor = function (field, result) {
                    return {
                        name: 'display/' + (field.display || 'text'),
                        params: {
                            data: result.data,
                            name: field.key,
                            placeholder: field.placeholder
                        }
                    };
                };

                this.detailUrlFor = function (result) {
                    return routes.getDetailUrl(context.params.type, result.id());
                };
            };
        }
    );
}());
