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
                            .append(_(parse(value))
                                .reject(function (valueItem) {
                                    return !valueItem;
                                })
                                .map(function (valueItem) {
                                    return $('<li></li>').text(valueItem);
                                })
                                .value()
                            )
                            .prop('outerHTML');
                    }
                },
                {
                    key: 'Classification',
                    labelText: 'Classification',
                    displayValue: function (value) {
                        return $('<ul class="list-unstyled"></ul>')
                            .append(_(parse(value))
                                .map(function (valueItem) {
                                    return $('<li></li>').html(_(valueItem)
                                        .drop()
                                        .map(function (hierarchyNodeItem, depth) {
                                            return depth === 0 ?
                                                hierarchyNodeItem :
                                                _.repeat('&nbsp;', 2 * depth) + '&rArr; ' + hierarchyNodeItem;
                                        })
                                        .join('<br/>'));
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
