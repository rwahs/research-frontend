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
                            .append(_(JSON.parse(value))
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
                    key: 'Location',
                    labelText: 'Location',
                    displayValue: function (value) {
                        return _(JSON.parse(value)).drop().join(' &rArr; ');
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
                }
            ];
        }
    );
}());
