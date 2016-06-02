(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'util/container',
            'ui/pages/search/SearchMapper'
        ],
        function (_, ko, container, SearchMapper) {
            return function (context, parameters) {
                var search, selectedSearchType, mapper, searchParameters;

                this.searchText = ko.observable('');
                this.searchTypes = ko.observableArray();
                this.resultFields = ko.observableArray();
                this.results = ko.observableArray();
                this.loading = ko.observable(false);
                this.displayResults = ko.observable(false);

                search = container.resolve(parameters.searchServiceKey);
                selectedSearchType = ko.observable();
                mapper = new SearchMapper(selectedSearchType, this.resultFields, parameters.detailUrlTemplate);

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
                            parameters.resultFields
                        ],
                        function (searchTypes, resultFields) {
                            this.searchTypes(_.map(searchTypes, mapper.mapType));
                            this.searchTypes()[0].makeActive();
                            this.resultFields(resultFields);
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
                            this.results(_.map(results, mapper.mapResult));
                            this.displayResults(true);
                        }.bind(this)
                    );
                    return false;
                };
            };
        }
    );
}());
