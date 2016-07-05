(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'page',
            'config/routes'
        ],
        function (chai, sinon, ko, page, routes) {
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
                describe('The `pushState` function', function () {
                    beforeEach(function () {
                        sinon.stub(page, 'show');
                    });
                    describe('When invoked with a URL only', function () {
                        beforeEach(function () {
                            routes.pushState('/some/url/path');
                        });
                        it('Calls through to PageJS without a dispatch', function () {
                            expect(page.show.callCount).to.equal(1);
                            expect(page.show.getCall(0).args).to.deep.equal([ '/some/url/path', {}, false, true ]);
                        });
                    });
                    describe('When invoked with a URL and `false` dispatch', function () {
                        beforeEach(function () {
                            routes.pushState('/some/url/path', false);
                        });
                        it('Calls through to PageJS without a dispatch', function () {
                            expect(page.show.callCount).to.equal(1);
                            expect(page.show.getCall(0).args).to.deep.equal([ '/some/url/path', {}, false, true ]);
                        });
                    });
                    describe('When invoked with a URL and `true` dispatch', function () {
                        beforeEach(function () {
                            routes.pushState('/some/url/path', true);
                        });
                        it('Calls through to PageJS with dispatch', function () {
                            expect(page.show.callCount).to.equal(1);
                            expect(page.show.getCall(0).args).to.deep.equal([ '/some/url/path', {}, true, true ]);
                        });
                    });
                    afterEach(function () {
                        page.show.restore();
                    });
                });
            });
        }
    );
}());
