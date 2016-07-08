(function () {
    'use strict';

    define(
        [
            'lodash',
            'jquery'
        ],
        function (_, $) {
            return function (baseUrl, options) {
                var queryString;

                options = options || {};

                queryString = function (parameters) {
                    return _.map(parameters.children, function (child) {
                        return child.hasOwnProperty('children') ?
                            '(' + queryString(child) + ')' :
                            '(' + child.field + ':' + child.value + ')'; // TODO Use comparator
                    })
                    .join(' ' + parameters.operator + ' ');
                };

                return function (parameters, callback) {
                    $.ajax(_.merge({}, options.ajaxOptions || {}, {
                        url: baseUrl +
                            '?q=' + queryString(parameters || {}) +
                            (options.noCache ? '&noCache=1' : '') +
                            (options.limit ? '&limit=' + options.limit : ''),
                        success: function (result) {
                            if (!result.ok) {
                                return callback(new Error('Invalid response received from server'));
                            }
                            delete result.ok;
                            callback(undefined, _.values(result));
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
