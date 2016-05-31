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
                    key: 'idno',
                    labelText: 'Accession Number'
                },
                {
                    key: 'ItemName',
                    labelText: 'Item Name'
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
                    key: 'ErectedBy',
                    labelText: 'Erected By'
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
