(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/pages/about/AboutPage'
        ],
        function (chai, AboutPage) {
            var expect = chai.expect;

            describe('The `AboutPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(AboutPage).to.be.a('function');
                });
            });
        }
    );
}());
