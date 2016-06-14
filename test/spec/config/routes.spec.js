(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'config/routes'
        ],
        function (chai, sinon, ko, routes) {
            var expect = chai.expect;

            describe('The `routes` configuration module', function () {
                it('Defines a function', function () {
                    expect(routes).to.be.a('function');
                });
                it('Exposes utility functions', function () {
                    expect(routes.searchUrlFor).to.be.a('function');
                    expect(routes.detailUrlFor).to.be.a('function');
                });
                describe('The `searchUrlFor` function', function () {
                });
                // TODO Tests for this
            });
        }
    );
}());
