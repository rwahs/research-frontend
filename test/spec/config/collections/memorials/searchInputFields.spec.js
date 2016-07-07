(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/memorials/searchInputFields'
        ],
        function (_, chai, searchInputFields) {
            var expect = chai.expect;

            describe('The `memorials/searchInputFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchInputFields).to.be.an('array');
                    expect(searchInputFields).to.have.length(7);
                });
                it('Defines the `Keyword` field', function () {
                    var searchType = _.find(searchInputFields, { key: '_fulltext' });
                    expect(searchType.labelText).to.equal('Keyword');
                    expect(searchType.glyphicon).to.equal('search');
                    expect(searchType.basicSearch).to.equal(true);
                });
                it('Defines the `Creator` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Creator.CreatorName' });
                    expect(searchType.labelText).to.equal('Creator');
                    expect(searchType.glyphicon).to.equal('user');
                    expect(searchType.basicSearch).to.equal(true);
                });
                it('Defines the `Item Name` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.preferred_labels' });
                    expect(searchType.labelText).to.equal('Item Name');
                    expect(searchType.glyphicon).to.equal('certificate');
                    expect(searchType.basicSearch).to.equal(true);
                });
                it('Defines the `Subject` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_occurrences.preferred_labels' });
                    expect(searchType.labelText).to.equal('Subject');
                    expect(searchType.glyphicon).to.equal('paperclip');
                    expect(searchType.basicSearch).to.equal(true);
                });
                it('Defines the `Accession Number` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.idno' });
                    expect(searchType.labelText).to.equal('Accession Number');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Erected By` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.ErectedBy' });
                    expect(searchType.labelText).to.equal('Erected By');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Location` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Location' });
                    expect(searchType.labelText).to.equal('Location');
                    expect(searchType.basicSearch).to.equal(false);
                });
            });
        }
    );
}());
