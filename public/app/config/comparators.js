(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'contains',
                labelText: 'contains',
                valueType: 'text'
            },
            {
                key: 'notContains',
                labelText: 'does not contain',
                valueType: 'text'
            },
            {
                key: 'startsWith',
                labelText: 'starts with',
                valueType: 'text'
            },
            {
                key: 'notStartsWith',
                labelText: 'does not start with',
                valueType: 'text'
            },
            {
                key: 'empty',
                labelText: 'is empty',
                valueType: false
            },
            {
                key: 'notEmpty',
                labelText: 'is not empty',
                valueType: false
            }
        ];
    });
}());
