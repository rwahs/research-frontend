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
                labelText: 'Description',
                display: 'html'
            },
            {
                key: 'MakersMarks',
                labelText: 'Makers Marks'
            },
            {
                key: 'Dates',
                labelText: 'Dates'
            },
            {
                key: 'EarliestYear',
                labelText: 'Earliest Year'
            },
            {
                key: 'LatestYear',
                labelText: 'Latest Year'
            },
            {
                key: 'HistoricalDetails',
                labelText: 'Historical Details'
            },
            {
                key: 'BibliographReferences',
                labelText: 'Bibliographic References'
            },
            {
                key: 'Subjects',
                labelText: 'Subjects',
                parse: true,
                filter: true,
                display: 'list'
            },
            {
                key: 'Importance',
                labelText: 'Importance'
            },
            {
                key: 'StatementOfSignificance',
                labelText: 'Statement of Significance'
            },
            {
                key: 'Classification',
                labelText: 'Classification',
                parse: true,
                filter: 'Name',
                display: 'hierarchy-list'
            }
        ];
    });
}());
