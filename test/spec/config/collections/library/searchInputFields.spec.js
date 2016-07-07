(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/library/searchInputFields'
        ],
        function (_, chai, searchInputFields) {
            var expect = chai.expect;

            describe('The `library/searchInputFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchInputFields).to.be.an('array');
                    expect(searchInputFields).to.have.length(4);
                });
                it('Defines the `Keyword` field', function () {
                    var searchType = _.find(searchInputFields, { key: '_fulltext' });
                    expect(searchType.labelText).to.equal('Keyword');
                    expect(searchType.glyphicon).to.equal('search');
                });
                it('Defines the `Author` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Author' });
                    expect(searchType.labelText).to.equal('Author');
                    expect(searchType.glyphicon).to.equal('user');
                });
                it('Defines the `Title` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.preferred_labels' });
                    expect(searchType.labelText).to.equal('Title');
                    expect(searchType.glyphicon).to.equal('certificate');
                });
                it('Defines the `Subject` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_occurrences.preferred_labels' });
                    expect(searchType.labelText).to.equal('Subject');
                    expect(searchType.glyphicon).to.equal('paperclip');
                });
            });
        }
    );
}());
