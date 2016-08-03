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
                labelText: 'Item Name',
                placeholder: '(unnamed)'
            },
            {
                key: 'Description',
                labelText: 'Description'
            },
            {
                key: 'Inscription',
                labelText: 'Inscription'
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
            },
            {
                key: 'Dates',
                labelText: 'Dates'
            },
            {
                key: 'Subjects',
                labelText: 'Subjects',
                parse: true,
                filter: true,
                display: 'list'
            },
            {
                key: 'Materials',
                labelText: 'Materials'
            },
            {
                key: 'Dimensions',
                labelText: 'Dimensions',
                parse: true,
                filter: 'Value',
                display: 'typed-list'
            },
            {
                key: 'Provenance',
                labelText: 'Provenance'
            },
            {
                key: 'MediaMedium',
                display: 'image',
                placeholder: false
            },
            {
                key: 'MediaAccess'
            }
        ];
    });
}());
