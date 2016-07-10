(function () {
    'use strict';

    define(
        [
            'lodash'
        ],
        function (_) {
            return function (field, text) {
                return text.length === 0 ? undefined : {
                    operator: 'AND',
                    children: _.map(
                        text.split(/\s+/),
                        function (term) {
                            return {
                                field: field,
                                comparator: 'contains',
                                value: term
                            };
                        }
                    )
                };
            };
        }
    );
}());
