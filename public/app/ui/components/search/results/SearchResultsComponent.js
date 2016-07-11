(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'config/routes',
            'util/container'
        ],
        function (_, ko, routes, container) {
            return function (parameters) {
                var typeFor = function (result) {
                    return container.resolve('types')[result.data().type];
                };

                if (!parameters.results) {
                    throw new Error('SearchResultsComponent missing required parameter: `results`.');
                }
                if (!parameters.modeSwitcher) {
                    throw new Error('SearchResultsComponent missing required parameter: `modeSwitcher`.');
                }
                if (!parameters.resultFields) {
                    throw new Error('SearchResultsComponent missing required parameter: `resultFields`.');
                }

                this.results = parameters.results;
                this.modeSwitcher = parameters.modeSwitcher;
                this.resultFields = parameters.resultFields;
                this.start = parameters.start;

                this.displayFor = function (field, result) {
                    if (_.isString(field)) {
                        field = _.find(this.resultFields(), { key: field });
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

                this.resultFor = function (result) {
                    return {
                        name: 'collections/' + typeFor(result) + '/' + this.modeSwitcher.mode().toLowerCase() + '-result',
                        params: this
                    };
                };

                this.detailUrlFor = function (result) {
                    return routes.detailUrlFor(typeFor(result), result.id());
                };
            };
        }
    );
}());
