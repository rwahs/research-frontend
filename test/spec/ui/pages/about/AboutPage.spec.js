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
                describe('When constructed', function () {
                    var page;
                    beforeEach(function () {
                        page = new AboutPage();
                    });
                    it('Exposes life cycle functions', function () {
                        expect(page.ready).to.be.a('function');
                    });
                });
            });
        }
    );
}());
