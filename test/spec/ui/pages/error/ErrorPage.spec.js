(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'util/container',
            'ui/pages/error/ErrorPage'
        ],
        function (chai, sinon, container, ErrorPage) {
            var expect = chai.expect;

            describe('The `ErrorPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(ErrorPage).to.be.a('function');
                });
                describe('When the container is correctly configured', function () {
                    var overlay;
                    beforeEach(function () {
                        overlay = {
                            loading: sinon.stub(),
                            error: sinon.stub()
                        };
                        container.register('ui.overlay', overlay);
                        container.seal();
                    });
                    describe('When constructed', function () {
                        var page;
                        beforeEach(function () {
                            page = new ErrorPage();
                        });
                        it('Exposes life cycle methods', function () {
                            expect(page.ready).to.be.a('function');
                        });
                        describe('When the page is ready', function () {
                            beforeEach(function (done) {
                                page.ready(done);
                            });
                            it('Hides the loading overlay', function () {
                                expect(overlay.loading.callCount).to.equal(1);
                                expect(overlay.loading.getCall(0).args).to.deep.equal([ false ]);
                            });
                        });
                    });
                    afterEach(function () {
                        container.reset();
                    });
                });
            });
        }
    );
}());
