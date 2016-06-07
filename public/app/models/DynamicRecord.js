(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'util/safelyParseJson'
        ],
        function (_, ko, parse) {
            var idField = 'object_id';

            return function (result, fields) {
                result = ko.unwrap(result);

                this.id = ko.pureComputed(function () {
                    return result[idField];
                });

                this.data = ko.pureComputed(function () {
                    return _(ko.unwrap(fields))
                        .mapKeys('key')
                        .mapValues(function (field) {
                            var value = result[field.key] || '';
                            if (field.parse) {
                                value = parse(value);
                                if (field.skip) {
                                    value = _.drop(value, field.skip);
                                }
                                if (field.skipNested) {
                                    value = _.map(value, function (item) {
                                        return _.drop(item, field.skip);
                                    });
                                }
                                if (field.filter === true) {
                                    value = _.filter(value);
                                } else if (_.isString(field.filter)) {
                                    value = _.filter(value, field.filter);
                                }
                            }
                            return value;
                        }.bind(this))
                        .value();
                });
            };
        }
    );
}());
