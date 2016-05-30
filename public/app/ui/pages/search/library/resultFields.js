(function () {
    'use strict';

    define(function () {
        return [
            {
                key: 'Title',
                labelText: 'Title'
            },
            {
                key: 'Author',
                labelText: 'Author',
                displayValue: function (value) {
                    return '<ul><li>' + value.replace(';', '</li><li>') + '</li></ul>';
                }
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
                key: 'PublicationType',
                labelText: 'Type'
            },
            {
                key: 'Subjects',
                labelText: 'Subjects',
                displayValue: function (value) {
                    return '<ul><li>' + value.replace(';', '</li><li>') + '</li></ul>';
                }
            }
        ];
    });
}());
