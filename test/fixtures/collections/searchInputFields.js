(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'first',
                labelText: 'Field One',
                glyphicon: 'one',
                basicSearch: true
            },
            {
                key: 'second',
                labelText: 'Field Two',
                glyphicon: 'two',
                basicSearch: true
            },
            {
                key: 'third',
                labelText: 'Field Three (not in basic search)',
                glyphicon: 'three',
                basicSearch: false
            }
        ];
    });
}());
