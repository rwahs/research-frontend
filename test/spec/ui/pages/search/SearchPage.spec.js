(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'util/container',
            'ui/pages/search/SearchPage',
            'mock/services/MockSearchService'
        ],
        function (chai, sinon, ko, container, SearchPage, MockSearchService) {
            var expect = chai.expect;

            describe('The `SearchPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(SearchPage).to.be.a('function');
                });
                describe('When the search service is returning valid results', function () {
                    var searchService;
                    beforeEach(function () {
                        // jshint camelcase: false
                        searchService = new MockSearchService(undefined, [
                            { object_id: 1, first: 'First 1', second: 'Second 1', third: 'Third 1' },
                            { object_id: 2, first: 'First 2', second: 'Second 2', third: 'Third 2' },
                            { object_id: 3, first: 'First 3', second: 'Second 3', third: 'Third 3' }
                        ]);
                        container.register('search', searchService);
                        container.seal();
                    });
                    describe('When constructed with correct parameters', function () {
                        var context, page;
                        beforeEach(function () {
                            context = {
                                params: {
                                    type: 'collection'
                                }
                            };
                            page = new SearchPage(context, {
                                collectionName: 'Collection',
                                searchServiceKey: 'search',
                                detailUrlTemplate: 'path/to/detail/:id',
                                searchTypes: 'fixtures/search/searchTypes',
                                resultFields: 'fixtures/search/resultFields'
                            });
                        });
                        it('Returns an object', function () {
                            expect(page).to.be.an('object');
                        });
                        it('Exposes the correct observables and computed observables', function () {
                            expect(ko.isObservable(page.searchText)).to.equal(true);
                            expect(ko.isObservable(page.searchTypes)).to.equal(true);
                            expect(ko.isObservable(page.resultFields)).to.equal(true);
                            expect(ko.isObservable(page.results)).to.equal(true);
                            expect(ko.isObservable(page.loading)).to.equal(true);
                            expect(ko.isObservable(page.displayResults)).to.equal(true);
                            expect(ko.isPureComputed(page.heading)).to.equal(true);
                            expect(ko.isPureComputed(page.placeholder)).to.equal(true);
                            expect(ko.isPureComputed(page.hasResults)).to.equal(true);
                        });
                        it('Exposes life cycle methods', function () {
                            expect(page.binding).to.be.a('function');
                        });
                        it('Exposes event handlers', function () {
                            expect(page.submit).to.be.a('function');
                            expect(page.reset).to.be.a('function');
                        });
                        it('Gives the correct default values', function () {
                            expect(page.searchText()).to.equal('');
                            expect(page.searchTypes()).to.deep.equal([]);
                            expect(page.resultFields()).to.deep.equal([]);
                            expect(page.results()).to.deep.equal([]);
                        });
                        it('Is not loading or displaying results', function () {
                            expect(page.loading()).to.equal(false);
                            expect(page.displayResults()).to.equal(false);
                        });
                        it('Gives the right default computed values', function () {
                            expect(page.heading()).to.equal('Collection Search');
                            expect(page.placeholder()).to.equal('Enter your search terms...');
                            expect(page.hasResults()).to.equal(false);
                        });
                        describe('When bound to the view', function () {
                            var container;
                            beforeEach(function (done) {
                                container = document.createElement('div');
                                page.binding(container, done);
                            });
                            it('Sets the search types', function () {
                                expect(page.searchTypes()).to.have.length(2); // see fixtures/search/searchTypes.js
                            });
                            it('Sets the active search type', function () {
                                expect(page.searchTypes()[0].active()).to.equal(true);
                                expect(page.searchTypes()[1].active()).to.equal(false);
                            });
                            it('Sets the placeholder text', function () {
                                expect(page.placeholder()).to.equal('Search by Field One...');
                            });
                            it('Sets the result fields', function () {
                                expect(page.resultFields()).to.have.length(3); // see fixtures/search/resultFields.js
                            });
                            it('Is not loading or displaying results', function () {
                                expect(page.loading()).to.equal(false);
                                expect(page.displayResults()).to.equal(false);
                            });
                            describe('When a different search type is made active', function () {
                                beforeEach(function () {
                                    page.searchTypes()[1].makeActive();
                                });
                                it('Sets the active search type', function () {
                                    expect(page.searchTypes()[0].active()).to.equal(false);
                                    expect(page.searchTypes()[1].active()).to.equal(true);
                                });
                                it('Sets the placeholder text', function () {
                                    expect(page.placeholder()).to.equal('Search by Field Two...');
                                });
                                it('Is not loading or displaying results', function () {
                                    expect(page.loading()).to.equal(false);
                                    expect(page.displayResults()).to.equal(false);
                                });
                            });
                            describe('With empty search text', function () {
                                beforeEach(function () {
                                    page.searchTypes()[0].makeActive();
                                    page.searchText('');
                                });
                                describe('When the search form is reset', function () {
                                    beforeEach(function () {
                                        page.reset();
                                    });
                                    it('Resets the search query', function () {
                                        expect(page.searchText()).to.equal('');
                                    });
                                    it('Resets the search type', function () {
                                        expect(page.searchTypes()[0].active()).to.equal(true);
                                    });
                                    it('Is not loading or displaying results', function () {
                                        expect(page.loading()).to.equal(false);
                                        expect(page.displayResults()).to.equal(false);
                                    });
                                });
                                describe('When the search form is submitted', function () {
                                    beforeEach(function () {
                                        page.submit();
                                    });
                                    it('Calls the specified search service with a wildcard', function () {
                                        sinon.assert.calledOnce(searchService);
                                        sinon.assert.calledWith(searchService, { first: '*' });
                                    });
                                    it('Is not loading but is displaying results', function () {
                                        expect(page.loading()).to.equal(false);
                                        expect(page.displayResults()).to.equal(true);
                                    });
                                    it('Displays the retrieved results', function () {
                                        expect(page.results()).to.have.length(3); // 3 records in mock data
                                    });
                                });
                            });
                            describe('With non-empty search text', function () {
                                beforeEach(function () {
                                    page.searchTypes()[1].makeActive();
                                    page.searchText('query');
                                });
                                describe('When the search form is reset', function () {
                                    beforeEach(function () {
                                        page.reset();
                                    });
                                    it('Resets the search query', function () {
                                        expect(page.searchText()).to.equal('');
                                    });
                                    it('Resets the search type', function () {
                                        expect(page.searchTypes()[0].active()).to.equal(true);
                                    });
                                    it('Is not loading or displaying results', function () {
                                        expect(page.loading()).to.equal(false);
                                        expect(page.displayResults()).to.equal(false);
                                    });
                                });
                                describe('When the search form is submitted', function () {
                                    beforeEach(function () {
                                        page.submit();
                                    });
                                    it('Calls the specified search service with the given search text', function () {
                                        sinon.assert.calledOnce(searchService);
                                        sinon.assert.calledWith(searchService, { second: 'query' });
                                    });
                                    it('Is not loading but is displaying results', function () {
                                        expect(page.loading()).to.equal(false);
                                        expect(page.displayResults()).to.equal(true);
                                    });
                                    it('Displays the retrieved results', function () {
                                        expect(page.results()).to.have.length(3); // 3 records in mock data
                                    });
                                });
                            });
                        });
                    });
                    afterEach(function () {
                        container.reset();
                    });
                });
                describe('When the search service is returning errors', function () {
                    var searchService;
                    beforeEach(function () {
                        // jshint camelcase: false
                        searchService = new MockSearchService(new Error('Search Error'));
                        container.register('search', searchService);
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
                            page = new SearchPage(context, {
                                collectionName: 'Collection',
                                searchServiceKey: 'search',
                                detailUrlTemplate: 'path/to/detail/:id',
                                searchTypes: 'fixtures/search/searchTypes',
                                resultFields: 'fixtures/search/resultFields'
                            });
                        });
                        describe('When bound to the view', function () {
                            var element;
                            beforeEach(function (done) {
                                element = document.createElement('div');
                                page.binding(element, done);
                            });
                            describe('When the search form is submitted', function () {
                                beforeEach(function () {
                                    page.submit();
                                });
                                it('Calls the specified search service', function () {
                                    sinon.assert.calledOnce(searchService);
                                });
                                it('Is not loading or displaying results', function () {
                                    expect(page.loading()).to.equal(false);
                                    expect(page.displayResults()).to.equal(false);
                                });
                                it('Does not display any results', function () {
                                    expect(page.results()).to.have.length(0);
                                });
                                // TODO Displays the error
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
