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
                parse: true,
                filter: true,
                display: 'list'
            },
            {
                key: 'Classification',
                labelText: 'Classification',
                parse: true,
                filter: 'Name',
                display: 'hierarchy-list'
            }
        ];
    });
}());
