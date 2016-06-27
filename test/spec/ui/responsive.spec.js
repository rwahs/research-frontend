(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/responsive'
        ],
        function (chai, responsive) {
            var expect = chai.expect;

            describe('The `responsive` module', function () {
                it('Defines a function', function () {
                    expect(responsive).to.be.a('function');
                });
                it('Exposes an `update` function', function () {
                    expect(responsive.update).to.be.a('function');
                });
            });
        }
    );
}());
