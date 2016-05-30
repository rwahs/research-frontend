(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/error/Error'
        ],
        function (chai, Error) {
            var expect = chai.expect;

            describe('The `Error` module', function () {
                it('Defines a constructor function', function () {
                    expect(Error).to.be.a('function');
                });
            });
        }
    );
}());
