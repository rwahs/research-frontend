(function () {
    'use strict';

    define(
        [
            'chai',
            'knockout',
            'models/query/Condition'
        ],
        function (chai, ko, Condition) {
            var expect = chai.expect;

            describe('The `Condition` module', function () {
                it('Defines a constructor function', function () {
                    expect(Condition).to.be.a('function');
                });
                describe('When constructed', function () {
                    var queryBuilder, condition;
                    beforeEach(function () {
                        queryBuilder = {
                            maxDepth: ko.observable(3)
                        };
                        condition = new Condition(queryBuilder);
                    });
                    it('Exposes observables', function () {
                        expect(ko.isObservable(condition.selectedField)).to.equal(true);
                        expect(ko.isObservable(condition.selectedComparator)).to.equal(true);
                        expect(ko.isObservable(condition.value)).to.equal(true);
                    });
                    it('Exposes computed observables', function () {
                        expect(ko.isObservable(condition.fields)).to.equal(true);
                        expect(ko.isObservable(condition.comparators)).to.equal(true);
                        expect(ko.isObservable(condition.query)).to.equal(true);
                        expect(ko.isObservable(condition.valueType)).to.equal(true);
                    });
                    it('Exposes helper methods', function () {
                        expect(condition.parse).to.be.a('function');
                        expect(condition.valueTypeIs).to.be.a('function');
                    });
                    it('Exposes the correct default values', function () {
                        expect(condition.selectedField()).to.equal(undefined);
                        expect(condition.selectedComparator()).to.equal(undefined);
                        expect(condition.value()).to.equal('');
                    });
                    describe('The `parse` method', function () {
                        beforeEach(function () {
                            condition.parse({
                                field: 'field',
                                comparator: 'comparator',
                                value: 'value'
                            });
                        });
                        it('Sets the correct values', function () {
                            expect(condition.selectedField()).to.equal('field');
                            expect(condition.selectedComparator()).to.equal('comparator');
                            expect(condition.value()).to.equal('value');
                        });
                    });
                });
            });
        }
    );
}());
