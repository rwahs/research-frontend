(function () {
    'use strict';

    define(
        [
            'chai',
            'knockout',
            'ui/pages/search/SearchType'
        ],
        function (chai, ko, SearchType) {
            var expect = chai.expect;

            describe('The `SearchType` module', function () {
                it('Defines a constructor function', function () {
                    expect(SearchType).to.be.a('function');
                });
                describe('When constructed with an object which matches the selected type', function () {
                    var selectedSearchTypeObservable, searchType;
                    beforeEach(function () {
                        selectedSearchTypeObservable = ko.observable('name');
                        searchType = new SearchType(
                            {
                                key: 'name',
                                labelText: 'Name',
                                glyphicon: 'icon'
                            },
                            selectedSearchTypeObservable
                        );
                    });
                    it('Gives the correct key', function () {
                        expect(searchType.key).to.equal('name');
                    });
                    it('Gives the correct composed label markup', function () {
                        expect(searchType.label).to.equal('<span class="small glyphicon glyphicon-icon"></span> Name');
                    });
                    it('Gives the correct placeholder text', function () {
                        expect(searchType.placeholder).to.equal('Search by Name...');
                    });
                    it('Is marked as active', function () {
                        expect(searchType.active()).to.equal(true);
                    });
                    describe('When the selected value is changed', function () {
                        beforeEach(function () {
                            selectedSearchTypeObservable('another-field');
                        });
                        it('Continues to give the correct key', function () {
                            expect(searchType.key).to.equal('name');
                        });
                        it('Continues to give the correct composed label markup', function () {
                            expect(searchType.label).to.equal('<span class="small glyphicon glyphicon-icon"></span> Name');
                        });
                        it('Continues to give the correct placeholder text', function () {
                            expect(searchType.placeholder).to.equal('Search by Name...');
                        });
                        it('Is no longer marked as active', function () {
                            expect(searchType.active()).to.equal(false);
                        });
                    });
                });
                describe('When constructed with an object which does not match the selected type', function () {
                    var selectedSearchTypeObservable, searchType;
                    beforeEach(function () {
                        selectedSearchTypeObservable = ko.observable();
                        searchType = new SearchType(
                            {
                                key: 'another-field',
                                labelText: 'Another Field',
                                glyphicon: 'foo'
                            },
                            selectedSearchTypeObservable
                        );
                    });
                    it('Gives the correct key', function () {
                        expect(searchType.key).to.equal('another-field');
                    });
                    it('Gives the correct composed label markup', function () {
                        expect(searchType.label).to.equal('<span class="small glyphicon glyphicon-foo"></span> Another Field');
                    });
                    it('Gives the correct placeholder text', function () {
                        expect(searchType.placeholder).to.equal('Search by Another Field...');
                    });
                    it('Is not marked as active', function () {
                        expect(searchType.active()).to.equal(false);
                    });
                    describe('When the selected value is changed to match the field', function () {
                        beforeEach(function () {
                            selectedSearchTypeObservable('another-field');
                        });
                        it('Continues to give the correct key', function () {
                            expect(searchType.key).to.equal('another-field');
                        });
                        it('Continues to give the correct composed label markup', function () {
                            expect(searchType.label).to.equal('<span class="small glyphicon glyphicon-foo"></span> Another Field');
                        });
                        it('Continues to give the correct placeholder text', function () {
                            expect(searchType.placeholder).to.equal('Search by Another Field...');
                        });
                        it('Is now marked as active', function () {
                            expect(searchType.active()).to.equal(true);
                        });
                    });
                    describe('The `makeActive` function', function () {
                        beforeEach(function () {
                            searchType.makeActive();
                        });
                        it('Updates the selected value observable', function () {
                            expect(selectedSearchTypeObservable()).to.equal('another-field');
                        });
                        it('Marks the field as active', function () {
                            expect(searchType.active()).to.equal(true);
                        });
                    });
                });
            });
        }
    );
}());
