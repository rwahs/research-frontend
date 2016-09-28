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
                    return queryBuilder.comparators();
                });

                this.valueType = ko.pureComputed(function () {
                    var comparator = _(this.comparators()).find({ key: this.selectedComparator() });
                    return comparator ? comparator.valueType : undefined;
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
                    this.value(this.valueType() ? (query.value || '') : undefined);
                };
            };
        }
    );
}());
