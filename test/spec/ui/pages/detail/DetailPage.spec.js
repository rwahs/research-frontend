(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/pages/detail/DetailPage'
        ],
        function (chai, DetailPage) {
            var expect = chai.expect;

            describe('The `DetailPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(DetailPage).to.be.a('function');
                });
            });
        }
    );
}());
