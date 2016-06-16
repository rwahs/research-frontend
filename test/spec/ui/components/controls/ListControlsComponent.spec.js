(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'chai',
            'sinon',
            'config/routes',
            'ui/components/controls/ListControlsComponent',
            'models/ListModeSwitcher',
            'models/ListPager',
            'models/ListSorter'
        ],
        function (_, ko, chai, sinon, routes, ListControlsComponent, ListModeSwitcher, ListPager, ListSorter) {
            var expect = chai.expect,
                data = _.map(_.range(0, 500), function (n) {
                    return {
                        id: ko.observable(n),
                        data: ko.observable({
                            first: 'record ' + n,
                            second: '' + n,
                            third: n
                        })
                    };
                });

            describe('The `ListControlsComponent` module', function () {
                it('Defines a constructor function', function () {
                    expect(ListControlsComponent).to.be.a('function');
                });
                describe('When constructed with all required parameters', function () {
                    var modeSwitcher, sorter, pager, controls;
                    beforeEach(function (done) {
                        sinon.stub(routes, 'pushState');
                        require([ 'fixtures/collections/searchResultFields' ], function (searchResultFields) {
                            modeSwitcher = new ListModeSwitcher('List');
                            sorter = new ListSorter(ko.observableArray(data), ko.observableArray(searchResultFields), 'first', 'asc');
                            pager = new ListPager(sorter.sortedList, 0, 10, [ 10, 25 ]);
                            controls = new ListControlsComponent({
                                modeSwitcher: modeSwitcher,
                                pager: pager,
                                sorter: sorter,
                                searchUrlFor: _.identity
                            });
                            done();
                        });
                    });
                    it('Exposes computed observables', function () {
                        expect(ko.isPureComputed(controls.sortField)).to.equal(true);
                        expect(ko.isPureComputed(controls.sortDirection)).to.equal(true);
                        expect(ko.isPureComputed(controls.availableSortFields)).to.equal(true);
                        expect(ko.isPureComputed(controls.isAscending)).to.equal(true);
                        expect(ko.isPureComputed(controls.isDescending)).to.equal(true);
                        expect(ko.isPureComputed(controls.sortAscendingUrl)).to.equal(true);
                        expect(ko.isPureComputed(controls.sortDescendingUrl)).to.equal(true);
                        expect(ko.isPureComputed(controls.availableModes)).to.equal(true);
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
                        expect(_.isFunction(controls.sortAscending)).to.equal(true);
                        expect(_.isFunction(controls.sortDescending)).to.equal(true);
                        expect(_.isFunction(controls.jumpToFirstPage)).to.equal(true);
                        expect(_.isFunction(controls.jumpToLastPage)).to.equal(true);
                        expect(_.isFunction(controls.jumpToPreviousPage)).to.equal(true);
                        expect(_.isFunction(controls.jumpToNextPage)).to.equal(true);
                    });
                    it('Returns the correct `availableSortFields` objects', function () {
                        var sortFields = controls.availableSortFields();
                        expect(_.find(sortFields, { key: 'first' })).not.to.equal(undefined);
                        expect(_.find(sortFields, { key: 'second' })).not.to.equal(undefined);
                        expect(_.find(sortFields, { key: 'third' })).to.equal(undefined); // Doesn't have a `sort` property
                    });
                    describe('The `sortField` writable-computed', function () {
                        it('Has the correct initial value', function () {
                            expect(controls.sortField()).to.equal('first');
                        });
                        describe('When the value is changed directly', function () {
                            beforeEach(function () {
                                controls.sortField('second');
                            });
                            it('Updates the `field` observable in the `ListSorter`', function () {
                                expect(sorter.field()).to.equal('second');
                            });
                            it('Updates the browser URL', function () {
                                sinon.assert.calledOnce(routes.pushState);
                            });
                        });
                        describe('When the value in the `ListSorter` is updated', function () {
                            beforeEach(function () {
                                sorter.field('second');
                            });
                            it('Updates the `sortField`', function () {
                                expect(controls.sortField()).to.equal('second');
                            });
                        });
                    });
                    describe('The `sortDirection` writable-computed', function () {
                        it('Has the correct initial value', function () {
                            expect(controls.sortDirection()).to.equal('asc');
                        });
                        describe('When the value is changed directly', function () {
                            beforeEach(function () {
                                controls.sortDirection('desc');
                            });
                            it('Updates the `field` observable in the `ListSorter`', function () {
                                expect(sorter.direction()).to.equal('desc');
                            });
                            it('Updates the browser URL', function () {
                                sinon.assert.calledOnce(routes.pushState);
                            });
                        });
                        describe('When the value in the `ListSorter` is updated', function () {
                            beforeEach(function () {
                                sorter.direction('desc');
                            });
                            it('Updates the `sortField`', function () {
                                expect(controls.sortDirection()).to.equal('desc');
                            });
                        });
                    });
                    describe('The `pageSize` writable-computed', function () {
                        it('Has the correct initial value', function () {
                            expect(controls.pageSize()).to.equal(10);
                        });
                        describe('When the value is changed directly', function () {
                            beforeEach(function () {
                                controls.pageSize(25);
                            });
                            it('Updates the `pageSize` observable in the `ListPager`', function () {
                                expect(pager.pageSize()).to.equal(25);
                            });
                            it('Updates the browser URL', function () {
                                sinon.assert.calledOnce(routes.pushState);
                            });
                        });
                        describe('When the value in the `ListPager` is updated', function () {
                            beforeEach(function () {
                                pager.pageSize(25);
                            });
                            it('Updates the `pageSize`', function () {
                                expect(controls.pageSize()).to.equal(25);
                            });
                        });
                    });
                    it('Returns the correct `availableModes` objects', function () {
                        var modes = controls.availableModes();
                        expect(modes.length).to.equal(3); // For the 3 passed in modes

                        expect(modes[0].label).to.equal('List');
                        expect(modes[0].longLabel).to.equal('Display results in List mode');
                        expect(modes[0].url).to.deep.equal({ mode: 'List' }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(modes[0].active)).to.equal(true);
                        expect(_.isFunction(modes[0].click)).to.equal(true);

                        expect(modes[1].label).to.equal('Thumbnails');
                        expect(modes[1].longLabel).to.equal('Display results in Thumbnails mode');
                        expect(modes[1].url).to.deep.equal({ mode: 'Thumbnails' }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(modes[1].active)).to.equal(true);
                        expect(_.isFunction(modes[1].click)).to.equal(true);

                        expect(modes[2].label).to.equal('Table');
                        expect(modes[2].longLabel).to.equal('Display results in Table mode');
                        expect(modes[2].url).to.deep.equal({ mode: 'Table' }); // Since we have `_.identity` as the `searchUrlFor` callback
                        expect(_.isFunction(modes[2].active)).to.equal(true);
                        expect(_.isFunction(modes[2].click)).to.equal(true);
                    });
                    it('Returns the correct `availablePageSizes` objects', function () {
                        expect(controls.availablePageSizes()).to.deep.equal([ 10, 25 ]); // For the 2 page sizes
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
                    afterEach(function () {
                        routes.pushState.restore();
                    });
                });
                describe('When constructed with no parameters', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent();
                        }).to.throw('ListControlsComponent missing parameter map.');
                    });
                });
                describe('When constructed with the `modeSwitcher` parameter missing', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent({
                                pager: new ListPager(ko.observableArray()),
                                sorter: new ListSorter(ko.observableArray(), ko.observableArray()),
                                searchUrlFor: _.noop
                            });
                        }).to.throw('ListControlsComponent missing required parameter: `modeSwitcher`.');
                    });
                });
                describe('When constructed with the `pager` parameter missing', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent({
                                modeSwitcher: new ListModeSwitcher(),
                                sorter: new ListSorter(ko.observableArray(), ko.observableArray()),
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
                                modeSwitcher: new ListModeSwitcher(),
                                pager: new ListPager(ko.observableArray()),
                                searchUrlFor: _.noop
                            });
                        }).to.throw('ListControlsComponent missing required parameter: `sorter`.');
                    });
                });
                describe('When constructed with the `searchUrlFor` parameter missing', function () {
                    var controls;
                    it('Throws an error', function () {
                        expect(function () {
                            controls = new ListControlsComponent({
                                modeSwitcher: new ListModeSwitcher(),
                                pager: new ListPager(ko.observableArray()),
                                sorter: new ListSorter(ko.observableArray(), ko.observableArray())
                            });
                        }).to.throw('ListControlsComponent missing required parameter: `searchUrlFor`.');
                    });
                });
            });
        }
    );
}());
