(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'util/container',
            'ui/pages/home/HomePage'
        ],
        function (chai, sinon, container, HomePage) {
            var expect = chai.expect;

            describe('The `HomePage` module', function () {
                it('Defines a constructor function', function () {
                    expect(HomePage).to.be.a('function');
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
                        var page, element;
                        beforeEach(function () {
                            page = new HomePage();
                            element = document.createElement('div');
                        });
                        it('Exposes life cycle methods', function () {
                            expect(page.ready).to.be.a('function');
                        });
                        describe('When the page is ready', function () {
                            beforeEach(function (done) {
                                page.ready(element, done);
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
