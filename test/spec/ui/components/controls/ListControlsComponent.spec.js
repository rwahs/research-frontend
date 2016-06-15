(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'chai',
            'sinon',
            'ui/components/controls/ListControlsComponent',
            'models/ListPager',
            'models/ListSorter'
        ],
        function (_, ko, chai, sinon, ListControlsComponent, ListPager, ListSorter) {
            var expect = chai.expect;

            describe('The `ListControlsComponent` module', function () {
                it('Defines a constructor function', function () {
                    expect(ListControlsComponent).to.be.a('function');
                });
                describe('When constructed with all required parameters', function () {
                    var sorter, pager, controls;
                    beforeEach(function () {
                        sorter = new ListSorter(ko.observableArray(_.range(0, 500)), ko.observableArray());
                        pager = new ListPager(sorter.sortedList, 0, 10, [ 10, 25 ]);
                        controls = new ListControlsComponent({
                            pager: pager,
                            sorter: sorter,
                            resultsMode: ko.observable('List'),
                            availableResultsModes: ko.observable([ 'List', 'Thumbnails', 'Table' ]),
                            searchUrlFor: _.identity
                        });
                    });
                    it('Exposes observables and computed observables', function () {
                        expect(ko.isPureComputed(controls.availableResultsModes)).to.equal(true);
                        expect(ko.isPureComputed(controls.availablePageSizes)).to.equal(true);
                        expect(ko.isPureComputed(controls.availableJumpPageNumbers)).to.equal(true);
                        expect(ko.isPureComputed(controls.firstPageUrl)).to.equal(true);
                        expect(ko.isPureComputed(controls.lastPageUrl)).to.equal(true);
                        expect(ko.isPureComputed(controls.previousPageUrl)).to.equal(true);
                        expect(ko.isPureComputed(controls.nextPageUrl)).to.equal(true);
                        expect(ko.isPureComputed(controls.atFirstPage)).to.equal(true);
                        expect(ko.isPureComputed(controls.atLastPage)).to.equal(true);
                    });
                    it('Exposes control functions', function () {
                        expect(_.isFunction(controls.jumpToFirstPage)).to.equal(true);
                        expect(_.isFunction(controls.jumpToLastPage)).to.equal(true);
                        expect(_.isFunction(controls.jumpToPreviousPage)).to.equal(true);
                        expect(_.isFunction(controls.jumpToNextPage)).to.equal(true);
                    });
                    it('Returns the correct `availableResultsModes` objects', function () {
                        var resultsModes = controls.availableResultsModes();
                        expect(resultsModes.length).to.equal(3); // For the 3 passed in modes

                        expect(resultsModes[0].label).to.equal('List');
                        expect(resultsModes[0].longLabel).to.equal('Display results in List mode');
                        expect(resultsModes[0].url).to.deep.equal({ mode: 'List' }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(resultsModes[0].active)).to.equal(true);
                        expect(_.isFunction(resultsModes[0].click)).to.equal(true);

                        expect(resultsModes[1].label).to.equal('Thumbnails');
                        expect(resultsModes[1].longLabel).to.equal('Display results in Thumbnails mode');
                        expect(resultsModes[1].url).to.deep.equal({ mode: 'Thumbnails' }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(resultsModes[1].active)).to.equal(true);
                        expect(_.isFunction(resultsModes[1].click)).to.equal(true);

                        expect(resultsModes[2].label).to.equal('Table');
                        expect(resultsModes[2].longLabel).to.equal('Display results in Table mode');
                        expect(resultsModes[2].url).to.deep.equal({ mode: 'Table' }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(resultsModes[2].active)).to.equal(true);
                        expect(_.isFunction(resultsModes[2].click)).to.equal(true);
                    });
                    it('Returns the correct `availablePageSizes` objects', function () {
                        var pageSizes = controls.availablePageSizes();
                        expect(pageSizes.length).to.equal(2); // For the 2 page sizes

                        expect(pageSizes[0].label).to.equal(10);
                        expect(pageSizes[0].longLabel).to.equal('Display 10 results per page');
                        expect(pageSizes[0].url).to.deep.equal({ start: 0, size: 10 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[0].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[0].click)).to.equal(true);

                        expect(pageSizes[1].label).to.equal(25);
                        expect(pageSizes[1].longLabel).to.equal('Display 25 results per page');
                        expect(pageSizes[1].url).to.deep.equal({ start: 0, size: 25 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[1].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[1].click)).to.equal(true);
                    });
                    it('Returns the correct `availableJumpPageNumbers` objects', function () {
                        var pageSizes = controls.availableJumpPageNumbers();
                        expect(pageSizes.length).to.equal(7); // The `ListPager` displays 7 page jump links

                        expect(pageSizes[0].label).to.equal(1);
                        expect(pageSizes[0].longLabel).to.equal('Jump to page 1');
                        expect(pageSizes[0].url).to.deep.equal({ start: 0 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[0].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[0].click)).to.equal(true);

                        expect(pageSizes[1].label).to.equal(2);
                        expect(pageSizes[1].longLabel).to.equal('Jump to page 2');
                        expect(pageSizes[1].url).to.deep.equal({ start: 10 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[1].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[1].click)).to.equal(true);

                        expect(pageSizes[2].label).to.equal(3);
                        expect(pageSizes[2].longLabel).to.equal('Jump to page 3');
                        expect(pageSizes[2].url).to.deep.equal({ start: 20 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[2].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[2].click)).to.equal(true);

                        expect(pageSizes[3].label).to.equal(4);
                        expect(pageSizes[3].longLabel).to.equal('Jump to page 4');
                        expect(pageSizes[3].url).to.deep.equal({ start: 30 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[3].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[3].click)).to.equal(true);

                        expect(pageSizes[4].label).to.equal(5);
                        expect(pageSizes[4].longLabel).to.equal('Jump to page 5');
                        expect(pageSizes[4].url).to.deep.equal({ start: 40 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[4].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[4].click)).to.equal(true);

                        expect(pageSizes[5].label).to.equal(6);
                        expect(pageSizes[5].longLabel).to.equal('Jump to page 6');
                        expect(pageSizes[5].url).to.deep.equal({ start: 50 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[5].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[5].click)).to.equal(true);

                        expect(pageSizes[6].label).to.equal(7);
                        expect(pageSizes[6].longLabel).to.equal('Jump to page 7');
                        expect(pageSizes[6].url).to.deep.equal({ start: 60 }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(pageSizes[6].active)).to.equal(true);
                        expect(_.isFunction(pageSizes[6].click)).to.equal(true);
                    });
                });
                describe('When constructed with no parameters', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent();
                        }).to.throw('ListControlsComponent missing required parameter: `pager`.');
                    });
                });
                describe('When constructed with the `pager` parameter missing', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent({
                                sorter: new ListSorter(ko.observableArray(), ko.observableArray()),
                                resultsMode: ko.observable(),
                                availableResultsModes: ko.observable(),
                                searchUrlFor: _.noop
                            });
                        }).to.throw('ListControlsComponent missing required parameter: `pager`.');
                    });
                });
                describe('When constructed with the `sorter` parameter missing', function () {
                    var sorter, controls;
                    it('Throws an error', function () {
                        expect(function () {
                            sorter = new ListSorter(ko.observableArray(), ko.observableArray());
                            controls = new ListControlsComponent({
                                pager: new ListPager(ko.observableArray()),
                                resultsMode: ko.observable(),
                                availableResultsModes: ko.observable(),
                                searchUrlFor: _.noop
                            });
                        }).to.throw('ListControlsComponent missing required parameter: `sorter`.');
                    });
                });
                describe('When constructed with the `resultsMode` parameter missing', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent({
                                pager: new ListPager(ko.observableArray()),
                                sorter: new ListSorter(ko.observableArray(), ko.observableArray()),
                                availableResultsModes: ko.observable(),
                                searchUrlFor: _.noop
                            });
                        }).to.throw('ListControlsComponent missing required parameter: `resultsMode`.');
                    });
                });
                describe('When constructed with the `availableResultsModes` parameter missing', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent({
                                pager: new ListPager(ko.observableArray()),
                                sorter: new ListSorter(ko.observableArray(), ko.observableArray()),
                                resultsMode: ko.observable(),
                                searchUrlFor: _.noop
                            });
                        }).to.throw('ListControlsComponent missing required parameter: `availableResultsModes`.');
                    });
                });
                describe('When constructed with the `searchUrlFor` parameter missing', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent({
                                pager: new ListPager(ko.observableArray()),
                                sorter: new ListSorter(ko.observableArray(), ko.observableArray()),
                                resultsMode: ko.observable(),
                                availableResultsModes: ko.observable()
                            });
                        }).to.throw('ListControlsComponent missing required parameter: `searchUrlFor`.');
                    });
                });
            });
        }
    );
}());
