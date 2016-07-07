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
                key: 'Title',
                labelText: 'Title',
                sort: true
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
                key: 'DateOfCreation',
                labelText: 'Date of Creation',
                sort: true
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
                key: 'Medium',
                labelText: 'Medium',
                sort: true
            }
        ];
    });
}());
