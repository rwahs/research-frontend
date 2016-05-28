(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/pages/Page'
        ],
        function (chai, Page) {
            var expect = chai.expect;

            describe('The `Page` module', function () {
                it('Defines a constructor function', function () {
                    expect(Page).to.be.a('function');
                });
            });
        }
    );
}());
