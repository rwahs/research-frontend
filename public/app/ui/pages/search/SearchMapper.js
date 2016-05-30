(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            return function (selectedSearchTypeObservable, resultFieldsObservable, detailUrlTemplate) {
                return {
                    mapType: function (searchType) {
                        return {
                            key: searchType.key,
                            label: '<span class="small glyphicon glyphicon-' + searchType.glyphicon + '"></span> ' + searchType.labelText,
                            placeholder: 'Search by ' + searchType.labelText + '...',
                            active: ko.pureComputed(function () {
                                return selectedSearchTypeObservable() === searchType.key;
                            }),
                            makeActive: function () {
                                selectedSearchTypeObservable(searchType.key);
                            }
                        };
                    },

                    mapResult: function (result) {
                        return _(result)
                            .defaults(_.zipObject(
                                _.map(resultFieldsObservable(), 'key'),
                                _.map(Object.keys(resultFieldsObservable()), _.constant(''))
                            ))
                            .mapValues(function (value, key) {
                                var field = _.find(resultFieldsObservable(), { key: key }) || {};
                                return {
                                    key: key,
                                    value: value,
                                    displayValue: _.isFunction(field.displayValue) ? field.displayValue(value) : '' + value
                                };
                            })
                            .merge({
                                // jshint sub: true
                                detailUrl: detailUrlTemplate.replace(':id', result['object_id'])
                            })
                            .value();
                    }
                };
            };
        }
    );
}());
