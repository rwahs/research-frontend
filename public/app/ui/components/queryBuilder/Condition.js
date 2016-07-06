// Based on http://kindohm.github.io/knockout-query-builder/js/condition.js
(function () {
    'use strict';

    define(
        [
            'knockout'
        ],
        function (ko) {
            return function (queryBuilder) {
                this.templateName = 'condition-template';

                this.selectedField = ko.observable();
                this.selectedComparator = ko.observable();
                this.value = ko.observable('');

                this.fields = ko.pureComputed(function () {
                    return _.filter(queryBuilder.fields(), function (field) {
                        // Unspecified is true, only explicit false is false.
                        return field.searchField !== false;
                    });
                });

                this.comparators = ko.pureComputed(function () {
                    return queryBuilder.comparators();
                });

                this.text = ko.pureComputed(function () {
                    var field, comparator, value;
                    field = this.selectedField();
                    comparator = this.selectedComparator();
                    value = this.value();
                    return (!field || !comparator || !value) ? '' : comparator.displayFormat(field, value);
                }.bind(this));

                this.query = ko.pureComputed(function () {
                    var field, comparator, value;
                    field = this.selectedField();
                    comparator = this.selectedComparator();
                    value = this.value();
                    return (!field || !comparator || !value) ? undefined : {
                        key: field,
                        value: comparator.queryFormat(value)
                    };
                }.bind(this));
            };
        }
    );
}());
