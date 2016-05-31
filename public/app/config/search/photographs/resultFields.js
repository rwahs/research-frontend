(function () {
    'use strict';

    define(
        [
            'lodash',
            'jquery'
        ],
        function (_, $) {
            return [
                {
                    key: 'Title',
                    labelText: 'Title'
                },
                {
                    key: 'Creator',
                    labelText: 'Creator',
                    displayValue: function (value) {
                        return $('<ul class="list-unstyled"></ul>')
                            .append(_.map(
                                JSON.parse(value),
                                function (valueItem, key) {
                                    return $('<li></li>').text(key + ': ' + valueItem);
                                }
                            ))
                            .prop('outerHTML');
                    }
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
                    displayValue: function (value) {
                        return $('<ul class="list-unstyled"></ul>')
                            .append(_.map(
                                JSON.parse(value),
                                function (valueItem) {
                                    return $('<li></li>').text(valueItem);
                                }
                            ))
                            .prop('outerHTML');
                    }
                }
            ];
        }
    );
}());
