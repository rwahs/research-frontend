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
                key: 'Author',
                labelText: 'Author',
                parse: true,
                filter: true,
                display: 'list'
            },
            {
                key: 'PublicationType',
                labelText: 'Type'
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
                key: 'Edition',
                labelText: 'Edition'
            },
            {
                key: 'Size',
                labelText: 'Size'
            },
            {
                key: 'Series',
                labelText: 'Series'
            },
            {
                key: 'Subjects',
                labelText: 'Subjects',
                parse: true,
                filter: true,
                display: 'list'
            },
            {
                key: 'Collation',
                labelText: 'Collation'
            },
            {
                key: 'ISBNISSN',
                labelText: 'ISBN / ISSN'
            },
            {
                key: 'LibraryNumber',
                labelText: 'Library Number'
            },
            {
                key: 'Donated',
                labelText: 'Donated'
            },
            {
                key: 'Purchased',
                labelText: 'Purchased'
            },
            {
                key: 'MediaMedium',
                display: 'image',
                placeholder: false
            }
        ];
    });
}());
