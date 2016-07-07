(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'first',
                labelText: 'Field One',
                sort: true,
                placeholder: 'placeholder value'
            },
            {
                key: 'second',
                labelText: 'Field Two',
                sort: function (value) {
                    return value ? value.toString().toLowerCase() : undefined;
                }
            },
            {
                key: 'third',
                labelText: 'Field Three',
                display: 'image'
            }
        ];
    });
}());
