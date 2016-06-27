(function () {
    'use strict';

    define(
        [
            'jquery'
        ],
        function ($) {
            var responsive;

            responsive = function () {
                $(function () {
                    $(window).on('resize', responsive.update);
                    responsive.update();
                });
            };

            responsive.update = function () {
                var $footer = $('footer.navbar');
                if ($('header.navbar').outerHeight(true) + $('#application-container').outerHeight(true) + $footer.outerHeight(true) < $(window).innerHeight()) {
                    $footer.addClass('navbar-fixed-bottom').removeClass('navbar-static-bottom');
                } else {
                    $footer.addClass('navbar-static-bottom').removeClass('navbar-fixed-bottom');
                }
            };

            return responsive;
        }
    );
}());
