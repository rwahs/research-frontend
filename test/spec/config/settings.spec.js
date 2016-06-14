(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'config/settings'
        ],
        function (chai, sinon, ko, settings) {
            var expect = chai.expect;

            describe('The `settings` configuration module', function () {
                it('Defines a function', function () {
                    expect(settings).to.be.a('function');
                });
                // TODO Tests for this
            });
        }
    );
}());
