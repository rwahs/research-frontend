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
                labelText: 'Accession Number'
            },
            {
                key: 'ItemName',
                labelText: 'Item Name'
            },
            {
                key: 'Creator',
                labelText: 'Creator',
                parse: true,
                filter: 'Value',
                display: 'typed-list'
            },
            {
                key: 'ErectedBy',
                labelText: 'Erected By'
            },
            {
                key: 'Location',
                labelText: 'Location',
                parse: true,
                skip: 1,
                filter: true,
                display: 'hierarchy'
            }
        ];
    });
}());
