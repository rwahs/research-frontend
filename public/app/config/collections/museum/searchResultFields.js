(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'MediaThumbnail',
                labelText: 'Image',
                display: 'cover-image',
                searchField: false
            },
            {
                key: 'MediaSmall',
                display: 'cover-image',
                tableColumn: false,
                searchField: false
            },
            {
                key: 'type',
                labelText: 'Item Type',
                sort: true,
                searchField: false
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
                key: 'Dates',
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
            },
            {
                key: 'Classification',
                labelText: 'Classification',
                parse: true,
                skipNested: 1,
                filter: true,
                display: 'hierarchy-list',
                sort: function (value) {
                    return value.length > 0 && value[0].length > 0 ? value[0].join(' / ') : undefined;
                }
            }
        ];
    });
}());
