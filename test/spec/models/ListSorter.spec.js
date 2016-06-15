(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'knockout',
            'models/ListSorter'
        ],
        function (_, chai, ko, ListSorter) {
            var expect = chai.expect,
                data = [
                    {
                        id: ko.observable(1),
                        data: ko.observable({
                            first: 'first record',
                            second: '42',
                            third: 1
                        })
                    },
                    {
                        id: ko.observable(2),
                        data: ko.observable({
                            first: 'second record',
                            second: 'foo-bar',
                            third: 2
                        })
                    },
                    {
                        id: ko.observable(3),
                        data: ko.observable({
                            first: 'third record',
                            second: '',
                            third: 3
                        })
                    },
                    {
                        id: ko.observable(4),
                        data: ko.observable({
                            first: 'fourth record',
                            second: 'FOOD',
                            third: 4
                        })
                    },
                    {
                        id: ko.observable(5),
                        data: ko.observable({
                            first: 'fifth record',
                            second: 'xyzzy',
                            third: 5
                        })
                    }
                ],
                getId = function (record) {
                    return record.id();
                };

            describe('The `ListSorter` module', function () {
                it('Defines a constructor function', function () {
                    expect(ListSorter).to.be.a('function');
                });
                describe('When constructed', function () {
                    var source, fields, sorter;
                    describe('With only the source and fields observables specified', function () {
                        beforeEach(function (done) {
                            require([ 'fixtures/collections/searchResultFields' ], function (searchResultFields) {
                                source = ko.observableArray(data);
                                fields = ko.observableArray(searchResultFields);
                                sorter = new ListSorter(source, fields);
                                done();
                            });
                        });
                        it('Exposes observables and computed observables', function () {
                            expect(ko.isObservable(sorter.field)).to.equal(true);
                            expect(ko.isObservable(sorter.direction)).to.equal(true);
                            expect(ko.isPureComputed(sorter.availableSortFields)).to.equal(true);
                            expect(ko.isPureComputed(sorter.sortedList)).to.equal(true);
                        });
                        it('Has the correct default initial state', function () {
                            expect(sorter.field()).to.equal(undefined);
                            expect(sorter.direction()).to.equal(undefined);
                            expect(_.map(sorter.availableSortFields(), 'key')).to.deep.equal([ 'first', 'second' ]);
                            expect(_.map(sorter.sortedList(), getId)).to.deep.equal([ 1, 2, 3, 4, 5 ]);
                        });
                        describe('When sorting by a field using natural sorting', function () {
                            describe('With `direction = asc`', function () {
                                beforeEach(function () {
                                    sorter.field('first');
                                    sorter.direction('asc');
                                });
                                it('Has the correct state', function () {
                                    expect(sorter.field()).to.equal('first');
                                    expect(sorter.direction()).to.equal('asc');
                                    expect(_.map(sorter.availableSortFields(), 'key')).to.deep.equal([ 'first', 'second' ]);
                                    expect(_.map(sorter.sortedList(), getId)).to.deep.equal([ 5, 1, 4, 2, 3 ]);
                                });
                            });
                            describe('With `direction = desc`', function () {
                                beforeEach(function () {
                                    sorter.field('first');
                                    sorter.direction('desc');
                                });
                                it('Has the correct state', function () {
                                    expect(sorter.field()).to.equal('first');
                                    expect(sorter.direction()).to.equal('desc');
                                    expect(_.map(sorter.availableSortFields(), 'key')).to.deep.equal([ 'first', 'second' ]);
                                    expect(_.map(sorter.sortedList(), getId)).to.deep.equal([ 3, 2, 4, 1, 5 ]);
                                });
                            });
                        });
                        describe('When sorting by a field using specified sorting', function () {
                            describe('With `direction = asc`', function () {
                                beforeEach(function () {
                                    sorter.field('second');
                                    sorter.direction('asc');
                                });
                                it('Has the correct state', function () {
                                    expect(sorter.field()).to.equal('second');
                                    expect(sorter.direction()).to.equal('asc');
                                    expect(_.map(sorter.availableSortFields(), 'key')).to.deep.equal([ 'first', 'second' ]);
                                    expect(_.map(sorter.sortedList(), getId)).to.deep.equal([ 1, 2, 4, 5, 3 ]);
                                });
                            });
                            describe('With `direction = desc`', function () {
                                beforeEach(function () {
                                    sorter.field('second');
                                    sorter.direction('desc');
                                });
                                it('Has the correct state', function () {
                                    expect(sorter.field()).to.equal('second');
                                    expect(sorter.direction()).to.equal('desc');
                                    expect(_.map(sorter.availableSortFields(), 'key')).to.deep.equal([ 'first', 'second' ]);
                                    expect(_.map(sorter.sortedList(), getId)).to.deep.equal([ 5, 4, 2, 1, 3 ]);
                                });
                            });
                        });
                    });
                    describe('With all parameters specified', function () {
                        beforeEach(function (done) {
                            require([ 'fixtures/collections/searchResultFields' ], function (searchResultFields) {
                                source = ko.observableArray(data);
                                fields = ko.observableArray(searchResultFields);
                                sorter = new ListSorter(source, fields, 'first', 'asc');
                                done();
                            });
                        });
                        it('Exposes observables and computed observables', function () {
                            expect(ko.isObservable(sorter.field)).to.equal(true);
                            expect(ko.isObservable(sorter.direction)).to.equal(true);
                            expect(ko.isPureComputed(sorter.availableSortFields)).to.equal(true);
                            expect(ko.isPureComputed(sorter.sortedList)).to.equal(true);
                        });
                        it('Has the correct initial state', function () {
                            expect(sorter.field()).to.equal('first');
                            expect(sorter.direction()).to.equal('asc');
                            expect(_.map(sorter.availableSortFields(), 'key')).to.deep.equal([ 'first', 'second' ]);
                            expect(_.map(sorter.sortedList(), getId)).to.deep.equal([ 5, 1, 4, 2, 3 ]);
                        });
                        describe('When clearing the `field` and `direction`', function () {
                            beforeEach(function () {
                                sorter.field(undefined);
                                sorter.direction(undefined);
                            });
                            it('Has the correct state', function () {
                                expect(sorter.field()).to.equal(undefined);
                                expect(sorter.direction()).to.equal(undefined);
                                expect(_.map(sorter.availableSortFields(), 'key')).to.deep.equal([ 'first', 'second' ]);
                                expect(_.map(sorter.sortedList(), getId)).to.deep.equal([ 1, 2, 3, 4, 5 ]);
                            });
                        });
                    });
                });
            });
        }
    );
}());
