(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'ui/components/search/results/SearchResultsComponent',
            'models/query/Group',
            'models/query/Condition'
        ],
        function (chai, sinon, ko, SearchResultsComponent, Group, Condition) {
            var expect = chai.expect;

            describe('The `SearchResultsComponent` module', function () {
                it('Defines a constructor function', function () {
                    expect(SearchResultsComponent).to.be.a('function');
                });
                describe('With valid parameters', function () {
                    var results, resultFields, modeSwitcher, component;
                    beforeEach(function (done) {
                        require([ 'fixtures/collections/searchResultFields' ], function (searchResultFields) {
                            results = ko.observableArray();
                            resultFields = ko.observableArray(searchResultFields);
                            modeSwitcher = {
                                mode: ko.observable('list')
                            };
                            component = new SearchResultsComponent({
                                results: results,
                                resultFields: resultFields,
                                modeSwitcher: modeSwitcher
                            });
                            done();
                        });
                    });
                    it('Returns an object', function () {
                        expect(component).to.be.an('object');
                    });
                    it('Exposes the parameters', function () {
                        expect(component.results).to.equal(results);
                        expect(component.resultFields).to.equal(resultFields);
                        expect(component.modeSwitcher).to.equal(modeSwitcher);
                    });
                    it('Exposes view helper methods', function () {
                        expect(component.displayFor).to.be.a('function');
                        expect(component.resultFor).to.be.a('function');
                        expect(component.detailUrlFor).to.be.a('function');
                        expect(component.navigateTo).to.be.a('function');
                    });
                    describe('The `displayFor` method', function () {
                        describe('For a field using the default display type', function () {
                            it('Returns the correct result', function () {
                                expect(component.displayFor('first', { data: 'DATA' })).to.deep.equal({
                                    name: 'display/text',
                                    params: {
                                        data: 'DATA',
                                        name: 'first',
                                        display: undefined,
                                        placeholder: 'placeholder value'
                                    }
                                });
                            });
                        });
                        describe('For a field with a specified display type', function () {
                            it('Returns the correct result', function () {
                                expect(component.displayFor('third', { data: 'DATA' })).to.deep.equal({
                                    name: 'display/image',
                                    params: {
                                        data: 'DATA',
                                        name: 'third',
                                        display: 'image',
                                        placeholder: undefined
                                    }
                                });
                            });
                        });
                    });
                });
                describe('With missing `results` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new SearchResultsComponent({
                                // The actual value here is unimportant, only presence is required.
                                modeSwitcher: {},
                                resultFields: ko.observableArray()
                            });
                        }).to.throw('SearchResultsComponent missing required parameter: `results`.');
                    });
                });
                describe('With missing `modeSwitcher` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new SearchResultsComponent({
                                results: ko.observableArray(),
                                resultFields: ko.observableArray()
                            });
                        }).to.throw('SearchResultsComponent missing required parameter: `modeSwitcher`.');
                    });
                });
                describe('With missing `resultFields` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new SearchResultsComponent({
                                results: ko.observableArray(),
                                // The actual value here is unimportant, only presence is required.
                                modeSwitcher: {}
                            });
                        }).to.throw('SearchResultsComponent missing required parameter: `resultFields`.');
                    });
                });
            });
        }
    );
}());
