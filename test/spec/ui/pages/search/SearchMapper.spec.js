(function () {
    'use strict';

    define(
        [
            'chai',
            'knockout',
            'ui/pages/search/SearchMapper'
        ],
        function (chai, ko, SearchMapper) {
            var expect = chai.expect;

            describe('The `SearchMapper` module', function () {
                it('Defines a function', function () {
                    expect(SearchMapper).to.be.a('function');
                });
                describe('When invoked', function () {
                    var selectedSearchTypeObservable, resultFieldsObservable, detailUrlTemplate, mapper;
                    beforeEach(function () {
                        selectedSearchTypeObservable = ko.observable('name');
                        resultFieldsObservable = ko.observableArray();
                        detailUrlTemplate = '/path/to/detail/:id';
                        mapper = new SearchMapper(selectedSearchTypeObservable, resultFieldsObservable, detailUrlTemplate);
                    });
                    it('Returns an object with the required functions', function () {
                        expect(mapper).to.be.an('object');
                        expect(mapper.mapType).to.be.a('function');
                        expect(mapper.mapResult).to.be.a('function');
                    });
                    describe('The `mapType` function', function () {
                        describe('When passed an object which matches the selected type', function () {
                            var mappedValue;
                            beforeEach(function () {
                                mappedValue = mapper.mapType({
                                    key: 'name',
                                    labelText: 'Name',
                                    glyphicon: 'icon'
                                });
                            });
                            it('Gives the correct key', function () {
                                expect(mappedValue.key).to.equal('name');
                            });
                            it('Gives the correct composed label markup', function () {
                                expect(mappedValue.label).to.equal('<span class="small glyphicon glyphicon-icon"></span> Name');
                            });
                            it('Gives the correct placeholder text', function () {
                                expect(mappedValue.placeholder).to.equal('Search by Name...');
                            });
                            it('Is marked as active', function () {
                                expect(mappedValue.active()).to.equal(true);
                            });
                            describe('When the selected value is changed', function () {
                                beforeEach(function () {
                                    selectedSearchTypeObservable('another-field');
                                });
                                it('Continues to give the correct key', function () {
                                    expect(mappedValue.key).to.equal('name');
                                });
                                it('Continues to give the correct composed label markup', function () {
                                    expect(mappedValue.label).to.equal('<span class="small glyphicon glyphicon-icon"></span> Name');
                                });
                                it('Continues to give the correct placeholder text', function () {
                                    expect(mappedValue.placeholder).to.equal('Search by Name...');
                                });
                                it('Is no longer marked as active', function () {
                                    expect(mappedValue.active()).to.equal(false);
                                });
                            });
                        });
                        describe('When passed an object which does not match the selected type', function () {
                            var mappedValue;
                            beforeEach(function () {
                                mappedValue = mapper.mapType({
                                    key: 'another-field',
                                    labelText: 'Another Field',
                                    glyphicon: 'foo'
                                });
                            });
                            it('Gives the correct key', function () {
                                expect(mappedValue.key).to.equal('another-field');
                            });
                            it('Gives the correct composed label markup', function () {
                                expect(mappedValue.label).to.equal('<span class="small glyphicon glyphicon-foo"></span> Another Field');
                            });
                            it('Gives the correct placeholder text', function () {
                                expect(mappedValue.placeholder).to.equal('Search by Another Field...');
                            });
                            it('Is not marked as active', function () {
                                expect(mappedValue.active()).to.equal(false);
                            });
                            describe('When the selected value is changed to match the field', function () {
                                beforeEach(function () {
                                    selectedSearchTypeObservable('another-field');
                                });
                                it('Continues to give the correct key', function () {
                                    expect(mappedValue.key).to.equal('another-field');
                                });
                                it('Continues to give the correct composed label markup', function () {
                                    expect(mappedValue.label).to.equal('<span class="small glyphicon glyphicon-foo"></span> Another Field');
                                });
                                it('Continues to give the correct placeholder text', function () {
                                    expect(mappedValue.placeholder).to.equal('Search by Another Field...');
                                });
                                it('Is now marked as active', function () {
                                    expect(mappedValue.active()).to.equal(true);
                                });
                            });
                            describe('The `makeActive` function', function () {
                                beforeEach(function () {
                                    mappedValue.makeActive();
                                });
                                it('Updates the selected value observable', function () {
                                    expect(selectedSearchTypeObservable()).to.equal('another-field');
                                });
                                it('Marks the field as active', function () {
                                    expect(mappedValue.active()).to.equal(true);
                                });
                            });
                        });
                    });
                    describe('The `mapResult` function', function () {
                        var result, mappedResult;
                        beforeEach(function () {
                            result = {
                                name: 'Test Object',
                                value: 12345,
                                foo: 'quux'
                            };
                        });
                        describe('With no result field definitions', function () {
                            beforeEach(function () {
                                resultFieldsObservable([]);
                                mappedResult = mapper.mapResult(result);
                            });
                            it('Returns all values unmodified and with display values set to unmodified string values', function () {
                                expect(mappedResult.name).to.deep.equal({
                                    key: 'name',
                                    value: 'Test Object',
                                    displayValue: 'Test Object'
                                });
                                expect(mappedResult.value).to.deep.equal({
                                    key: 'value',
                                    value: 12345,
                                    displayValue: '12345'
                                });
                                expect(mappedResult.foo).to.deep.equal({
                                    key: 'foo',
                                    value: 'quux',
                                    displayValue: 'quux'
                                });
                            });
                        });
                        describe('With matching result field definitions', function () {
                            beforeEach(function () {
                                resultFieldsObservable([
                                    {
                                        key: 'name'
                                    },
                                    {
                                        key: 'value',
                                        displayValue: function (value) {
                                            return '$' + Math.floor(value / 100) + '.' + (value % 100);
                                        }
                                    }
                                ]);
                                mappedResult = mapper.mapResult(result);
                            });
                            it('Returns all values unmodified and with display values set to correctly modified values', function () {
                                expect(mappedResult.name).to.deep.equal({
                                    key: 'name',
                                    value: 'Test Object',
                                    displayValue: 'Test Object'
                                });
                                expect(mappedResult.value).to.deep.equal({
                                    key: 'value',
                                    value: 12345,
                                    displayValue: '$123.45'
                                });
                                expect(mappedResult.foo).to.deep.equal({
                                    key: 'foo',
                                    value: 'quux',
                                    displayValue: 'quux'
                                });
                            });
                        });
                    });
                });
            });
        }
    );
}());
