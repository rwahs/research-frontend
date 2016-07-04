(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            return function (parameters) {
                if (!parameters) {
                    throw new Error('SearchComponent missing parameter map.');
                }
                if (!parameters.searchServiceKey) {
                    throw new Error('SearchComponent missing required parameter: `searchServiceKey`.');
                }

                this.submit = function () {
                    // TODO
                };
            };
        }
    );
}());
