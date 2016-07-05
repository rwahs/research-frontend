(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'config/routes'
        ],
        function (_, ko, routes) {
            return function (parameters) {
                if (!parameters) {
                    throw new Error('SearchComponent missing parameter map.');
                }
                if (!parameters.searchBaseUrl) {
                    throw new Error('SearchComponent missing required parameter: `searchBaseUrl`.');
                }

                this.searchText = ko.observable('');

                this.preventSubmit = ko.pureComputed(function () {
                    return this.searchText().length === 0;
                }.bind(this));

                this.submit = function () {
                    if (this.preventSubmit()) {
                        return false;
                    }
                    routes.pushState(routes.searchUrlFor(parameters.searchBaseUrl, { query: this.searchText() }), true);
                    return false;
                };
            };
        }
    );
}());
