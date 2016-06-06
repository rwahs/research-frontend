(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'idno',
                labelText: 'Accession Number'
            },
            {
                key: 'Title',
                labelText: 'Title'
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
                key: 'Subjects',
                labelText: 'Subjects',
                parse: true,
                filter: true,
                display: 'list'
            }
        ];
    });
}());
