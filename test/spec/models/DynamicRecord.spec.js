(function () {
    'use strict';

    define(
        [
            'chai',
            'knockout',
            'models/DynamicRecord'
        ],
        function (chai, ko, DynamicRecord) {
            var expect = chai.expect;

            describe('The `DynamicRecord` module', function () {
                it('Defines a constructor function', function () {
                    expect(DynamicRecord).to.be.a('function');
                });
                describe('When constructed with no result field definitions', function () {
                    var result, resultFieldsObservable, record;
                    beforeEach(function () {
                        result = {
                            // jshint camelcase: false
                            object_id: 42,
                            name: 'Test Object',
                            value: 12345,
                            foo: 'quux'
                        };
                        resultFieldsObservable = ko.observableArray();
                        record = new DynamicRecord(result, resultFieldsObservable);
                    });
                    it('Stores the id', function () {
                        expect(record.id()).to.equal(42);
                    });
                    it('Does not store any data', function () {
                        expect(record.data()).to.deep.equal({});
                    });
                });
                describe('When constructed with simple values in matching result field definitions', function () {
                    var result, resultFieldsObservable, record;
                    beforeEach(function () {
                        result = {
                            // jshint camelcase: false
                            object_id: 42,
                            name: 'Test Object',
                            value: 12345,
                            foo: 'quux'
                        };
                        resultFieldsObservable = ko.observableArray([
                            {
                                key: 'name',
                                // These are all implied, but lets test both implicit and explicit definitions
                                parse: false,
                                skip: false,
                                filter: false
                            },
                            {
                                key: 'value'
                            }
                        ]);
                        record = new DynamicRecord(result, resultFieldsObservable);
                    });
                    it('Returns only values specified in field definitions', function () {
                        expect(record.data()).to.deep.equal({
                            name: 'Test Object',
                            value: 12345
                        });
                    });
                });
                describe('When constructed with complex values in matching result field definitions', function () {
                    var result, resultFieldsObservable, record;
                    beforeEach(function () {
                        result = {
                            // jshint camelcase: false
                            object_id: 42,
                            name: 'Test Object',
                            array: '[ "first", "second", "third" ]',
                            strings: '[ "a", "", "b", "c" ]',
                            emptyString: '[ "" ]',
                            objects: '[' +
                                '{ "foo": "quux", "bar": "baz" },' +
                                '{ "foo": "boo" },' +
                                '{ "baz": "bob", "boop": "bip" }' +
                            ']'
                        };
                        // Be explicit with all flags here for clarity
                        resultFieldsObservable = ko.observableArray([
                            {
                                key: 'name',
                                parse: false,
                                skip: false,
                                filter: false
                            },
                            {
                                key: 'array',
                                parse: true,
                                skip: 1,
                                filter: false
                            },
                            {
                                key: 'strings',
                                parse: true,
                                skip: false,
                                filter: true
                            },
                            {
                                key: 'emptyString',
                                parse: true,
                                skip: false,
                                filter: true
                            },
                            {
                                key: 'objects',
                                parse: true,
                                skip: false,
                                filter: 'foo'
                            }
                        ]);
                        record = new DynamicRecord(result, resultFieldsObservable);
                    });
                    it('Returns all values correctly parsed and filtered as determined by field definitions', function () {
                        expect(record.data()).to.deep.equal({
                            name: 'Test Object',
                            array: [ 'second', 'third' ],
                            strings: [ 'a', 'b', 'c' ],
                            emptyString: [],
                            objects: [
                                { foo: 'quux', bar: 'baz' },
                                { foo: 'boo' }
                            ]
                        });
                    });
                });
            });
        }
    );
}());
