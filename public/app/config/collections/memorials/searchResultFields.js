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
                key: 'ErectedBy',
                labelText: 'Erected By',
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
