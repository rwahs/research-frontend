(function () {
    'use strict';

    define(
        [
            'sinon'
        ],
        function (sinon) {
            return function (error, data) {
                return sinon.stub().callsArgWith(1, error, data);
            };
        }
    );
}());
