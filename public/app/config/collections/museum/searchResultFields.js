(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'MediaThumbnail',
                labelText: 'Image',
                display: 'cover-image'
            },
            {
                key: 'MediaSmall',
                display: 'cover-image',
                tableColumn: false
            },
            {
                key: 'type',
                labelText: 'Item Type',
                sort: true
            },
            {
                key: 'idno',
                labelText: 'Accession Number',
                sort: true
            },
            {
                key: 'ItemName',
                labelText: 'Item Name',
                sort: true
            },
            {
                key: 'ItemDates',
                labelText: 'Dates',
                sort: true
            },
            {
                key: 'Importance',
                labelText: 'Importance',
                sort: true
            },
            {
                key: 'MakersMarks',
                labelText: 'Makers Marks'
            }
        ];
    });
}());
