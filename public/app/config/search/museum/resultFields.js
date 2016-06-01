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
                            .append(_(JSON.parse(value))
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
