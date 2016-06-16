(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'MediaThumbnail',
                labelText: 'Image',
                display: 'image'
            },
            {
                key: 'MediaSmall',
                display: 'image',
                tableColumn: false
            },
            {
                key: 'Title',
                labelText: 'Title'
            },
            {
                key: 'Author',
                labelText: 'Author',
                parse: true,
                filter: true,
                display: 'list'
            },
            {
                key: 'Publisher',
                labelText: 'Publisher'
            },
            {
                key: 'DateOfPublication',
                labelText: 'Date of Publication'
            },
            {
                key: 'PlaceOfPublication',
                labelText: 'Place of Publication'
            },
            {
                key: 'PublicationType',
                labelText: 'Type'
            }
        ];
    });
}());
