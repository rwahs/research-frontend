(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'knockout',
            'models/ListModeSwitcher'
        ],
        function (_, chai, ko, ListModeSwitcher) {
            var expect = chai.expect;

            describe('The `ListModeSwitcher` module', function () {
                it('Defines a constructor function', function () {
                    expect(ListModeSwitcher).to.be.a('function');
                });
                describe('When constructed', function () {
                    describe('With no initial mode specified', function () {
                        var modeSwitcher;
                        beforeEach(function () {
                            modeSwitcher = new ListModeSwitcher();
                        });
                        it('Exposes observables and computed observables', function () {
                            expect(ko.isObservable(modeSwitcher.mode)).to.equal(true);
                            expect(ko.isPureComputed(modeSwitcher.availableModes)).to.equal(true);
                            expect(ko.isPureComputed(modeSwitcher.resultsContainerClassName)).to.equal(true);
                        });
                        it('Has the correct default initial state', function () {
                            expect(modeSwitcher.mode()).to.equal('List');
                            expect(modeSwitcher.availableModes()).to.deep.equal([ 'List', 'Thumbnails', 'Table' ]);
                            expect(modeSwitcher.resultsContainerClassName()).to.equal('results-container-list');
                        });
                    });
                    describe('With initial mode specified', function () {
                        var modeSwitcher;
                        beforeEach(function () {
                            modeSwitcher = new ListModeSwitcher('Table');
                        });
                        it('Exposes observables and computed observables', function () {
                            expect(ko.isObservable(modeSwitcher.mode)).to.equal(true);
                            expect(ko.isPureComputed(modeSwitcher.availableModes)).to.equal(true);
                            expect(ko.isPureComputed(modeSwitcher.resultsContainerClassName)).to.equal(true);
                        });
                        it('Has the correct initial state', function () {
                            expect(modeSwitcher.mode()).to.equal('Table');
                            expect(modeSwitcher.availableModes()).to.deep.equal([ 'List', 'Thumbnails', 'Table' ]);
                            expect(modeSwitcher.resultsContainerClassName()).to.equal('results-container-table');
                        });
                    });
                });
            });
        }
    );
}());
