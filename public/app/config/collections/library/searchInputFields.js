(function () {
    'use strict';

    define(function () {
        return [
            {
                key: '_fulltext',
                labelText: 'Keyword',
                glyphicon: 'search'
            },
            {
                key: 'ca_objects.Author',
                labelText: 'Author',
                glyphicon: 'user'
            },
            {
                key: 'ca_objects.preferred_labels',
                labelText: 'Title',
                glyphicon: 'certificate'
            },
            {
                key: 'ca_occurrences.preferred_labels',
                labelText: 'Subject',
                glyphicon: 'paperclip'
            }
        ];
    });
}());
