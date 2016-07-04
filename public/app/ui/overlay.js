(function () {
    'use strict';

    define(
        [
            'jquery'
        ],
        function ($) {
            return function (debug) {
                return {
                    loading: function (status) {
                        $('#loading-overlay').toggle(status);
                    },

                    error: function (message, fatal) {
                        $('#error-message')
                            .append($('<div>')
                                .addClass('container')
                                .append($('<span>').addClass('glyphicon glyphicon-alert'))
                                .append(fatal ? 'A fatal error occurred' : 'An error occurred')
                                .append((debug && message) ? ': ' + message : ''))
                            .on('click', function () {
                                $(this).fadeOut();
                            })
                            .slideDown();
                    }
                };
            };
        }
    );
}());
