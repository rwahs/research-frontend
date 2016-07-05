(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/all/searchTypes'
        ],
        function (_, chai, searchTypes) {
            var expect = chai.expect;

            describe('The `all/searchTypes` module', function () {
                it('Defines a static array', function () {
                    expect(searchTypes).to.be.an('array');
                    expect(searchTypes).to.have.length(1);
                });
                it('Defines the `Keyword` field', function () {
                    var searchType = _.find(searchTypes, { key: '_fulltext' });
                    expect(searchType.labelText).to.equal('Keyword');
                    expect(searchType.glyphicon).to.equal('search');
                });
            });
        }
    );
}());
