(function () {
    'use strict';

    define(
        [
            'lodash',
            'jquery',
            'util/safelyParseJson'
        ],
        function (_, $, parse) {
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
                            .append(_(parse(value))
                                .reject(function (valueItem) {
                                    return !valueItem || !valueItem.CreatorType || !valueItem.Name;
                                })
                                .map(function (valueItem) {
                                    return $('<li></li>')
                                        .text(valueItem.Name)
                                        .append($('<span class="small"></span>').text(' (' + valueItem.CreatorType + ')'));
                                })
                                .value()
                            )
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
                            .append(_(parse(value))
                                .map(function (valueItem) {
                                    return $('<li></li>').text(valueItem);
                                })
                                .value()
                            )
                            .prop('outerHTML');
                    }
                }
            ];
        }
    );
}());
