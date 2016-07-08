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
                key: 'ca_objects.Creator.CreatorName',
                labelText: 'Creator',
                glyphicon: 'user'
            },
            {
                key: 'ca_objects.preferred_labels',
                labelText: 'Item Name',
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