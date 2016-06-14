(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'config/routes'
        ],
        function (chai, sinon, ko, routes) {
            var expect = chai.expect;

            describe('The `routes` configuration module', function () {
                it('Defines a function', function () {
                    expect(routes).to.be.a('function');
                });
                it('Exposes utility functions', function () {
                    expect(routes.searchUrlFor).to.be.a('function');
                    expect(routes.detailUrlFor).to.be.a('function');
                    expect(routes.pushState).to.be.a('function');
                });
                describe('The `searchUrlFor` function', function () {
                    describe('With no `query` parameter', function () {
                        it('Returns the correct URL', function () {
                            expect(routes.searchUrlFor('type')).to.equal('/type/search');
                            expect(routes.searchUrlFor('blizblaz')).to.equal('/blizblaz/search');
                        });
                    });
                    describe('With an object `query` parameter', function () {
                        it('Returns the correct URL', function () {
                            expect(routes.searchUrlFor('type', { foo: 'bar', xyzzy: 'quux' })).to.equal('/type/search?foo=bar&xyzzy=quux');
                            expect(routes.searchUrlFor('blizblaz', { a: 'b', x: 'y' })).to.equal('/blizblaz/search?a=b&x=y');
                        });
                    });
                });
                describe('The `detailUrlFor` function', function () {
                    describe('With an `id` parameter', function () {
                        it('Returns the correct URL', function () {
                            expect(routes.detailUrlFor('type', 42)).to.equal('/type/detail/42');
                            expect(routes.detailUrlFor('blizblaz', 69)).to.equal('/blizblaz/detail/69');
                        });
                    });
                });
            });
        }
    );
}());
