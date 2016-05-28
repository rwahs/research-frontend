(function () {
    'use strict';

    define(
        [
            'chai',
            'util/router'
        ],
        function (chai, router) {
            var expect = chai.expect;

            describe('The `router` module', function () {
                it('Defines a function', function () {
                    expect(router).to.be.a('function');
                });
            });
        }
    );
}());
