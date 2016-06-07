(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'ui/components/display/DisplayComponent'
        ],
        function (chai, sinon, DisplayComponent) {
            var expect = chai.expect;

            describe('The `DisplayComponent` module', function () {
                it('Defines a constructor function', function () {
                    expect(DisplayComponent).to.be.a('function');
                });
                describe('When constructed with valid parameters', function () {
                    var display;
                    describe('When the `name` field is present in the `data`', function () {
                        beforeEach(function () {
                            display = new DisplayComponent({
                                name: 'field',
                                data: {
                                    idno: '42a',
                                    title: 'Title of the Record',
                                    field: 'value of field'
                                }
                            });
                        });
                        it('Exposes the correct value', function () {
                            expect(display.value()).to.equal('value of field');
                            expect(display.hasValue()).to.equal(true);
                        });
                    });
                    describe('When the `name` field is absent from the `data`', function () {
                        beforeEach(function () {
                            display = new DisplayComponent({
                                name: 'missing',
                                data: {
                                    idno: '42a',
                                    title: 'Title of the Record',
                                    field: 'value'
                                }
                            });
                        });
                        it('Indicates that there is no value', function () {
                            expect(display.value()).to.equal(undefined);
                            expect(display.hasValue()).to.equal(false);
                        });
                    });
                    describe('Without optional parameters', function () {
                        beforeEach(function () {
                            display = new DisplayComponent({
                                name: 'field',
                                data: {
                                    idno: '42a',
                                    title: 'Title of the Record',
                                    field: 'value of field'
                                }
                            });
                        });
                        it('Exposes the correct default label and placeholder values', function () {
                            expect(display.labelText()).to.equal(undefined);
                            expect(display.placeholder()).to.equal('&mdash;');
                        });
                    });
                    describe('With optional parameters specified', function () {
                        beforeEach(function () {
                            display = new DisplayComponent({
                                name: 'field',
                                data: {
                                    idno: '42a',
                                    title: 'Title of the Record',
                                    field: 'value of field'
                                },
                                labelText: 'Label Text',
                                placeholder: 'No value'
                            });
                        });
                        it('Exposes the correct label and placeholder values', function () {
                            expect(display.labelText()).to.equal('Label Text');
                            expect(display.placeholder()).to.equal('No value');
                        });
                    });
                });
                describe('When constructed without a `name` parameter', function () {
                    var display;
                    it('Throws', function () {
                        expect(function () {
                            display = new DisplayComponent({
                                data: []
                            });
                        }).to.throw('DisplayComponent missing required parameter: `name`.');
                    });
                });
                describe('When constructed without a `data` parameter', function () {
                    var display;
                    it('Throws', function () {
                        expect(function () {
                            display = new DisplayComponent({
                                name: 'data'
                            });
                        }).to.throw('DisplayComponent missing required parameter: `data`.');
                    });
                });
            });
        }
    );
}());
