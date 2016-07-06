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
                key: 'Title',
                labelText: 'Title',
                placeholder: '(untitled)'
            },
            {
                key: 'Creator',
                labelText: 'Creator',
                parse: true,
                filter: 'Value',
                display: 'typed-list'
            },
            {
                key: 'DateOfCreation',
                labelText: 'Date of Creation'
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
                key: 'Medium',
                labelText: 'Medium'
            },
            {
                key: 'PhysicalDescription',
                labelText: 'Physical Description'
            },
            {
                key: 'Subjects',
                labelText: 'Subjects',
                parse: true,
                filter: true,
                display: 'list'
            },
            {
                key: 'Summary',
                labelText: 'Summary'
            },
            {
                key: 'Notes',
                labelText: 'Notes'
            },
            {
                key: 'MediaMedium',
                display: 'image',
                placeholder: false
            }
        ];
    });
}());
