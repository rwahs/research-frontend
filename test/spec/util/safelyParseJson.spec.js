(function () {
    'use strict';

    define(
        [
            'chai',
            'util/safelyParseJson'
        ],
        function (chai, safelyParseJson) {
            var expect = chai.expect;

            describe('The `safelyParseJson` module', function () {
                it('Defines a function', function () {
                    expect(safelyParseJson).to.be.a('function');
                });
                describe('When invoked with valid JSON', function () {
                    describe('With a JSON string representing a string value', function () {
                        it('Returns the string value', function () {
                            expect(safelyParseJson('"JSON strings are quoted"')).to.equal('JSON strings are quoted');
                        });
                    });
                    describe('With a JSON string representing a numeric value', function () {
                        it('Returns the number value', function () {
                            expect(safelyParseJson('42')).to.equal(42);
                            expect(safelyParseJson('42.123')).to.equal(42.123);
                        });
                    });
                    describe('With a JSON string representing a boolean value', function () {
                        it('Returns the number value', function () {
                            expect(safelyParseJson('true')).to.equal(true);
                            expect(safelyParseJson('false')).to.equal(false);
                        });
                    });
                    describe('With a JSON string representing an array', function () {
                        it('Returns the array', function () {
                            expect(safelyParseJson('["first",2,"third"]')).to.deep.equal([ 'first', 2, 'third' ]);
                        });
                    });
                    describe('With a JSON string representing an object', function () {
                        it('Returns the array', function () {
                            expect(safelyParseJson('{ "foo": "bar", "meaning": 42 }')).to.deep.equal({ foo: 'bar', meaning: 42 });
                        });
                    });
                });
                describe('When invoked with a string that is not valid JSON', function () {
                    it('Returns an empty string', function () {
                        expect(safelyParseJson('')).to.equal('');
                        expect(safelyParseJson('"mismatched quotes')).to.equal('');
                        expect(safelyParseJson('unquoted text')).to.equal('');
                        expect(safelyParseJson('mixed42')).to.equal('');
                        expect(safelyParseJson('["array","missing","bracket"')).to.equal('');
                        expect(safelyParseJson('["array","missing" "comma"]')).to.equal('');
                        expect(safelyParseJson('["array","missing", quotes]')).to.equal('');
                        expect(safelyParseJson('{"object": true, "missing": "brace"')).to.equal('');
                        expect(safelyParseJson('{"object": true "missing": "comma"}')).to.equal('');
                        expect(safelyParseJson('{"object": true, "missing" "colon"}')).to.equal('');
                        expect(safelyParseJson('{"object": true, missing: "quotes on key"}')).to.equal('');
                        expect(safelyParseJson('{"object": true, "missing": quotes on value}')).to.equal('');
                    });
                });
            });
        }
    );
}());
