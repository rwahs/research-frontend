(function () {
    'use strict';

    define(
        [
            'lodash',
            'jquery'
        ],
        function (_, $) {
            return function (baseUrl, ajaxOptions, noCache, logErrors) {
                return function (id, callback) {
                    if (!id) {
                        return callback(new Error('Missing required "id" parameter in detail service'));
                    }
                    $.ajax(_.merge({}, ajaxOptions, {
                        url: baseUrl + '?id=' + id + (noCache ? '&noCache=1' : ''),
                        success: function (result) {
                            if (!result.ok) {
                                return callback(new Error('Invalid response received from server'));
                            }
                            delete result.ok;
                            callback(undefined, result);
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
