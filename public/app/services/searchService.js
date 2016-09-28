(function () {
    'use strict';

    define(
        [
            'lodash',
            'jquery'
        ],
        function (_, $) {
            var comparatorTemplates, queryString;

            comparatorTemplates = {
                contains: _.template('(<%= field %>:"<%= value %>")'),
                notContains: _.template('!(<%= field %>:"<%= value %>")'),
                startsWith: _.template('(<%= field %>:<%= value %>*)'),
                notStartsWith: _.template('!(<%= field %>:<%= value %>*)'),
                empty: _.template('(<%= field %>:[BLANK])'),
                notEmpty: _.template('(<%= field %>:*)')
            };

            queryString = function (parameters) {
                return _(parameters.children)
                    .map(function (child) {
                        return child.hasOwnProperty('children') ?
                            '(' + queryString(child) + ')' :
                            comparatorTemplates[child.comparator](child);
                    })
                    .join(' ' + parameters.operator + ' ');
            };

            return function (baseUrl, options) {
                options = options || {};

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
