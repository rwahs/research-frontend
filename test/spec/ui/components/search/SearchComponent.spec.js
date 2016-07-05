(function () {
    'use strict';

    define(
        [
            'knockout',
            'chai',
            'sinon',
            'config/routes',
            'ui/components/search/SearchComponent'
        ],
        function (ko, chai, sinon, routes, SearchComponent) {
            var expect = chai.expect;

            describe('The `SearchComponent` module', function () {
                it('Defines a constructor function', function () {
                    expect(SearchComponent).to.be.a('function');
                });
                describe('When constructed with valid parameters', function () {
                    var search;
                    beforeEach(function () {
                        search = new SearchComponent({
                            searchBaseUrl: 'collection'
                        });
                    });
                    it('Exposes observables and computed observables', function () {
                        expect(ko.isObservable(search.searchText)).to.equal(true);
                        expect(ko.isPureComputed(search.preventSubmit)).to.equal(true);
                    });
                    it('Exposes event handler functions', function () {
                        expect(search.submit).to.be.a('function');
                    });
                    it('Returns the correct default values', function () {
                        expect(search.searchText()).to.equal('');
                        expect(search.preventSubmit()).to.equal(true);
                    });
                    describe('When the search text is empty', function () {
                        beforeEach(function () {
                            sinon.stub(routes, 'pushState');
                        });
                        describe('When the form is submitted', function () {
                            var returnValue;
                            beforeEach(function () {
                                returnValue = search.submit();
                            });
                            it('Returns false to prevent the default submit action', function () {
                                expect(returnValue).to.equal(false);
                            });
                            it('Does not navigate', function () {
                                expect(routes.pushState.callCount).to.equal(0);
                            });
                        });
                        afterEach(function () {
                            routes.pushState.restore();
                        });
                    });
                    describe('When the search text is non-empty', function () {
                        beforeEach(function () {
                            sinon.stub(routes, 'pushState');
                            search.searchText('some query');
                        });
                        describe('When the form is submitted', function () {
                            var returnValue;
                            beforeEach(function () {
                                returnValue = search.submit();
                            });
                            it('Returns false to prevent the default submit action', function () {
                                expect(returnValue).to.equal(false);
                            });
                            it('Navigates to the correct URL', function () {
                                expect(routes.pushState.callCount).to.equal(1);
                                expect(routes.pushState.getCall(0).args).to.deep.equal([ '/collection/search?query=some%20query', true ]);
                            });
                        });
                        afterEach(function () {
                            routes.pushState.restore();
                        });
                    });
                });
                describe('When constructed without a `searchBaseUrl` parameter', function () {
                    var search;
                    it('Throws', function () {
                        expect(function () {
                            search = new SearchComponent({});
                        }).to.throw('SearchComponent missing required parameter: `searchBaseUrl`.');
                    });
                });
                describe('When constructed without parameters', function () {
                    var search;
                    it('Throws', function () {
                        expect(function () {
                            search = new SearchComponent();
                        }).to.throw('SearchComponent missing parameter map.');
                    });
                });
            });
        }
    );
}());
