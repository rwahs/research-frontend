// Based on http://kindohm.github.io/knockout-query-builder/js/condition.js
(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            var Condition;

            Condition = function (queryBuilder) {
                this.templateName = 'condition-template';

                this.selectedField = ko.observable();
                this.selectedComparator = ko.observable();
                this.value = ko.observable('');

                this.hasOptions = ko.pureComputed(function () {
                    return false;
                });

                this.fields = ko.pureComputed(function () {
                    return queryBuilder.fields();
                });

                this.comparators = ko.pureComputed(function () {
                    return queryBuilder.comparators();
                });

                this.text = ko.pureComputed(function () {
                    var field, comparator, value;
                    field = _.find(this.fields(), { key: this.selectedField() });
                    comparator = _.find(this.comparators(), { key: this.selectedComparator() });
                    value = this.value();
                    return (field && comparator && value) ? '("' + field.labelText + '" ' + comparator.label + ' "' + value + '")' : '';
                }.bind(this));

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
            };

            Condition.parse = function (query, queryBuilder) {
                var condition;
                if (!query.field) {
                    throw new Error('Cannot parse Condition query, missing `field`');
                }
                if (!query.comparator) {
                    throw new Error('Cannot parse Condition query, missing `comparator`');
                }
                if (!query.value) {
                    throw new Error('Cannot parse Condition query, missing `value`');
                }
                condition = new Condition(queryBuilder);
                condition.selectedField(query.field);
                condition.selectedComparator(query.comparator);
                condition.value(query.value);
                return condition;
            };

            return Condition;
        }
    );
}());
