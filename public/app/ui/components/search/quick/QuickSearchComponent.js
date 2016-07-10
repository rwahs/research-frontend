(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'config/routes',
            'util/convertBasicSearch'
        ],
        function (_, ko, routes, convertBasicSearch) {
            return function (parameters) {
                if (!parameters) {
                    throw new Error('QuickSearchComponent missing parameter map.');
                }
                if (!parameters.searchBaseUrl) {
                    throw new Error('QuickSearchComponent missing required parameter: `searchBaseUrl`.');
                }

                this.searchText = ko.observable('');

                this.preventSubmit = ko.pureComputed(function () {
                    return this.searchText().length === 0;
                }.bind(this));

                this.submit = function () {
                    if (this.preventSubmit()) {
                        return false;
                    }
                    routes.pushState(routes.searchUrlFor(parameters.searchBaseUrl, { query: JSON.stringify(convertBasicSearch('_fulltext', this.searchText())) }), true);
                    return false;
                };
            };
        }
    );
}());
