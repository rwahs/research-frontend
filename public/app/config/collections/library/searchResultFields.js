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
                key: 'PublicationType',
                labelText: 'Type',
                sort: true
            }
        ];
    });
}());
