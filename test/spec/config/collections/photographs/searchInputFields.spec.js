(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/photographs/searchInputFields'
        ],
        function (_, chai, searchInputFields) {
            var expect = chai.expect;

            describe('The `photographs/searchInputFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchInputFields).to.be.an('array');
                    expect(searchInputFields).to.have.length(10);
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
                it('Defines the `Title` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.preferred_labels' });
                    expect(searchType.labelText).to.equal('Title');
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
                it('Defines the `Creator` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Creator' });
                    expect(searchType.labelText).to.equal('Creator');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Publisher` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Publisher' });
                    expect(searchType.labelText).to.equal('Publisher');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Date of Publication` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.DateOfPublication' });
                    expect(searchType.labelText).to.equal('Date of Publication');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Place of Publication` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.PlaceOfPublication' });
                    expect(searchType.labelText).to.equal('Place of Publication');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Medium` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Medium' });
                    expect(searchType.labelText).to.equal('Medium');
                    expect(searchType.basicSearch).to.equal(false);
                });
            });
        }
    );
}());
