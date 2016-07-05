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

                    error: function (message) {
                        $('#error-message')
                            .append($('<div>')
                                .addClass('container')
                                .append($('<span>').addClass('glyphicon glyphicon-alert'))
                                .append('An error occurred')
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
