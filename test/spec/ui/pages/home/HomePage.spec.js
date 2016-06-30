(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/pages/home/HomePage'
        ],
        function (chai, HomePage) {
            var expect = chai.expect;

            describe('The `HomePage` module', function () {
                it('Defines a constructor function', function () {
                    expect(HomePage).to.be.a('function');
                });
            });
        }
    );
}());
