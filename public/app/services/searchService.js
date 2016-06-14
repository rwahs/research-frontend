(function () {
    'use strict';

    define(
        [
            'lodash',
            'jquery'
        ],
        function (_, $) {
            return function (baseUrl, ajaxOptions, noCache, logErrors) {
                var queryString;

                queryString = function (parameters) {
                    return _.map(parameters, function (value, key) {
                        return '(' + key + ':' + value + ')';
                    })
                    .join(' AND ');
                };

                return function (parameters, callback) {
                    $.ajax(_.merge({}, ajaxOptions, {
                        url: baseUrl + '?q=' + queryString(parameters || {}) + (noCache ? '&noCache=1' : ''),
                        success: function (result) {
                            if (!result.ok) {
                                return callback(new Error('Invalid response received from server'));
                            }
                            delete result.ok;
                            callback(undefined, _.values(result));
                        },
                        error: function (jqXHR, textStatus, err) {
                            if (logErrors && console && typeof console.error === 'function') {
                                console.error(err);
                            }
                            callback(err);
                        }
                    }));
                };
            };
        }
    );
}());
