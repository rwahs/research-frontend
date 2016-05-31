(function () {
    'use strict';

    define(
        [],
        function () {
            return [
                {
                    key: '_fulltext',
                    labelText: 'Keyword',
                    glyphicon: 'search'
                },
                {
                    key: 'ca_objects.Creator',
                    labelText: 'Creator',
                    glyphicon: 'user'
                },
                {
                    key: 'ca_objects.preferred_labels',
                    labelText: 'Title',
                    glyphicon: 'certificate'
                },
                {
                    key: 'ca_occurrences',
                    labelText: 'Subject',
                    glyphicon: 'paperclip'
                }
            ];
        }
    );
}());
