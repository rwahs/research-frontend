(function () {
    'use strict';

    define(
        [
            'ui/responsive'
        ],
        function (responsive) {
            return function () {
                this.ready = function (element, callback) {
                    responsive.update();
                    callback();
                };
            };
        }
    );
}());
