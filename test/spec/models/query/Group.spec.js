(function () {
    'use strict';

    define(
        [
            'chai',
            'knockout',
            'models/query/Group'
        ],
        function (chai, ko, Group) {
            var expect = chai.expect;

            describe('The `Group` module', function () {
                it('Defines a constructor function', function () {
                    expect(Group).to.be.a('function');
                });
                describe('When constructed with no parent group', function () {
                    var queryBuilder, group;
                    beforeEach(function () {
                        queryBuilder = {
                            maxDepth: ko.observable(3)
                        };
                        group = new Group(queryBuilder);
                    });
                    it('Exposes observables', function () {
                        expect(ko.isObservable(group.children)).to.equal(true);
                        expect(ko.isObservable(group.selectedOperator)).to.equal(true);
                    });
                    it('Exposes computed observables', function () {
                        expect(ko.isObservable(group.operators)).to.equal(true);
                        expect(ko.isObservable(group.depth)).to.equal(true);
                        expect(ko.isObservable(group.allowChildren)).to.equal(true);
                        expect(ko.isObservable(group.query)).to.equal(true);
                    });
                    it('Exposes helper methods', function () {
                        expect(group.parse).to.be.a('function');
                        expect(group.addCondition).to.be.a('function');
                        expect(group.addGroup).to.be.a('function');
                        expect(group.removeChild).to.be.a('function');
                    });
                    it('Exposes the correct default values', function () {
                        expect(group.children()).to.have.length(1);
                        expect(group.selectedOperator().key).to.equal('AND');
                    });
                    it('Calculates the correct depth', function () {
                        expect(group.depth()).to.equal(0);
                    });
                });
                describe('When constructed with a parent group', function () {
                    var queryBuilder, parentGroup, group;
                    beforeEach(function () {
                        queryBuilder = {
                            maxDepth: ko.observable(3)
                        };
                        parentGroup = new Group(queryBuilder);
                        group = new Group(queryBuilder, parentGroup);
                    });
                    it('Exposes observables', function () {
                        expect(ko.isObservable(group.children)).to.equal(true);
                        expect(ko.isObservable(group.selectedOperator)).to.equal(true);
                    });
                    it('Exposes computed observables', function () {
                        expect(ko.isObservable(group.operators)).to.equal(true);
                        expect(ko.isObservable(group.depth)).to.equal(true);
                        expect(ko.isObservable(group.allowChildren)).to.equal(true);
                        expect(ko.isObservable(group.query)).to.equal(true);
                    });
                    it('Exposes helper methods', function () {
                        expect(group.parse).to.be.a('function');
                        expect(group.addCondition).to.be.a('function');
                        expect(group.addGroup).to.be.a('function');
                        expect(group.removeChild).to.be.a('function');
                    });
                    it('Exposes the correct default values', function () {
                        expect(group.children()).to.have.length(1);
                        expect(group.selectedOperator().key).to.equal('AND');
                    });
                    it('Calculates the correct depth', function () {
                        expect(group.depth()).to.equal(1);
                    });
                });
            });
        }
    );
}());
