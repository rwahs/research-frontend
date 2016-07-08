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
                key: 'ca_objects.Creator.CreatorName',
                labelText: 'Creator',
                glyphicon: 'user',
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
                key: 'ca_objects.ErectedBy',
                labelText: 'Erected By',
                basicSearch: false
            },
            {
                key: 'ca_objects.Location',
                labelText: 'Location',
                basicSearch: false
            }
        ];
    });
}());
