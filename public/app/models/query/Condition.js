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
                            labelText: 'contains'
                        },
                        {
                            key: 'notContains',
                            labelText: 'does not contain'
                        },
                        {
                            key: 'startsWith',
                            labelText: 'starts with'
                        },
                        {
                            key: 'notStartsWith',
                            labelText: 'does not start with'
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
