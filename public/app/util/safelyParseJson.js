(function () {
    'use strict';

    define(
        [
        ],
        function () {
            return function (string) {
                try {
                    return JSON.parse(string);
                } catch (e) {
                    if (console && typeof console.error === 'function') {
                        console.error(e);
                    }
                    return '';
                }
            };
        }
    );
}());
