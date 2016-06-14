(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'MediaThumbnail',
                labelText: 'Image',
                display: 'image',
                placeholder: '(No image available)'
            },
            {
                key: 'MediaSmall',
                display: 'image',
                tableColumn: false
            },
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
                skipNested: 1,
                filter: true,
                display: 'hierarchy-list'
            }
        ];
    });
}());
