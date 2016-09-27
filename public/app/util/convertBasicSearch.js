(function () {
    'use strict';

    define(
        [
            'lodash'
        ],
        function (_) {
            return function (field, text, operator) {
                console.log('convertBasicSearch with operator = ' + operator);
                return text.length === 0 ? undefined : {
                    operator: operator || 'AND',
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
