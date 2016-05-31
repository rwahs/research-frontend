(function () {
    'use strict';

    define(
        [
            'sinon'
        ],
        function (sinon) {
            return function (error, results) {
                return sinon.stub().callsArgWith(1, error, results);
            };
        }
    );
}());
