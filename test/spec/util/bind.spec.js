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
                // Further tests are difficult due to tight integration with the browser DOM
            });
        }
    );
}());
