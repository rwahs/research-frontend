(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'config/routes',
            'util/container',
            'ui/pages/search/SearchPage'
        ],
        function (chai, sinon, ko, routes, container, SearchPage) {
            var expect = chai.expect;

            describe('The `SearchPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(SearchPage).to.be.a('function');
                });
                describe('When the search service is returning valid results', function () {
                    describe('When there are multiple available search types', function () {
                        var searchService, overlay;
                        beforeEach(function () {
                            sinon.stub(routes, 'pushState');
                            // jshint camelcase: false
                            searchService = sinon.stub().callsArgWith(1, undefined, [
                                { object_id: 1, first: 'First 1', second: 'Second 1', third: 'Third 1' },
                                { object_id: 2, first: 'First 2', second: 'Second 2', third: 'Third 2' },
                                { object_id: 3, first: 'First 3', second: 'Second 3', third: 'Third 3' }
                            ]);
                            container.register('search.collection', searchService);
                            container.register('settings.collection', {
                                collectionName: 'Collection',
                                searchTypes: 'fixtures/collections/searchTypes',
                                searchResultFields: 'fixtures/collections/searchResultFields'
                            });
                            container.register('types', {
                                Collection: 'collection'
                            });
                            overlay = {
                                loading: sinon.stub(),
                                error: sinon.stub()
                            };
                            container.register('ui.overlay', overlay);
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
                                page = new SearchPage(context);
                            });
                            it('Returns an object', function () {
                                expect(page).to.be.an('object');
                            });
                            it('Exposes the correct observables and computed observables', function () {
                                expect(ko.isObservable(page.searchText)).to.equal(true);
                                expect(ko.isObservable(page.advancedMode)).to.equal(true);
                                expect(ko.isObservable(page.searchTypes)).to.equal(true);
                                expect(ko.isObservable(page.searchResultFields)).to.equal(true);
                                expect(ko.isObservable(page.displayResults)).to.equal(true);
                                expect(ko.isPureComputed(page.displayedResults)).to.equal(true);
                                expect(ko.isPureComputed(page.submittedQuery)).to.equal(true);
                                expect(ko.isPureComputed(page.heading)).to.equal(true);
                                expect(ko.isPureComputed(page.placeholder)).to.equal(true);
                                expect(ko.isPureComputed(page.advancedModeToggleText)).to.equal(true);
                                expect(ko.isPureComputed(page.hasResults)).to.equal(true);
                                expect(ko.isPureComputed(page.displaySearchTypeSwitch)).to.equal(true);
                            });
                            it('Exposes life cycle methods', function () {
                                expect(page.binding).to.be.a('function');
                            });
                            it('Exposes event handlers', function () {
                                expect(page.toggleAdvancedMode).to.be.a('function');
                                expect(page.submit).to.be.a('function');
                                expect(page.reset).to.be.a('function');
                            });
                            it('Exposes view helper methods', function () {
                                expect(page.displayFor).to.be.a('function');
                                expect(page.displayForLabelField).to.be.a('function');
                                expect(page.resultFor).to.be.a('function');
                                expect(page.detailUrlFor).to.be.a('function');
                                expect(page.searchUrlFor).to.be.a('function');
                            });
                            it('Gives the correct default values', function () {
                                expect(page.searchText()).to.equal('');
                                expect(page.advancedMode()).to.equal(false);
                                expect(page.searchTypes()).to.deep.equal([]);
                                expect(page.searchResultFields()).to.deep.equal([]);
                            });
                            it('Is not displaying results', function () {
                                expect(page.displayResults()).to.equal(false);
                            });
                            it('Has not displayed the loading animation', function () {
                                expect(overlay.loading.callCount).to.equal(0);
                            });
                            it('Has not displayed any errors', function () {
                                expect(overlay.error.callCount).to.equal(0);
                            });
                            it('Gives the right default computed values', function () {
                                expect(page.heading()).to.equal('Collection Search');
                                expect(page.placeholder()).to.equal('Enter your search terms...');
                                expect(page.hasResults()).to.equal(false);
                                expect(page.displaySearchTypeSwitch()).to.equal(false);
                            });
                            describe('When bound to the view', function () {
                                var containerElement;
                                beforeEach(function (done) {
                                    containerElement = document.createElement('div');
                                    page.binding(containerElement, done);
                                });
                                it('Sets the search types', function () {
                                    expect(page.searchTypes()).to.have.length(2); // see fixtures/collections/searchTypes.js
                                    expect(page.displaySearchTypeSwitch()).to.equal(true);
                                });
                                it('Sets the active search type', function () {
                                    expect(page.searchTypes()[0].active()).to.equal(true);
                                    expect(page.searchTypes()[1].active()).to.equal(false);
                                });
                                it('Sets the placeholder text', function () {
                                    expect(page.placeholder()).to.equal('Search by Field One...');
                                });
                                it('Sets the result fields', function () {
                                    expect(page.searchResultFields()).to.have.length(3); // see fixtures/collections/searchResultFields.js
                                });
                                it('Is in basic search mode', function () {
                                    expect(page.advancedMode()).to.equal(false);
                                });
                                it('Is not displaying results', function () {
                                    expect(page.displayResults()).to.equal(false);
                                });
                                it('Has not displayed the loading animation', function () {
                                    expect(overlay.loading.callCount).to.equal(0);
                                });
                                it('Has not displayed any errors', function () {
                                    expect(overlay.error.callCount).to.equal(0);
                                });
                                describe('When the advanced mode is toggled', function () {
                                    beforeEach(function () {
                                        page.toggleAdvancedMode();
                                    });
                                    it('Sets the search into advanced mode', function () {
                                        expect(page.advancedMode()).to.equal(true);
                                    });
                                    describe('When the advanced mode is toggled again', function () {
                                        beforeEach(function () {
                                            page.toggleAdvancedMode();
                                        });
                                        it('Sets the search back into basic mode', function () {
                                            expect(page.advancedMode()).to.equal(false);
                                        });
                                    });
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
                                    it('Is in basic search mode', function () {
                                        expect(page.advancedMode()).to.equal(false);
                                    });
                                    it('Is not displaying results', function () {
                                        expect(page.displayResults()).to.equal(false);
                                    });
                                    it('Has not displayed the loading animation', function () {
                                        expect(overlay.loading.callCount).to.equal(0);
                                    });
                                    it('Has not displayed any errors', function () {
                                        expect(overlay.error.callCount).to.equal(0);
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
                                        it('Is in basic search mode', function () {
                                            expect(page.advancedMode()).to.equal(false);
                                        });
                                        it('Is not displaying results', function () {
                                            expect(page.displayResults()).to.equal(false);
                                        });
                                        it('Has not displayed the loading animation', function () {
                                            expect(overlay.loading.callCount).to.equal(0);
                                        });
                                        it('Has not displayed any errors', function () {
                                            expect(overlay.error.callCount).to.equal(0);
                                        });
                                    });
                                    describe('When the search form is submitted', function () {
                                        beforeEach(function () {
                                            page.submit();
                                        });
                                        it('Does not call the search service', function () {
                                            sinon.assert.notCalled(searchService);
                                        });
                                        it('Is in basic search mode', function () {
                                            expect(page.advancedMode()).to.equal(false);
                                        });
                                        it('Is not displaying results', function () {
                                            expect(page.displayResults()).to.equal(false);
                                        });
                                        it('Has not displayed the loading animation', function () {
                                            expect(overlay.loading.callCount).to.equal(0);
                                        });
                                        it('Has not displayed any errors', function () {
                                            expect(overlay.error.callCount).to.equal(0);
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
                                        it('Is in basic search mode', function () {
                                            expect(page.advancedMode()).to.equal(false);
                                        });
                                        it('Is not displaying results', function () {
                                            expect(page.displayResults()).to.equal(false);
                                        });
                                        it('Has not displayed the loading animation', function () {
                                            expect(overlay.loading.callCount).to.equal(0);
                                        });
                                        it('Has not displayed any errors', function () {
                                            expect(overlay.error.callCount).to.equal(0);
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
                                        it('Is in basic search mode', function () {
                                            expect(page.advancedMode()).to.equal(false);
                                        });
                                        it('Is displaying results', function () {
                                            expect(page.displayResults()).to.equal(true);
                                        });
                                        it('Has displayed and then hidden the loading animation', function () {
                                            expect(overlay.loading.callCount).to.equal(2);
                                            expect(overlay.loading.getCall(0).args).to.deep.equal([ true ]);
                                            expect(overlay.loading.getCall(1).args).to.deep.equal([ false ]);
                                        });
                                        it('Has not displayed any errors', function () {
                                            expect(overlay.error.callCount).to.equal(0);
                                        });
                                    });
                                });
                            });
                            describe('The `displayFor` view helper method', function () {
                                describe('When passed a minimal field definition', function () {
                                    var field, result, returnValue;
                                    beforeEach(function () {
                                        field = {
                                            key: 'field'
                                        };
                                        result = {
                                            data: 'This is the data'
                                        };
                                        returnValue = page.displayFor(field, result);
                                    });
                                    it('Returns the correct object structure', function () {
                                        expect(returnValue).to.deep.equal({
                                            name: 'display/text',
                                            params: {
                                                data: 'This is the data',
                                                name: 'field',
                                                display: undefined,
                                                placeholder: undefined
                                            }
                                        });
                                    });
                                });
                                describe('When passed a complete field definition', function () {
                                    var field, result, returnValue;
                                    beforeEach(function () {
                                        field = {
                                            key: 'field',
                                            display: 'fancy',
                                            placeholder: 'No data'
                                        };
                                        result = {
                                            data: 'This is the data'
                                        };
                                        returnValue = page.displayFor(field, result);
                                    });
                                    it('Returns the correct object structure', function () {
                                        expect(returnValue).to.deep.equal({
                                            name: 'display/fancy',
                                            params: {
                                                data: 'This is the data',
                                                name: 'field',
                                                display: 'fancy',
                                                placeholder: 'No data'
                                            }
                                        });
                                    });
                                });
                            });
                            describe('The `detailUrlFor` view helper method', function () {
                                it('Returns the correct URL', function () {
                                    var record = {
                                        id: ko.observable(42),
                                        data: ko.observable({ type: 'Collection' })
                                    };
                                    expect(page.detailUrlFor(record)).to.equal('/collection/detail/42');
                                });
                            });
                        });
                        afterEach(function () {
                            container.reset();
                            routes.pushState.restore();
                        });
                    });
                    describe('When there is only one available search type', function () {
                        var searchService, overlay;
                        beforeEach(function () {
                            // jshint camelcase: false
                            searchService = sinon.stub().callsArgWith(1, undefined, []);
                            container.register('search.collection', searchService);
                            container.register('settings.collection', {
                                collectionName: 'Collection',
                                searchTypes: 'fixtures/collections/singleSearchType',
                                searchResultFields: 'fixtures/collections/searchResultFields'
                            });
                            container.register('types', {
                                Collection: 'collection'
                            });
                            overlay = {
                                loading: sinon.stub(),
                                error: sinon.stub()
                            };
                            container.register('ui.overlay', overlay);
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
                                page = new SearchPage(context);
                            });
                            it('Returns an object', function () {
                                expect(page).to.be.an('object');
                            });
                            describe('When bound to the view', function () {
                                var containerElement;
                                beforeEach(function (done) {
                                    containerElement = document.createElement('div');
                                    page.binding(containerElement, done);
                                });
                                it('Sets the single search type', function () {
                                    expect(page.searchTypes()).to.have.length(1); // see fixtures/collections/singleSearchType.js
                                    expect(page.displaySearchTypeSwitch()).to.equal(false);
                                });
                                it('Sets the active search type', function () {
                                    expect(page.searchTypes()[0].active()).to.equal(true);
                                });
                            });
                        });
                        afterEach(function () {
                            container.reset();
                        });
                    });
                });
                describe('When the search service is returning errors', function () {
                    var searchService, overlay;
                    beforeEach(function () {
                        sinon.stub(routes, 'pushState');
                        // jshint camelcase: false
                        searchService = sinon.stub().callsArgWith(1, new Error('Search Error'));
                        container.register('search.collection', searchService);
                        container.register('settings.collection', {
                            collectionName: 'Collection',
                            searchTypes: 'fixtures/collections/searchTypes',
                            searchResultFields: 'fixtures/collections/searchResultFields'
                        });
                        container.register('types', {
                            Collection: 'collection'
                        });
                        overlay = {
                            loading: sinon.stub(),
                            error: sinon.stub()
                        };
                        container.register('ui.overlay', overlay);
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
                            page = new SearchPage(context);
                        });
                        describe('When bound to the view', function () {
                            var element;
                            beforeEach(function (done) {
                                element = document.createElement('div');
                                page.binding(element, done);
                            });
                            describe('When the search form is submitted with a valid query', function () {
                                beforeEach(function () {
                                    page.searchText('query');
                                    page.submit();
                                });
                                it('Calls the specified search service', function () {
                                    sinon.assert.calledOnce(searchService);
                                });
                                it('Is not displaying results', function () {
                                    expect(page.displayResults()).to.equal(false);
                                });
                                it('Has displayed and then hidden the loading animation', function () {
                                    expect(overlay.loading.callCount).to.equal(2);
                                    expect(overlay.loading.getCall(0).args).to.deep.equal([ true ]);
                                    expect(overlay.loading.getCall(1).args).to.deep.equal([ false ]);
                                });
                                it('Has displayed an error', function () {
                                    expect(overlay.error.callCount).to.equal(1);
                                    expect(overlay.error.getCall(0).args).to.deep.equal([ new Error('Service Error') ]);
                                });
                            });
                        });
                    });
                    afterEach(function () {
                        container.reset();
                        routes.pushState.restore();
                    });
                });
            });
        }
    );
}());
