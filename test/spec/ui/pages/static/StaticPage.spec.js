(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/pages/static/StaticPage'
        ],
        function (chai, StaticPage) {
            var expect = chai.expect;

            describe('The `StaticPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(StaticPage).to.be.a('function');
                });
                describe('When constructed', function () {
                    var page;
                    beforeEach(function () {
                        page = new StaticPage();
                    });
                    it('Exposes life cycle functions', function () {
                        expect(page.ready).to.be.a('function');
                    });
                });
            });
        }
    );
}());
