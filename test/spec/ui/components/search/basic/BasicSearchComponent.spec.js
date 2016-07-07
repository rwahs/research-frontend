(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'ui/components/search/basic/BasicSearchComponent'
        ],
        function (chai, sinon, ko, BasicSearchComponent) {
            var expect = chai.expect;

            describe('The `BasicSearchComponent` module', function () {
                it('Defines a constructor function', function () {
                    expect(BasicSearchComponent).to.be.a('function');
                });
                describe('With valid parameters', function () {
                    describe('When there are multiple available search types', function () {
                        describe('When constructed with no initial query', function () {
                            var query, component;
                            beforeEach(function (done) {
                                query = ko.observable();
                                require([ 'fixtures/collections/searchInputFields' ], function (searchInputFields) {
                                    component = new BasicSearchComponent({
                                        queryObservable: query,
                                        fields: ko.observable(searchInputFields)
                                    });
                                    done();
                                });
                            });
                            it('Returns an object', function () {
                                expect(component).to.be.an('object');
                            });
                            it('Exposes the correct observables and computed observables', function () {
                                expect(ko.isObservable(component.searchText)).to.equal(true);
                                expect(ko.isPureComputed(component.displayedInputFields)).to.equal(true);
                                expect(ko.isPureComputed(component.displayFieldSwitch)).to.equal(true);
                                expect(ko.isPureComputed(component.selectedSearchField)).to.equal(true);
                                expect(ko.isPureComputed(component.placeholder)).to.equal(true);
                                expect(ko.isPureComputed(component.displayLostQueryWarning)).to.equal(true);
                            });
                            it('Exposes view helper methods', function () {
                                expect(component.isSelectedSearchField).to.be.a('function');
                                expect(component.selectSearchField).to.be.a('function');
                                expect(component.glyphiconCssFor).to.be.a('function');
                            });
                            it('Sets the correct default search text', function () {
                                expect(component.searchText()).to.equal('');
                            });
                            it('Sets the input fields', function () {
                                expect(component.displayedInputFields()).to.have.length(2); // see fixtures/collections/searchInputFields.js
                            });
                            it('Displays the field switch', function () {
                                expect(component.displayFieldSwitch()).to.equal(true);
                            });
                            it('Sets the active search type', function () {
                                expect(component.selectedSearchField().key).to.equal('first'); // see fixtures/collections/searchInputFields.js
                            });
                            it('Sets the placeholder text', function () {
                                expect(component.placeholder()).to.equal('Search by Field One...');
                            });
                            it('Does not display the warning about losing query details', function () {
                                expect(component.displayLostQueryWarning()).to.equal(false);
                            });
                            describe('When a different search type is made active', function () {
                                beforeEach(function () {
                                    component.selectSearchField({ key: 'second' });
                                });
                                it('Sets the active search type', function () {
                                    expect(component.selectedSearchField().key).to.equal('second'); // see fixtures/collections/searchInputFields.js
                                });
                                it('Sets the placeholder text', function () {
                                    expect(component.placeholder()).to.equal('Search by Field Two...');
                                });
                            });
                            describe('With empty search text', function () {
                                beforeEach(function () {
                                    component.selectSearchField({ key: 'first' });
                                    component.searchText('');
                                });
                                it('Sets the value of the query observable correctly', function () {
                                    expect(query()).to.equal(undefined);
                                });
                            });
                            describe('With non-empty search text containing a single word', function () {
                                beforeEach(function () {
                                    component.selectSearchField({ key: 'first' });
                                    component.searchText('query');
                                });
                                it('Sets the value of the query observable correctly', function () {
                                    expect(query()).to.deep.equal({
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'first',
                                                comparator: 'contains',
                                                value: 'query'
                                            }
                                        ]
                                    });
                                });
                            });
                            describe('With non-empty search text containing multiple words', function () {
                                beforeEach(function () {
                                    component.selectSearchField({ key: 'first' });
                                    component.searchText('multiple word query');
                                });
                                it('Sets the value of the query observable correctly', function () {
                                    expect(query()).to.deep.equal({
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'first',
                                                comparator: 'contains',
                                                value: 'multiple'
                                            },
                                            {
                                                field: 'first',
                                                comparator: 'contains',
                                                value: 'word'
                                            },
                                            {
                                                field: 'first',
                                                comparator: 'contains',
                                                value: 'query'
                                            }
                                        ]
                                    });
                                });
                            });
                        });
                        describe('When constructed with an initial query that can be converted to a basic search', function () {
                            var query, component;
                            beforeEach(function (done) {
                                query = ko.observable({
                                    operator: 'AND',
                                    children: [
                                        {
                                            field: 'first',
                                            comparator: 'contains',
                                            value: 'foo'
                                        },
                                        {
                                            field: 'first',
                                            comparator: 'contains',
                                            value: 'bar'
                                        }
                                    ]
                                });
                                require([ 'fixtures/collections/searchInputFields' ], function (searchInputFields) {
                                    component = new BasicSearchComponent({
                                        queryObservable: query,
                                        fields: ko.observable(searchInputFields)
                                    });
                                    done();
                                });
                            });
                            it('Returns an object', function () {
                                expect(component).to.be.an('object');
                            });
                            it('Exposes the correct observables and computed observables', function () {
                                expect(ko.isObservable(component.searchText)).to.equal(true);
                                expect(ko.isPureComputed(component.displayedInputFields)).to.equal(true);
                                expect(ko.isPureComputed(component.displayFieldSwitch)).to.equal(true);
                                expect(ko.isPureComputed(component.selectedSearchField)).to.equal(true);
                                expect(ko.isPureComputed(component.placeholder)).to.equal(true);
                                expect(ko.isPureComputed(component.displayLostQueryWarning)).to.equal(true);
                            });
                            it('Exposes view helper methods', function () {
                                expect(component.isSelectedSearchField).to.be.a('function');
                                expect(component.selectSearchField).to.be.a('function');
                                expect(component.glyphiconCssFor).to.be.a('function');
                            });
                            it('Sets the correct default search text', function () {
                                expect(component.searchText()).to.equal('foo bar');
                            });
                            it('Sets the input fields', function () {
                                expect(component.displayedInputFields()).to.have.length(2); // see fixtures/collections/searchInputFields.js
                            });
                            it('Displays the field switch', function () {
                                expect(component.displayFieldSwitch()).to.equal(true);
                            });
                            it('Sets the active search type', function () {
                                expect(component.selectedSearchField().key).to.equal('first'); // see fixtures/collections/searchInputFields.js
                            });
                            it('Sets the placeholder text', function () {
                                expect(component.placeholder()).to.equal('Search by Field One...');
                            });
                            it('Does not display the warning about losing query details', function () {
                                expect(component.displayLostQueryWarning()).to.equal(false);
                            });
                        });
                        describe('When constructed with an initial query that cannot be converted to a basic search', function () {
                            var query, component;
                            beforeEach(function (done) {
                                query = ko.observable({
                                    operator: 'AND',
                                    children: [
                                        {
                                            field: 'first',
                                            comparator: 'starts',
                                            value: 'foo'
                                        },
                                        {
                                            field: 'second',
                                            comparator: 'contains',
                                            value: 'bar'
                                        }
                                    ]
                                });
                                require([ 'fixtures/collections/searchInputFields' ], function (searchInputFields) {
                                    component = new BasicSearchComponent({
                                        queryObservable: query,
                                        fields: ko.observable(searchInputFields)
                                    });
                                    done();
                                });
                            });
                            it('Returns an object', function () {
                                expect(component).to.be.an('object');
                            });
                            it('Exposes the correct observables and computed observables', function () {
                                expect(ko.isObservable(component.searchText)).to.equal(true);
                                expect(ko.isPureComputed(component.displayedInputFields)).to.equal(true);
                                expect(ko.isPureComputed(component.displayFieldSwitch)).to.equal(true);
                                expect(ko.isPureComputed(component.selectedSearchField)).to.equal(true);
                                expect(ko.isPureComputed(component.placeholder)).to.equal(true);
                                expect(ko.isPureComputed(component.displayLostQueryWarning)).to.equal(true);
                            });
                            it('Exposes view helper methods', function () {
                                expect(component.isSelectedSearchField).to.be.a('function');
                                expect(component.selectSearchField).to.be.a('function');
                                expect(component.glyphiconCssFor).to.be.a('function');
                            });
                            it('Sets the correct default search text', function () {
                                expect(component.searchText()).to.equal('foo');
                            });
                            it('Sets the input fields', function () {
                                expect(component.displayedInputFields()).to.have.length(2); // see fixtures/collections/searchInputFields.js
                            });
                            it('Displays the field switch', function () {
                                expect(component.displayFieldSwitch()).to.equal(true);
                            });
                            it('Sets the active search type', function () {
                                expect(component.selectedSearchField().key).to.equal('first'); // see fixtures/collections/searchInputFields.js
                            });
                            it('Sets the placeholder text', function () {
                                expect(component.placeholder()).to.equal('Search by Field One...');
                            });
                            it('Displays the warning about losing query details', function () {
                                expect(component.displayLostQueryWarning()).to.equal(true);
                            });
                        });
                    });
                    describe('When there is only one available search type', function () {
                        describe('When constructed with no initial query', function () {
                            var query, component;
                            beforeEach(function (done) {
                                query = ko.observable();
                                require([ 'fixtures/collections/singleSearchInputField' ], function (searchInputFields) {
                                    component = new BasicSearchComponent({
                                        queryObservable: query,
                                        fields: ko.observable(searchInputFields)
                                    });
                                    done();
                                });
                            });
                            it('Returns an object', function () {
                                expect(component).to.be.an('object');
                            });
                            it('Sets the single search type', function () {
                                expect(component.displayedInputFields()).to.have.length(1); // see fixtures/collections/singleSearchInputField.js
                            });
                            it('Sets the active search type', function () {
                                expect(component.selectedSearchField().key).to.equal('only');
                            });
                            describe('With empty search text', function () {
                                beforeEach(function () {
                                    component.searchText('');
                                });
                                it('Sets the value of the query observable correctly', function () {
                                    expect(query()).to.equal(undefined);
                                });
                            });
                            describe('With non-empty search text containing a single word', function () {
                                beforeEach(function () {
                                    component.selectSearchField({ key: 'only' });
                                    component.searchText('query');
                                });
                                it('Sets the value of the query observable correctly', function () {
                                    expect(query()).to.deep.equal({
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'only',
                                                comparator: 'contains',
                                                value: 'query'
                                            }
                                        ]
                                    });
                                });
                            });
                            describe('With non-empty search text containing multiple words', function () {
                                beforeEach(function () {
                                    component.searchText('multiple word query');
                                });
                                it('Sets the value of the query observable correctly', function () {
                                    expect(query()).to.deep.equal({
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'only',
                                                comparator: 'contains',
                                                value: 'multiple'
                                            },
                                            {
                                                field: 'only',
                                                comparator: 'contains',
                                                value: 'word'
                                            },
                                            {
                                                field: 'only',
                                                comparator: 'contains',
                                                value: 'query'
                                            }
                                        ]
                                    });
                                });
                            });
                        });
                    });
                });
                describe('With missing `queryObservable` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new BasicSearchComponent({
                                // The actual fields are unimportant here, but we need something so an empty object will do.
                                fields: ko.observableArray([ {} ])
                            });
                        }).to.throw('BasicSearchComponent missing or invalid required parameter: `queryObservable`.');
                    });
                });
                describe('With non-observable `queryObservable` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new BasicSearchComponent({
                                // The actual fields are unimportant here, but we need something so an empty object will do.
                                fields: ko.observableArray([ {} ]),
                                queryObservable: 'foo'
                            });
                        }).to.throw('BasicSearchComponent missing or invalid required parameter: `queryObservable`.');
                    });
                });
                describe('With missing `fields` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new BasicSearchComponent({
                                queryObservable: ko.observable()
                            });
                        }).to.throw('BasicSearchComponent missing required parameter: `fields`.');
                    });
                });
            });
        }
    );
}());
