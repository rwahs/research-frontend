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
                describe('When constructed', function () {
                    var page;
                    beforeEach(function () {
                        page = new HomePage();
                    });
                    it('Exposes life cycle functions', function () {
                        expect(page.ready).to.be.a('function');
                    });
                });
            });
        }
    );
}());
