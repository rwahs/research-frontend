(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'util/container',
            'models/DynamicRecord',
            'ui/pages/search/SearchType'
        ],
        function (_, ko, container, DynamicRecord, SearchType) {
            return function (context, parameters) {
                var search, selectedSearchType, searchParameters;

                this.searchText = ko.observable('');
                this.searchTypes = ko.observableArray();
                this.searchResultFields = ko.observableArray();
                this.results = ko.observableArray();
                this.loading = ko.observable(false);
                this.displayResults = ko.observable(false);

                search = container.resolve(parameters.searchServiceKey);
                selectedSearchType = ko.observable();

                searchParameters = ko.pureComputed(function () {
                    return _.zipObject(
                        [ selectedSearchType() ],
                        [ this.searchText() || '*' ]
                    );
                }.bind(this));

                this.heading = ko.pureComputed(function () {
                    return parameters.collectionName + ' Search';
                });

                this.placeholder = ko.pureComputed(function () {
                    return selectedSearchType() ?
                        _.find(this.searchTypes(), { key: selectedSearchType() }).placeholder :
                        'Enter your search terms...';
                }.bind(this));

                this.hasResults = ko.pureComputed(function () {
                    return this.results().length > 0;
                }.bind(this));

                this.binding = function (element, callback) {
                    require(
                        [
                            parameters.searchTypes,
                            parameters.searchResultFields
                        ],
                        function (searchTypes, searchResultFields) {
                            this.searchTypes(_.map(searchTypes, function (type) {
                                return new SearchType(type, selectedSearchType);
                            }));
                            this.searchTypes()[0].makeActive();
                            this.searchResultFields(searchResultFields);
                            callback();
                        }.bind(this)
                    );
                };

                this.reset = function () {
                    this.displayResults(false);
                    this.results([]);
                    this.searchText('');
                    this.searchTypes()[0].makeActive();
                };

                this.submit = function () {
                    this.loading(true);
                    this.displayResults(false);
                    this.results([]);
                    search(
                        searchParameters(),
                        function (err, results) {
                            this.loading(false);
                            if (err) {
                                // TODO Display error
                                return;
                            }
                            this.results(_.map(results, function (result) {
                                return new DynamicRecord(result, this.searchResultFields);
                            }.bind(this)));
                            this.displayResults(true);
                        }.bind(this)
                    );
                    return false;
                };

                this.displayFor = function (field, result) {
                    return {
                        name: 'display/' + (field.display || 'text'),
                        params: {
                            data: result.data,
                            name: field.key
                        }
                    };
                };

                this.detailUrlFor = function (result) {
                    return parameters.detailUrlTemplate.replace(':id', result.id());
                };
            };
        }
    );
}());
