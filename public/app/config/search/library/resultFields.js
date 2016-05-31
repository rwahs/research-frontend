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
                    key: 'Author',
                    labelText: 'Author',
                    displayValue: function (value) {
                        return $('<ul class="list-unstyled"></ul>')
                            .append(_(JSON.parse(value))
                                .drop()
                                .map(function (valueItem) {
                                    return $('<li></li>').text(valueItem);
                                })
                            )
                            .prop('outerHTML');
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
                        return $('<ul class="list-unstyled"></ul>')
                            .append(_(JSON.parse(value))
                                .drop()
                                .map(function (valueItem) {
                                    return $('<li></li>').text(valueItem);
                                })
                            )
                            .prop('outerHTML');
                    }
                }
            ];
        }
    );
}());
