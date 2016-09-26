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
                    describe('With no specified results limit', function () {
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
                                    searchInputFields: 'fixtures/collections/searchInputFields',
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
                                    expect(ko.isObservable(page.query)).to.equal(true);
                                    expect(ko.isObservable(page.advancedMode)).to.equal(true);
                                    expect(ko.isObservable(page.inputFields)).to.equal(true);
                                    expect(ko.isObservable(page.resultFields)).to.equal(true);
                                    expect(ko.isObservable(page.displayResults)).to.equal(true);
                                    expect(ko.isPureComputed(page.displayedResults)).to.equal(true);
                                    expect(ko.isPureComputed(page.submittedQuery)).to.equal(true);
                                    expect(ko.isPureComputed(page.submittedQueryText)).to.equal(true);
                                    expect(ko.isPureComputed(page.queryText)).to.equal(true);
                                    expect(ko.isPureComputed(page.queryModified)).to.equal(true);
                                    expect(ko.isPureComputed(page.heading)).to.equal(true);
                                    expect(ko.isPureComputed(page.advancedModeToggleText)).to.equal(true);
                                    expect(ko.isPureComputed(page.resultsCountText)).to.equal(true);
                                    expect(ko.isPureComputed(page.hasResults)).to.equal(true);
                                    expect(ko.isPureComputed(page.hasLimitedResults)).to.equal(true);
                                    expect(ko.isPureComputed(page.canSubmit)).to.equal(true);
                                    // TODO Further tests for these computed observables; no shop details are set above.
                                    expect(ko.isPureComputed(page.shopBaseUrl)).to.equal(true);
                                    expect(ko.isPureComputed(page.shopSearchUrl)).to.equal(true);
                                    expect(ko.isPureComputed(page.shopSearchText)).to.equal(true);
                                });
                                it('Exposes life cycle methods', function () {
                                    expect(page.attaching).to.be.a('function');
                                    expect(page.binding).to.be.a('function');
                                    expect(page.ready).to.be.a('function');
                                });
                                it('Exposes event handlers', function () {
                                    expect(page.toggleAdvancedMode).to.be.a('function');
                                    expect(page.submit).to.be.a('function');
                                    expect(page.reset).to.be.a('function');
                                });
                                it('Exposes view helper methods', function () {
                                    expect(page.searchUrlFor).to.be.a('function');
                                });
                                it('Gives the correct default query', function () {
                                    expect(page.query()).to.equal(undefined);
                                });
                                it('Does not have any results', function () {
                                    expect(page.resultsCountText()).to.equal('0 results');
                                    expect(page.hasResults()).to.equal(false);
                                    expect(page.hasLimitedResults()).to.equal(false);
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
                                    expect(page.resultsCountText()).to.equal('0 results');
                                    expect(page.hasResults()).to.equal(false);
                                    expect(page.hasLimitedResults()).to.equal(false);
                                });
                                describe('When attaching', function () {
                                    var element;
                                    beforeEach(function (done) {
                                        element = window.document.createElement('div');
                                        page.attaching(element, done);
                                    });
                                    describe('When bound to the view', function () {
                                        beforeEach(function (done) {
                                            page.binding(element, done);
                                        });
                                        it('Sets the search types', function () {
                                            expect(page.inputFields()).to.have.length(3); // see fixtures/collections/searchInputFields.js
                                        });
                                        it('Sets the result fields', function () {
                                            expect(page.resultFields()).to.have.length(3); // see fixtures/collections/searchResultFields.js
                                        });
                                        it('Is in basic search mode', function () {
                                            expect(page.advancedMode()).to.equal(false);
                                        });
                                        it('Exposes life cycle methods', function () {
                                            expect(page.binding).to.be.a('function');
                                        });
                                        it('Exposes event handlers', function () {
                                            expect(page.submit).to.be.a('function');
                                            expect(page.reset).to.be.a('function');
                                        });
                                        it('Exposes view helper methods', function () {
                                            expect(page.searchUrlFor).to.be.a('function');
                                        });
                                        it('Gives the correct default query', function () {
                                            expect(page.query()).to.equal(undefined);
                                        });
                                        it('Does not have any results', function () {
                                            expect(page.resultsCountText()).to.equal('0 results');
                                            expect(page.hasResults()).to.equal(false);
                                            expect(page.hasLimitedResults()).to.equal(false);
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
                                        describe('With an empty query', function () {
                                            beforeEach(function () {
                                                page.query(undefined);
                                            });
                                            it('Cannot be submitted', function () {
                                                expect(page.canSubmit()).to.equal(false);
                                            });
                                            describe('When the search form is reset', function () {
                                                beforeEach(function () {
                                                    page.reset();
                                                });
                                                it('Resets the search query', function () {
                                                    expect(page.query()).to.deep.equal(undefined);
                                                });
                                                it('Is in basic search mode', function () {
                                                    expect(page.advancedMode()).to.equal(false);
                                                });
                                                it('Does not have any results', function () {
                                                    expect(page.resultsCountText()).to.equal('0 results');
                                                    expect(page.hasResults()).to.equal(false);
                                                    expect(page.hasLimitedResults()).to.equal(false);
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
                                                it('Does not have any results', function () {
                                                    expect(page.resultsCountText()).to.equal('0 results');
                                                    expect(page.hasResults()).to.equal(false);
                                                    expect(page.hasLimitedResults()).to.equal(false);
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
                                        describe('With a non-empty query', function () {
                                            var query;
                                            beforeEach(function () {
                                                query = {
                                                    operator: 'AND',
                                                    children: [
                                                        {
                                                            field: 'field',
                                                            comparator: 'contains',
                                                            value: 'value'
                                                        }
                                                    ]
                                                };
                                                page.query(query);
                                            });
                                            describe('When the search form is reset', function () {
                                                beforeEach(function () {
                                                    page.reset();
                                                });
                                                it('Resets the search query', function () {
                                                    expect(page.query()).to.deep.equal(undefined);
                                                });
                                                it('Is in basic search mode', function () {
                                                    expect(page.advancedMode()).to.equal(false);
                                                });
                                                it('Does not have any results', function () {
                                                    expect(page.resultsCountText()).to.equal('0 results');
                                                    expect(page.hasResults()).to.equal(false);
                                                    expect(page.hasLimitedResults()).to.equal(false);
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
                                                it('Calls the specified search service with the given query', function () {
                                                    sinon.assert.calledOnce(searchService);
                                                    sinon.assert.calledWith(searchService, {
                                                        operator: 'AND',
                                                        children: [
                                                            {
                                                                field: 'field',
                                                                comparator: 'contains',
                                                                value: 'value'
                                                            }
                                                        ]
                                                    });
                                                });
                                                it('Is in basic search mode', function () {
                                                    expect(page.advancedMode()).to.equal(false);
                                                });
                                                it('Has results below the limit', function () {
                                                    expect(page.resultsCountText()).to.equal('3 results'); // 3 results defined above
                                                    expect(page.hasResults()).to.equal(true);
                                                    expect(page.hasLimitedResults()).to.equal(false);
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
                                    searchInputFields: 'fixtures/collections/singleSearchInputField',
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
                                describe('When attaching', function () {
                                    var element;
                                    beforeEach(function (done) {
                                        element = window.document.createElement('div');
                                        page.attaching(element, done);
                                    });
                                    describe('When bound to the view', function () {
                                        var containerElement;
                                        beforeEach(function (done) {
                                            containerElement = document.createElement('div');
                                            page.binding(containerElement, done);
                                        });
                                        it('Sets the single search type', function () {
                                            expect(page.inputFields()).to.have.length(1); // see fixtures/collections/singleSearchType.js
                                        });
                                    });
                                });
                            });
                            afterEach(function () {
                                container.reset();
                            });
                        });
                    });
                    describe('When the specified results limit is greater than the number of results returned', function () {
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
                            container.register('options.service', {
                                limit: 1000
                            });
                            container.register('settings.collection', {
                                collectionName: 'Collection',
                                searchInputFields: 'fixtures/collections/searchInputFields',
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
                                describe('With non-empty query', function () {
                                    var query;
                                    beforeEach(function () {
                                        query = {
                                            operator: 'AND',
                                            children: [
                                                {
                                                    field: 'second',
                                                    comparator: 'contains',
                                                    value: 'query'
                                                }
                                            ]
                                        };
                                        page.query(query);
                                    });
                                    describe('When the search form is submitted', function () {
                                        beforeEach(function () {
                                            page.submit();
                                        });
                                        it('Calls the specified search service with the given query', function () {
                                            sinon.assert.calledOnce(searchService);
                                            sinon.assert.calledWith(searchService, query);
                                        });
                                        it('Has results that are not limited', function () {
                                            expect(page.resultsCountText()).to.equal('3 results'); // 3 results defined above
                                            expect(page.hasResults()).to.equal(true);
                                            expect(page.hasLimitedResults()).to.equal(false);
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
                        });
                        afterEach(function () {
                            container.reset();
                            routes.pushState.restore();
                        });
                    });
                    describe('When the specified results limit is equal to the number of results returned', function () {
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
                            container.register('options.service', {
                                limit: 3
                            });
                            container.register('settings.collection', {
                                collectionName: 'Collection',
                                searchInputFields: 'fixtures/collections/searchInputFields',
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
                                describe('With non-empty query', function () {
                                    var query;
                                    beforeEach(function () {
                                        query = {
                                            operator: 'AND',
                                            children: [
                                                {
                                                    field: 'second',
                                                    comparator: 'contains',
                                                    value: 'query'
                                                }
                                            ]
                                        };
                                        page.query(query);
                                    });
                                    describe('When the search form is submitted', function () {
                                        beforeEach(function () {
                                            page.submit();
                                        });
                                        it('Calls the specified search service with the given query', function () {
                                            sinon.assert.calledOnce(searchService);
                                            sinon.assert.calledWith(searchService, query);
                                        });
                                        it('Has results that have been limited', function () {
                                            expect(page.resultsCountText()).to.equal('3 results'); // 3 results defined above
                                            expect(page.hasResults()).to.equal(true);
                                            expect(page.hasLimitedResults()).to.equal(true);
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
                        });
                        afterEach(function () {
                            container.reset();
                            routes.pushState.restore();
                        });
                    });
                    describe('When the specified results limit is less than the number of results returned', function () {
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
                            container.register('options.service', {
                                limit: 2
                            });
                            container.register('settings.collection', {
                                collectionName: 'Collection',
                                searchInputFields: 'fixtures/collections/searchInputFields',
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
                                describe('With non-empty query', function () {
                                    var query;
                                    beforeEach(function () {
                                        query = {
                                            operator: 'AND',
                                            children: [
                                                {
                                                    field: 'second',
                                                    comparator: 'contains',
                                                    value: 'query'
                                                }
                                            ]
                                        };
                                        page.query(query);
                                    });
                                    describe('When the search form is submitted', function () {
                                        beforeEach(function () {
                                            page.submit();
                                        });
                                        it('Calls the specified search service with the given query', function () {
                                            sinon.assert.calledOnce(searchService);
                                            sinon.assert.calledWith(searchService, query);
                                        });
                                        it('Has results that have been limited', function () {
                                            expect(page.resultsCountText()).to.equal('3 results'); // 3 results defined above
                                            expect(page.hasResults()).to.equal(true);
                                            expect(page.hasLimitedResults()).to.equal(true);
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
                        });
                        afterEach(function () {
                            container.reset();
                            routes.pushState.restore();
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
                            inputFields: 'fixtures/collections/searchInputFields',
                            resultFields: 'fixtures/collections/searchResultFields'
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
                        describe('When attaching', function () {
                            var element;
                            beforeEach(function (done) {
                                element = window.document.createElement('div');
                                page.attaching(element, done);
                            });
                            describe('When bound to the view', function () {
                                beforeEach(function (done) {
                                    page.binding(element, done);
                                });
                                describe('When the search form is submitted with a valid query', function () {
                                    var query;
                                    beforeEach(function () {
                                        query = {
                                            operator: 'AND',
                                            children: [
                                                {
                                                    field: 'field',
                                                    comparator: 'contains',
                                                    value: 'value'
                                                }
                                            ]
                                        };
                                        page.query(query);
                                        page.submit();
                                    });
                                    it('Calls the specified search service', function () {
                                        sinon.assert.calledOnce(searchService);
                                    });
                                    it('Does not have any results', function () {
                                        expect(page.resultsCountText()).to.equal('0 results');
                                        expect(page.hasResults()).to.equal(false);
                                        expect(page.hasLimitedResults()).to.equal(false);
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
