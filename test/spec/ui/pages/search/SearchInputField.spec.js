(function () {
    'use strict';

    define(
        [
            'chai',
            'knockout',
            'ui/pages/search/SearchInputField'
        ],
        function (chai, ko, SearchInputField) {
            var expect = chai.expect;

            describe('The `SearchInputField` module', function () {
                it('Defines a constructor function', function () {
                    expect(SearchInputField).to.be.a('function');
                });
                describe('When constructed with an object which matches the selected type', function () {
                    var selectedFieldObservable, searchInputField;
                    beforeEach(function () {
                        selectedFieldObservable = ko.observable('name');
                        searchInputField = new SearchInputField(
                            {
                                key: 'name',
                                labelText: 'Name',
                                glyphicon: 'icon'
                            },
                            selectedFieldObservable
                        );
                    });
                    it('Exposes computed observables', function () {
                        expect(ko.isPureComputed(searchInputField.key)).to.equal(true);
                        expect(ko.isPureComputed(searchInputField.basicSearch)).to.equal(true);
                        expect(ko.isPureComputed(searchInputField.labelText)).to.equal(true);
                        expect(ko.isPureComputed(searchInputField.glyphicon)).to.equal(true);
                        expect(ko.isPureComputed(searchInputField.placeholder)).to.equal(true);
                    });
                    it('Gives the correct key', function () {
                        expect(searchInputField.key()).to.equal('name');
                    });
                    it('Gives the correct composed label markup', function () {
                        expect(searchInputField.labelText()).to.equal('Name');
                        expect(searchInputField.glyphicon()).to.equal('<span class="small glyphicon glyphicon-icon"></span>');
                    });
                    it('Gives the correct placeholder text', function () {
                        expect(searchInputField.placeholder()).to.equal('Search by Name...');
                    });
                    it('Is marked as active', function () {
                        expect(searchInputField.active()).to.equal(true);
                    });
                    describe('When the selected value is changed', function () {
                        beforeEach(function () {
                            selectedFieldObservable('another-field');
                        });
                        it('Continues to give the correct key', function () {
                            expect(searchInputField.key()).to.equal('name');
                        });
                        it('Continues to give the correct composed label markup', function () {
                            expect(searchInputField.labelText()).to.equal('Name');
                            expect(searchInputField.glyphicon()).to.equal('<span class="small glyphicon glyphicon-icon"></span>');
                        });
                        it('Continues to give the correct placeholder text', function () {
                            expect(searchInputField.placeholder()).to.equal('Search by Name...');
                        });
                        it('Is no longer marked as active', function () {
                            expect(searchInputField.active()).to.equal(false);
                        });
                    });
                });
                describe('When constructed with an object which does not match the selected type', function () {
                    var selectedFieldObservable, searchInputField;
                    beforeEach(function () {
                        selectedFieldObservable = ko.observable();
                        searchInputField = new SearchInputField(
                            {
                                key: 'another-field',
                                labelText: 'Another Field',
                                glyphicon: 'foo'
                            },
                            selectedFieldObservable
                        );
                    });
                    it('Exposes computed observables', function () {
                        expect(ko.isPureComputed(searchInputField.key)).to.equal(true);
                        expect(ko.isPureComputed(searchInputField.basicSearch)).to.equal(true);
                        expect(ko.isPureComputed(searchInputField.labelText)).to.equal(true);
                        expect(ko.isPureComputed(searchInputField.glyphicon)).to.equal(true);
                        expect(ko.isPureComputed(searchInputField.placeholder)).to.equal(true);
                    });
                    it('Gives the correct key', function () {
                        expect(searchInputField.key()).to.equal('another-field');
                    });
                    it('Gives the correct composed label markup', function () {
                        expect(searchInputField.labelText()).to.equal('Another Field');
                        expect(searchInputField.glyphicon()).to.equal('<span class="small glyphicon glyphicon-foo"></span>');
                    });
                    it('Gives the correct placeholder text', function () {
                        expect(searchInputField.placeholder()).to.equal('Search by Another Field...');
                    });
                    it('Is not marked as active', function () {
                        expect(searchInputField.active()).to.equal(false);
                    });
                    describe('When the selected value is changed to match the field', function () {
                        beforeEach(function () {
                            selectedFieldObservable('another-field');
                        });
                        it('Continues to give the correct key', function () {
                            expect(searchInputField.key()).to.equal('another-field');
                        });
                        it('Continues to give the correct composed label markup', function () {
                            expect(searchInputField.labelText()).to.equal('Another Field');
                            expect(searchInputField.glyphicon()).to.equal('<span class="small glyphicon glyphicon-foo"></span>');
                        });
                        it('Continues to give the correct placeholder text', function () {
                            expect(searchInputField.placeholder()).to.equal('Search by Another Field...');
                        });
                        it('Is now marked as active', function () {
                            expect(searchInputField.active()).to.equal(true);
                        });
                    });
                    describe('The `makeActive` function', function () {
                        beforeEach(function () {
                            searchInputField.makeActive();
                        });
                        it('Updates the selected value observable', function () {
                            expect(selectedFieldObservable()).to.equal('another-field');
                        });
                        it('Marks the field as active', function () {
                            expect(searchInputField.active()).to.equal(true);
                        });
                    });
                });
            });
        }
    );
}());
