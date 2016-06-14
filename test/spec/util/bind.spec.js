(function () {
    'use strict';

    define(
        [
            'chai',
            'util/bind'
        ],
        function (chai, bind) {
            var expect = chai.expect;

            describe('The `bind` module', function () {
                it('Defines a function', function () {
                    expect(bind).to.be.a('function');
                });
                // TODO Tests for this
            });
        }
    );
}());
