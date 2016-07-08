// Based on http://kindohm.github.io/knockout-query-builder/js/condition.js
(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            return function (queryBuilder) {
                this.selectedField = ko.observable();
                this.selectedComparator = ko.observable();
                this.value = ko.observable('');

                this.fields = ko.pureComputed(function () {
                    return queryBuilder.fields();
                });

                this.comparators = ko.pureComputed(function () {
                    return [
                        {
                            key: 'contains',
                            label: 'contains',
                            queryFormat: function (value) {
                                return '"' + value + '"';
                            }
                        },
                        {
                            key: '!contains',
                            label: 'does not contain',
                            queryFormat: function (value) {
                                return '-"' + value + '"';
                            }
                        },
                        {
                            key: 'starts',
                            label: 'starts with',
                            queryFormat: function (value) {
                                return '"' + value + '"*';
                            }
                        },
                        {
                            key: '!starts',
                            label: 'does not start with',
                            queryFormat: function (value) {
                                return '-"' + value + '"*';
                            }
                        }
                    ];
                });

                this.query = ko.pureComputed(function () {
                    var field, comparator, value;
                    field = this.selectedField();
                    comparator = this.selectedComparator();
                    value = this.value();
                    return (field && comparator && value) ?
                        {
                            field: field,
                            comparator: comparator,
                            value: value
                        } :
                        undefined;
                }.bind(this));

                this.parse = function (query) {
                    if (!query.field) {
                        throw new Error('Cannot parse Condition query, missing `field`');
                    }
                    if (!query.comparator) {
                        throw new Error('Cannot parse Condition query, missing `comparator`');
                    }
                    if (!query.value) {
                        throw new Error('Cannot parse Condition query, missing `value`');
                    }
                    this.selectedField(query.field);
                    this.selectedComparator(query.comparator);
                    this.value(query.value);
                };
            };
        }
    );
}());
