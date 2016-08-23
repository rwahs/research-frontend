(function () {
    'use strict';

    define(
        [
            'chai',
            'util/convertBasicSearch'
        ],
        function (chai, convertBasicSearch) {
            var expect = chai.expect;

            describe('The `convertBasicSearch` module', function () {
                it('Defines a function', function () {
                    expect(convertBasicSearch).to.be.a('function');
                });
                describe('When invoked with an empty string', function () {
                    it('Returns undefined', function () {
                        expect(convertBasicSearch('field', '')).to.equal(undefined);
                    });
                });
                describe('When invoked with a string consisting of only whitespace', function () {
                    it('Returns undefined', function () {
                        expect(convertBasicSearch('field', '   ')).to.equal(undefined);
                    });
                });
                describe('When invoked with a single word', function () {
                    it('Returns the correct query', function () {
                        expect(convertBasicSearch('field', 'xyzzy')).to.deep.equal({
                            operator: 'AND',
                            children: [
                                {
                                    field: 'field',
                                    comparator: 'contains',
                                    value: 'xyzzy'
                                }
                            ]
                        });
                    });
                });
                describe('When invoked with a single word with extraneous whitespace', function () {
                    it('Returns the correct query', function () {
                        expect(convertBasicSearch('field', '  foo  ')).to.deep.equal({
                            operator: 'AND',
                            children: [
                                {
                                    field: 'field',
                                    comparator: 'contains',
                                    value: 'foo'
                                }
                            ]
                        });
                    });
                });
                describe('When invoked with a multi-word string', function () {
                    it('Returns the correct query', function () {
                        expect(convertBasicSearch('field', 'quux xyzzy baz')).to.deep.equal({
                            operator: 'AND',
                            children: [
                                {
                                    field: 'field',
                                    comparator: 'contains',
                                    value: 'quux'
                                },
                                {
                                    field: 'field',
                                    comparator: 'contains',
                                    value: 'xyzzy'
                                },
                                {
                                    field: 'field',
                                    comparator: 'contains',
                                    value: 'baz'
                                }
                            ]
                        });
                    });
                });
                describe('When invoked with a multi-word string with extraneous whitespace', function () {
                    expect(convertBasicSearch('field', '  forty    two ')).to.deep.equal({
                        operator: 'AND',
                        children: [
                            {
                                field: 'field',
                                comparator: 'contains',
                                value: 'forty'
                            },
                            {
                                field: 'field',
                                comparator: 'contains',
                                value: 'two'
                            }
                        ]
                    });
                });
            });
        }
    );
}());
