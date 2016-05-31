(function () {
    'use strict';

    define(
        [],
        function () {
            return [
                {
                    key: 'Title',
                    labelText: 'Title'
                },
                {
                    key: 'Author',
                    labelText: 'Author',
                    displayValue: function (value) {
                        return '<ul class="list-unstyled"><li>' + value.replace(';', '</li><li>') + '</li></ul>';
                    }
                },
                {
                    key: 'Publisher',
                    labelText: 'Publisher'
                },
                {
                    key: 'DateOfPublication',
                    labelText: 'Date of Publication',
                    displayValue: function (value) {
                        var date = new Date(Date.parse(value));
                        return '<span title="' + date.toDateString() + '" data-microtime="' + date.getTime() + '">' + date.toLocaleDateString() + '</span>';
                    }
                },
                {
                    key: 'PlaceOfPublication',
                    labelText: 'Place of Publication'
                },
                {
                    key: 'PublicationType',
                    labelText: 'Type'
                },
                {
                    key: 'Subjects',
                    labelText: 'Subjects',
                    displayValue: function (value) {
                        return '<ul class="list-unstyled"><li>' + value.replace(';', '</li><li>') + '</li></ul>';
                    }
                }
            ];
        }
    );
}());
