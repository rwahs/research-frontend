(function () {
    'use strict';

    define(
        [
            'lodash',
            'jquery'
        ],
        function (_, $) {
            return function (baseUrl, ajaxOptions) {
                var queryString;

                queryString = function (parameters) {
                    return _.map(parameters, function (value, key) {
                        return '(' + key + ':' + value + ')';
                    })
                    .join(' AND ');
                };

                return function (parameters, callback) {
                    $.ajax(_.merge({}, ajaxOptions, {
                        url: baseUrl + '?q=' + queryString(parameters),
                        success: function (result) {
                            if (result.ok) {
                                delete result.ok;
                                callback(undefined, _.values(result));
                            }
                        },
                        error: function (jqXHR, textStatus, err) {
                            callback(err);
                        }
                    }));
                };
            };
        }
    );
}());
