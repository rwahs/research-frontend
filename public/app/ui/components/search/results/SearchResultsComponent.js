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
            return function () {
                var typeFor = function (result) {
                        return container.resolve('types')[result.data().type];
                    };

                this.resultFields = ko.observableArray();
                this.results = ko.observableArray();

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

                this.displayForLabelField = function (result) {
                    return this.displayFor(container.resolve('settings.' + typeFor(result)).labelField, result);
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
