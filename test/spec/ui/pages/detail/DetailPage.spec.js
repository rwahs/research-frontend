(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'util/container',
            'ui/pages/detail/DetailPage',
            'mock/services/MockDetailService'
        ],
        function (chai, sinon, ko, container, DetailPage, MockDetailService) {
            var expect = chai.expect;

            describe('The `DetailPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(DetailPage).to.be.a('function');
                });
                describe('When the detail service is returning valid results', function () {
                    var detailService;
                    beforeEach(function () {
                        detailService = new MockDetailService(undefined, {
                            id: 42,
                            name: 'The Meaning of Life',
                            field: 'value'
                        });
                        container.register('detail', detailService);
                        container.seal();
                    });
                    describe('When constructed with valid parameters', function () {
                        var context, page;
                        beforeEach(function () {
                            context = {
                                params: {
                                    type: 'collection',
                                    id: 42
                                }
                            };
                            page = new DetailPage(context, {
                                detailServiceKey: 'detail'
                            });
                        });
                        it('Exposes observables', function () {
                            expect(ko.isObservable(page.loading)).to.equal(true);
                            expect(ko.isObservable(page.data)).to.equal(true);
                        });
                        it('Has the correct initial state', function () {
                            expect(page.data()).to.deep.equal({});
                            expect(page.loading()).to.equal(false);
                        });
                        it('Exposes life cycle methods', function () {
                            expect(page.binding).to.be.a('function');
                        });
                        describe('When bound to the view', function () {
                            var element;
                            beforeEach(function (done) {
                                element = document.createElement('div');
                                page.binding(element, done);
                            });
                            it('Calls the detail service', function () {
                                sinon.assert.calledOnce(detailService);
                                sinon.assert.calledWith(detailService, 42);
                            });
                            it('Is not loading', function () {
                                expect(page.loading()).to.equal(false);
                            });
                            it('Stores the loaded data', function () {
                                expect(page.data()).to.deep.equal({
                                    id: 42,
                                    name: 'The Meaning of Life',
                                    field: 'value'
                                });
                            });
                        });
                    });
                    afterEach(function () {
                        container.reset();
                    });
                });
                describe('When the detail service is returning errors', function () {
                    var detailService;
                    beforeEach(function () {
                        detailService = new MockDetailService(new Error('Service Error'));
                        container.register('detail', detailService);
                        container.seal();
                    });
                    describe('When constructed with valid parameters', function () {
                        var context, page;
                        beforeEach(function () {
                            context = {
                                params: {
                                    type: 'collection'
                                }
                            };
                            page = new DetailPage(context, {
                                detailServiceKey: 'detail'
                            });
                        });
                        describe('When bound to the view', function () {
                            var element;
                            beforeEach(function (done) {
                                element = document.createElement('div');
                                page.binding(element, done);
                            });
                            it('Calls the specified detail service', function () {
                                sinon.assert.calledOnce(detailService);
                            });
                            it('Is not loading', function () {
                                expect(page.loading()).to.equal(false);
                            });
                            it('Does not store any data', function () {
                                expect(page.data()).to.deep.equal({});
                            });
                            // TODO Displays the error
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
