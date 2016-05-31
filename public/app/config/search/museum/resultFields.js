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
                            .append(_.map(
                                JSON.parse(value),
                                function (valueItem) {
                                    return $('<li></li>').text(valueItem);
                                }
                            ))
                            .prop('outerHTML');
                    }
                },
                {
                    key: 'Classification',
                    labelText: 'Classification'
                }
            ];
        }
    );
}());
