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
                            idno: '1984/42',
                            title: 'The Meaning of Life',
                            description: '<p>Rich text <strong>description</strong>.</p>'
                        });
                        container.register('detail.collection', detailService);
                        container.register('settings.collection', {
                            collectionName: 'Test',
                            detailFields: 'fixtures/collections/detailFields'
                        });
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
                            page = new DetailPage(context);
                        });
                        it('Exposes observables', function () {
                            expect(ko.isObservable(page.detailFields)).to.equal(true);
                            expect(ko.isObservable(page.loading)).to.equal(true);
                        });
                        it('Exposes computed observables', function () {
                            expect(ko.isPureComputed(page.data)).to.equal(true);
                            expect(ko.isPureComputed(page.idno)).to.equal(true);
                            expect(ko.isPureComputed(page.displayRecord)).to.equal(true);
                            expect(ko.isPureComputed(page.typeHeader)).to.equal(true);
                            expect(ko.isPureComputed(page.detail)).to.equal(true);
                        });
                        it('Has the correct initial state', function () {
                            expect(page.detailFields()).to.deep.equal([]);
                            expect(page.loading()).to.equal(false);
                            expect(page.data()).to.equal(undefined);
                            expect(page.idno()).to.equal(undefined);
                            expect(page.displayRecord()).to.equal(false);
                            expect(page.typeHeader()).to.equal('Test Record');
                            expect(page.detail()).to.equal('collections/collection/detail');
                        });
                        it('Exposes life cycle methods', function () {
                            expect(page.binding).to.be.a('function');
                        });
                        it('Exposes view helper methods', function () {
                            expect(page.labelFor).to.be.a('function');
                            expect(page.displayFor).to.be.a('function');
                            expect(page.displayForLabelField).to.be.a('function');
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
                            it('Displays the record', function () {
                                expect(page.displayRecord()).to.equal(true);
                            });
                            it('Stores the loaded data', function () {
                                expect(page.data()).to.deep.equal({
                                    id: 42,
                                    idno: '1984/42',
                                    title: 'The Meaning of Life',
                                    description: '<p>Rich text <strong>description</strong>.</p>'
                                });
                            });
                            describe('The `labelFor` method', function () {
                                describe('When given the key of a known field', function () {
                                    it('Returns the correct labels', function () {
                                        expect(page.labelFor('idno')).to.equal('Accession Number');
                                        expect(page.labelFor('title')).to.equal('Item Title');
                                    });
                                });
                                describe('When given the key of an unknown field', function () {
                                    it('Returns an empty string by default', function () {
                                        expect(page.labelFor('foo')).to.equal('');
                                    });
                                });
                            });
                            describe('The `displayFor` method', function () {
                                describe('When given the key of a known field without a `display` setting', function () {
                                    it('Displays using the text display by default', function () {
                                        expect(page.displayFor('idno').name).to.equal('display/text');
                                        expect(page.displayFor('idno').params).to.be.a('object');
                                        expect(Object.keys(page.displayFor('idno').params)).to.deep.equal([ 'data', 'name', 'placeholder' ]);
                                    });
                                });
                                describe('When given the key of a known field with a `display` setting', function () {
                                    it('Displays using the specfied display', function () {
                                        expect(page.displayFor('description').name).to.equal('display/html');
                                        expect(page.displayFor('description').params).to.be.a('object');
                                        expect(Object.keys(page.displayFor('description').params)).to.deep.equal([ 'data', 'name', 'placeholder' ]);
                                    });
                                });
                                describe('When given the key of an unknown field', function () {
                                    it('Returns undefined', function () {
                                        expect(page.displayFor('unknown-field')).to.equal(undefined);
                                    });
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
                        container.register('detail.collection', detailService);
                        container.register('settings.collection', {
                            collectionName: 'Test',
                            detailFields: 'fixtures/collections/detailFields'
                        });
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
                            page = new DetailPage(context);
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
                            it('Does not display the record', function () {
                                expect(page.displayRecord()).to.equal(false);
                            });
                            it('Does not store any data', function () {
                                expect(page.data()).to.equal(undefined);
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
