(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'knockout',
            'models/ListPager'
        ],
        function (_, chai, ko, ListPager) {
            var expect = chai.expect;

            describe('The `ListPager` module', function () {
                it('Defines a constructor function', function () {
                    expect(ListPager).to.be.a('function');
                });
                describe('When constructed', function () {
                    var source, pager;
                    describe('With only the source observable specified', function () {
                        beforeEach(function () {
                            source = ko.observableArray(_.range(0, 500));
                            pager = new ListPager(source);
                        });
                        it('Exposes observables and computed observables', function () {
                            expect(ko.isObservable(pager.start)).to.equal(true);
                            expect(ko.isObservable(pager.pageSize)).to.equal(true);
                            expect(ko.isPureComputed(pager.availablePageSizes)).to.equal(true);
                            expect(ko.isPureComputed(pager.fullResultsCount)).to.equal(true);
                            expect(ko.isPureComputed(pager.pageCount)).to.equal(true);
                            expect(ko.isPureComputed(pager.pageNumber)).to.equal(true);
                            expect(ko.isPureComputed(pager.currentPage)).to.equal(true);
                            expect(ko.isPureComputed(pager.availableJumpPageNumbers)).to.equal(true);
                            expect(ko.isPureComputed(pager.firstPageStart)).to.equal(true);
                            expect(ko.isPureComputed(pager.lastPageStart)).to.equal(true);
                            expect(ko.isPureComputed(pager.previousPageStart)).to.equal(true);
                            expect(ko.isPureComputed(pager.nextPageStart)).to.equal(true);
                        });
                        it('Has the correct default initial state', function () {
                            expect(pager.start()).to.equal(0);
                            expect(pager.pageSize()).to.equal(12);
                            expect(pager.availablePageSizes()).to.deep.equal([ 12, 24, 48, 96 ]);
                            expect(pager.fullResultsCount()).to.equal(500);
                            expect(pager.pageCount()).to.equal(42);
                            expect(pager.pageNumber()).to.equal(0);
                            expect(pager.currentPage()).to.deep.equal(_.range(0, 12));
                            expect(pager.availableJumpPageNumbers()).to.deep.equal(_.range(0, 7));
                            expect(pager.firstPageStart()).to.equal(0);
                            expect(pager.lastPageStart()).to.equal(492);
                            expect(pager.previousPageStart()).to.equal(0);
                            expect(pager.nextPageStart()).to.equal(12);
                        });
                        describe('When moving the `start`', function () {
                            beforeEach(function () {
                                pager.start(48);
                            });
                            it('Has the correct modified state', function () {
                                expect(pager.fullResultsCount()).to.equal(500);
                                expect(pager.pageCount()).to.equal(42);
                                expect(pager.pageNumber()).to.equal(4);
                                expect(pager.currentPage()).to.deep.equal(_.range(48, 60));
                                expect(pager.availableJumpPageNumbers()).to.deep.equal(_.range(1, 8));
                                expect(pager.firstPageStart()).to.equal(0);
                                expect(pager.lastPageStart()).to.equal(492);
                                expect(pager.previousPageStart()).to.equal(36);
                                expect(pager.nextPageStart()).to.equal(60);
                            });
                        });
                        describe('When changing the `pageSize`', function () {
                            beforeEach(function () {
                                pager.pageSize(24);
                            });
                            it('Has the correct modified state', function () {
                                expect(pager.start()).to.equal(0);
                                expect(pager.fullResultsCount()).to.equal(500);
                                expect(pager.pageCount()).to.equal(21);
                                expect(pager.pageNumber()).to.equal(0);
                                expect(pager.currentPage()).to.deep.equal(_.range(0, 24));
                                expect(pager.availableJumpPageNumbers()).to.deep.equal(_.range(0, 7));
                                expect(pager.firstPageStart()).to.equal(0);
                                expect(pager.lastPageStart()).to.equal(480);
                                expect(pager.previousPageStart()).to.equal(0);
                                expect(pager.nextPageStart()).to.equal(24);
                            });
                        });
                    });
                    describe('With all parameters specified', function () {
                        beforeEach(function () {
                            source = ko.observableArray(_.range(0, 500));
                            pager = new ListPager(source, 50, 10, [ 5, 10, 25 ]);
                        });
                        it('Exposes observables and computed observables', function () {
                            expect(ko.isObservable(pager.start)).to.equal(true);
                            expect(ko.isObservable(pager.pageSize)).to.equal(true);
                            expect(ko.isPureComputed(pager.availablePageSizes)).to.equal(true);
                            expect(ko.isPureComputed(pager.fullResultsCount)).to.equal(true);
                            expect(ko.isPureComputed(pager.pageCount)).to.equal(true);
                            expect(ko.isPureComputed(pager.pageNumber)).to.equal(true);
                            expect(ko.isPureComputed(pager.currentPage)).to.equal(true);
                            expect(ko.isPureComputed(pager.availableJumpPageNumbers)).to.equal(true);
                            expect(ko.isPureComputed(pager.firstPageStart)).to.equal(true);
                            expect(ko.isPureComputed(pager.lastPageStart)).to.equal(true);
                            expect(ko.isPureComputed(pager.previousPageStart)).to.equal(true);
                            expect(ko.isPureComputed(pager.nextPageStart)).to.equal(true);
                        });
                        it('Has the correct initial state', function () {
                            expect(pager.start()).to.equal(50);
                            expect(pager.pageSize()).to.equal(10);
                            expect(pager.availablePageSizes()).to.deep.equal([ 5, 10, 25 ]);
                            expect(pager.fullResultsCount()).to.equal(500);
                            expect(pager.pageCount()).to.equal(50);
                            expect(pager.pageNumber()).to.equal(5);
                            expect(pager.currentPage()).to.deep.equal(_.range(50, 60));
                            expect(pager.availableJumpPageNumbers()).to.deep.equal(_.range(2, 9));
                            expect(pager.firstPageStart()).to.equal(0);
                            expect(pager.lastPageStart()).to.equal(490);
                            expect(pager.previousPageStart()).to.equal(40);
                            expect(pager.nextPageStart()).to.equal(60);
                        });
                        describe('When moving the `start`', function () {
                            beforeEach(function () {
                                pager.start(100);
                            });
                            it('Has the correct modified state', function () {
                                expect(pager.fullResultsCount()).to.equal(500);
                                expect(pager.pageCount()).to.equal(50);
                                expect(pager.pageNumber()).to.equal(10);
                                expect(pager.currentPage()).to.deep.equal(_.range(100, 110));
                                expect(pager.availableJumpPageNumbers()).to.deep.equal(_.range(7, 14));
                                expect(pager.firstPageStart()).to.equal(0);
                                expect(pager.lastPageStart()).to.equal(490);
                                expect(pager.previousPageStart()).to.equal(90);
                                expect(pager.nextPageStart()).to.equal(110);
                            });
                        });
                        describe('When changing the `pageSize`', function () {
                            beforeEach(function () {
                                pager.pageSize(25);
                            });
                            it('Has the correct modified state', function () {
                                expect(pager.start()).to.equal(0);
                                expect(pager.fullResultsCount()).to.equal(500);
                                expect(pager.pageCount()).to.equal(20);
                                expect(pager.pageNumber()).to.equal(0);
                                expect(pager.currentPage()).to.deep.equal(_.range(0, 25));
                                expect(pager.availableJumpPageNumbers()).to.deep.equal(_.range(0, 7));
                                expect(pager.firstPageStart()).to.equal(0);
                                expect(pager.lastPageStart()).to.equal(475);
                                expect(pager.previousPageStart()).to.equal(0);
                                expect(pager.nextPageStart()).to.equal(25);
                            });
                        });
                    });
                });
            });
        }
    );
}());
