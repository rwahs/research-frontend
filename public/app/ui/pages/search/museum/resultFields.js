(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'type',
                labelText: 'Item Type'
            },
            {
                key: 'idno',
                labelText: 'Accession Number'
            },
            {
                key: 'ItemName',
                labelText: 'Item Name'
            },
            {
                key: 'Dates',
                labelText: 'Dates'
            },
            {
                key: 'Importance',
                labelText: 'Importance'
            },
            {
                key: 'Subjects',
                labelText: 'Subjects',
                displayValue: function (value) {
                    return '<ul class="list-unstyled"><li>' + value.replace(';', '</li><li>') + '</li></ul>';
                }
            },
            {
                key: 'Classification',
                labelText: 'Classification'
            }
        ];
    });
}());
