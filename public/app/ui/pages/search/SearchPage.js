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
                var mapper, selectedSearchType;

                this.searchText = ko.observable('');
                this.searchTypes = ko.observableArray();
                this.resultFields = ko.observableArray();
                this.results = ko.observableArray();
                this.loading = ko.observable(false);
                this.displayResults = ko.observable(false);

                selectedSearchType = ko.observable();
                mapper = new SearchMapper(selectedSearchType, this.resultFields, parameters.detailUrlTemplate);

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

                this.binding = function (container, callback) {
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

                this.submit = function () {
                    this.loading(true);
                    this.displayResults(false);
                    this.results([]);
                    container.resolve(parameters.searchServiceKey)(
                        _.zipObject(
                            [ selectedSearchType() ],
                            [ this.searchText() || '*' ]
                        ),
                        function (err, results) {
                            this.loading(false);
                            if (err) {
                                // TODO Display error
                                return;
                            }
                            this.results(mapper.mapResult(results));
                            this.displayResults(true);
                        }.bind(this)
                    );
                    return false;
                };
            };
        }
    );
}());