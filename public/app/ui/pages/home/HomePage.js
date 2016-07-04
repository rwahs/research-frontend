(function () {
    'use strict';

    define(
        [
            'util/container'
        ],
        function (container) {
            return function () {
                this.ready = function (callback) {
                    container.resolve('ui.overlay').loading(false);
                    callback();
                };
            };
        }
    );
}());
