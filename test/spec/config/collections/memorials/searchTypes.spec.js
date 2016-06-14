(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/memorials/searchTypes'
        ],
        function (_, chai, searchTypes) {
            var expect = chai.expect;

            describe('The `memorials/searchTypes` module', function () {
                it('Defines a static array', function () {
                    expect(searchTypes).to.be.an('array');
                    expect(searchTypes).to.have.length(3);
                });
                it('Defines the `Keyword` field', function () {
                    var searchType = _.find(searchTypes, { key: '_fulltext' });
                    expect(searchType.labelText).to.equal('Keyword');
                    expect(searchType.glyphicon).to.equal('search');
                });
                it('Defines the `Item Name` field', function () {
                    var searchType = _.find(searchTypes, { key: 'ca_objects.preferred_labels' });
                    expect(searchType.labelText).to.equal('Item Name');
                    expect(searchType.glyphicon).to.equal('certificate');
                });
                it('Defines the `Subject` field', function () {
                    var searchType = _.find(searchTypes, { key: 'ca_occurrences.preferred_labels' });
                    expect(searchType.labelText).to.equal('Subject');
                    expect(searchType.glyphicon).to.equal('paperclip');
                });
            });
        }
    );
}());
