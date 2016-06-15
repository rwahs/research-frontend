(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            return function (sourceObservable, fieldsObservable, sortField, sortDirection) {
                this.field = ko.observable(sortField || undefined);
                this.direction = ko.observable(sortDirection || undefined);

                this.availableSortFields = ko.pureComputed(function () {
                    return _.filter(fieldsObservable(), 'sort');
                });

                this.sortedList = ko.pureComputed(function () {
                    var data = sourceObservable(),
                        field = this.field(),
                        fieldDefinition = _.find(fieldsObservable(), { key: field }),
                        direction = this.direction();
                    if (!field || !direction) {
                        return data;
                    }
                    return _.orderBy(
                        data,
                        function (result) {
                            var value = result.data()[field];
                            if (_.isFunction(fieldDefinition.sort)) {
                                // Field-specific value translation.
                                value = fieldDefinition.sort(value);
                            }
                            if (_.isString(value)) {
                                // Case-insensitive sorting of string values.
                                value = value.trim().toLowerCase();
                            }
                            if (!value) {
                                // Use sentinel values to push empty values to the end, for both sort directions.
                                value = (direction === 'asc' ? '~' : '!');
                            }
                            return value;
                        }.bind(this),
                        direction);
                }.bind(this));
            };
        }
    );
}());
