(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/pages/error/ErrorPage'
        ],
        function (chai, ErrorPage) {
            var expect = chai.expect;

            describe('The `ErrorPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(ErrorPage).to.be.a('function');
                });
            });
        }
    );
}());
