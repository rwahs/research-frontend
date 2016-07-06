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
                key: 'Title',
                labelText: 'Title',
                sort: true
            },
            {
                key: 'Author',
                labelText: 'Author',
                parse: true,
                filter: true,
                display: 'list',
                sort: function (value) {
                    return value.length > 0 ? value[0] : undefined;
                }
            },
            {
                key: 'Creator',
                labelText: 'Creator',
                parse: true,
                filter: 'Value',
                display: 'typed-list',
                sort: function (value) {
                    return value.length > 0 ? value[0].Value : undefined;
                }
            },
            {
                key: 'MakersMarks',
                labelText: 'Makers Marks'
            },
            {
                key: 'Publisher',
                labelText: 'Publisher',
                sort: true
            },
            {
                key: 'DateOfPublication',
                labelText: 'Date of Publication',
                sort: true
            },
            {
                key: 'PlaceOfPublication',
                labelText: 'Place of Publication',
                sort: true
            },
            {
                key: 'Location',
                labelText: 'Location',
                parse: true,
                skip: 1,
                filter: true,
                display: 'hierarchy',
                sort: function (value) {
                    return value.length > 0 ? value.join(' / ') : undefined;
                }
            }
        ];
    });
}());
