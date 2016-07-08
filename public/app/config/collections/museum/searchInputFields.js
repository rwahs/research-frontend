(function () {
    'use strict';

    define(function () {
        return [
            {
                key: '_fulltext',
                labelText: 'Keyword',
                glyphicon: 'search',
                basicSearch: true
            },
            {
                key: 'ca_objects.preferred_labels',
                labelText: 'Item Name',
                glyphicon: 'certificate',
                basicSearch: true
            },
            {
                key: 'ca_occurrences.preferred_labels',
                labelText: 'Subject',
                glyphicon: 'paperclip',
                basicSearch: true
            },
            {
                key: 'ca_objects.idno',
                labelText: 'Accession Number',
                basicSearch: false
            },
            {
                key: 'ca_objects.ItemDates',
                labelText: 'Item Dates',
                basicSearch: false
            },
            {
                key: 'ca_objects.MakersMarks',
                labelText: 'Makers Marks',
                basicSearch: false
            },
            {
                key: 'ca_objects.Importance',
                labelText: 'Importance',
                basicSearch: false
            }
        ];
    });
}());
