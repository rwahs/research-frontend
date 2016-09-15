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
                            labelText: 'contains',
                            valueType: 'text'
                        },
                        {
                            key: 'notContains',
                            labelText: 'does not contain',
                            valueType: 'text'
                        },
                        {
                            key: 'startsWith',
                            labelText: 'starts with',
                            valueType: 'text'
                        },
                        {
                            key: 'notStartsWith',
                            labelText: 'does not start with',
                            valueType: 'text'
                        },
                        {
                            key: 'empty',
                            labelText: 'is empty',
                            valueType: false
                        },
                        {
                            key: 'notEmpty',
                            labelText: 'is not empty',
                            valueType: false
                        }
                    ];
                });

                this.valueType = ko.pureComputed(function () {
                    var comparator = _(this.comparators()).find({ key: this.selectedComparator() });
                    return comparator ? comparator.valueType : false;
                }.bind(this));

                this.valueTypeIs = function (type) {
                    return this.valueType() === type;
                }.bind(this);

                this.query = ko.pureComputed(function () {
                    var result;
                    result = {
                        field: this.selectedField(),
                        comparator: this.selectedComparator()
                    };
                    if (!result.field || !result.comparator) {
                        return undefined;
                    }
                    if (this.valueType()) {
                        result.value = this.value();
                    }
                    return result;
                }.bind(this));

                this.parse = function (query) {
                    if (!query.field) {
                        throw new Error('Cannot parse Condition query, missing `field`');
                    }
                    if (!query.comparator) {
                        throw new Error('Cannot parse Condition query, missing `comparator`');
                    }
                    this.selectedField(query.field);
                    this.selectedComparator(query.comparator);
                    this.value(query.value || '');
                };
            };
        }
    );
}());
