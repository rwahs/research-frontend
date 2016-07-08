(function () {
    'use strict';

    define(
        [
            'lodash',
            'jquery'
        ],
        function (_, $) {
            return function (baseUrl, options) {
                options = options || {};

                return function (id, callback) {
                    if (!id) {
                        return callback(new Error('Missing required "id" parameter in detail service'));
                    }
                    $.ajax(_.merge({}, options.ajaxOptions || {}, {
                        url: baseUrl + '?id=' + id + (options.noCache ? '&noCache=1' : ''),
                        success: function (result) {
                            if (!result.ok) {
                                return callback(new Error('Invalid response received from server'));
                            }
                            delete result.ok;
                            callback(undefined, result);
                        },
                        error: function (jqXHR, textStatus, err) {
                            if (options.logErrors && console && typeof console.error === 'function') {
                                console.error(jqXHR, textStatus, err);
                            }
                            callback(err || 'An unknown error occurred');
                        }
                    }));
                };
            };
        }
    );
}());
