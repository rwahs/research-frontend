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
                    key: 'type',
                    labelText: 'Item Type'
                },
                {
                    key: 'idno',
                    labelText: 'Accession Number'
                },
                {
                    key: 'ItemName',
                    labelText: 'Item Name'
                },
                {
                    key: 'Dates',
                    labelText: 'Dates'
                },
                {
                    key: 'Importance',
                    labelText: 'Importance'
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
                },
                {
                    key: 'Classification',
                    labelText: 'Classification',
                    displayValue: function (value) {
                        return $('<ul class="list-unstyled"></ul>')
                            .append(_(JSON.parse(value))
                                .map(function (valueItem) {
                                    return $('<li></li>').html(_(valueItem).drop().join(' &rArr; '));
                                })
                            )
                            .prop('outerHTML');
                    }
                }
            ];
        }
    );
}());
