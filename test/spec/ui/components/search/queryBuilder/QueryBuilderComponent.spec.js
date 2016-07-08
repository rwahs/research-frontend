(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'ui/components/search/queryBuilder/QueryBuilderComponent',
            'models/query/Group',
            'models/query/Condition'
        ],
        function (chai, sinon, ko, QueryBuilderComponent, Group, Condition) {
            var expect = chai.expect;

            describe('The `QueryBuilderComponent` module', function () {
                it('Defines a constructor function', function () {
                    expect(QueryBuilderComponent).to.be.a('function');
                });
                describe('With valid parameters', function () {
                    describe('When constructed with no initial query', function () {
                        var query, component;
                        beforeEach(function (done) {
                            query = ko.observable();
                            require([ 'fixtures/collections/searchInputFields' ], function (searchInputFields) {
                                component = new QueryBuilderComponent({
                                    queryObservable: query,
                                    fields: ko.observable(searchInputFields),
                                    maxDepth: 3
                                });
                                done();
                            });
                        });
                        it('Returns an object', function () {
                            expect(component).to.be.an('object');
                        });
                        it('Exposes the correct observables and computed observables', function () {
                            expect(ko.isPureComputed(component.root)).to.equal(true);
                            expect(ko.isPureComputed(component.fields)).to.equal(true);
                            expect(ko.isPureComputed(component.maxDepth)).to.equal(true);
                        });
                        it('Exposes view helper methods', function () {
                            expect(component.templateFor).to.be.a('function');
                        });
                        it('Sets a Group with a single empty Condition as the root node', function () {
                            expect(component.root() instanceof Group).to.equal(true);
                            expect(component.root().children()).to.have.length(1);
                            expect(component.root().children()[0] instanceof Condition).to.equal(true);
                            expect(component.root().children()[0].selectedField()).to.equal(undefined);
                            expect(component.root().children()[0].selectedComparator()).to.equal(undefined);
                            expect(component.root().children()[0].value()).to.equal('');
                        });
                        it('Sets the input fields', function () {
                            expect(component.fields()).to.have.length(3); // see fixtures/collections/searchInputFields.js
                        });
                        it('Sets the maximum depth', function () {
                            expect(component.maxDepth()).to.equal(3);
                        });
                    });
                    describe('When constructed with an initial query', function () {
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
                                        field: 'second',
                                        comparator: '!contains',
                                        value: 'bar'
                                    }
                                ]
                            });
                            require([ 'fixtures/collections/searchInputFields' ], function (searchInputFields) {
                                component = new QueryBuilderComponent({
                                    queryObservable: query,
                                    fields: ko.observable(searchInputFields),
                                    maxDepth: 3
                                });
                                done();
                            });
                        });
                        it('Returns an object', function () {
                            expect(component).to.be.an('object');
                        });
                        it('Exposes the correct observables and computed observables', function () {
                            expect(ko.isPureComputed(component.root)).to.equal(true);
                            expect(ko.isPureComputed(component.fields)).to.equal(true);
                            expect(ko.isPureComputed(component.maxDepth)).to.equal(true);
                        });
                        it('Exposes view helper methods', function () {
                            expect(component.templateFor).to.be.a('function');
                        });
                        it('Sets a the correct query structure', function () {
                            expect(component.root() instanceof Group).to.equal(true);
                            expect(component.root().children()).to.have.length(2);
                            expect(component.root().children()[0] instanceof Condition).to.equal(true);
                            expect(component.root().children()[0].selectedField()).to.equal('first');
                            expect(component.root().children()[0].selectedComparator()).to.equal('contains');
                            expect(component.root().children()[0].value()).to.equal('foo');
                            expect(component.root().children()[1] instanceof Condition).to.equal(true);
                            expect(component.root().children()[1].selectedField()).to.equal('second');
                            expect(component.root().children()[1].selectedComparator()).to.equal('!contains');
                            expect(component.root().children()[1].value()).to.equal('bar');
                        });
                        it('Sets the input fields', function () {
                            expect(component.fields()).to.have.length(3); // see fixtures/collections/searchInputFields.js
                        });
                        it('Sets the maximum depth', function () {
                            expect(component.maxDepth()).to.equal(3);
                        });
                    });
                });
                describe('With missing `queryObservable` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new QueryBuilderComponent({
                                // The actual fields are unimportant here, but we need something so an empty object will do.
                                fields: ko.observableArray([ {} ]),
                                maxDepth: 3
                            });
                        }).to.throw('QueryBuilderComponent missing or invalid required parameter: `queryObservable`.');
                    });
                });
                describe('With non-observable `queryObservable` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new QueryBuilderComponent({
                                // The actual fields are unimportant here, but we need something so an empty object will do.
                                fields: ko.observableArray([ {} ]),
                                queryObservable: 'foo',
                                maxDepth: 3
                            });
                        }).to.throw('QueryBuilderComponent missing or invalid required parameter: `queryObservable`.');
                    });
                });
                describe('With missing `fields` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new QueryBuilderComponent({
                                queryObservable: ko.observable(),
                                maxDepth: 3
                            });
                        }).to.throw('QueryBuilderComponent missing required parameter: `fields`.');
                    });
                });
                describe('With missing `maxDepth` parameter', function () {
                    var component;
                    it('Throws an error', function () {
                        expect(function () {
                            component = new QueryBuilderComponent({
                                // The actual fields are unimportant here, but we need something so an empty object will do.
                                fields: ko.observableArray([ {} ]),
                                queryObservable: ko.observable()
                            });
                        }).to.throw('QueryBuilderComponent missing required parameter: `maxDepth`.');
                    });
                });
            });
        }
    );
}());
