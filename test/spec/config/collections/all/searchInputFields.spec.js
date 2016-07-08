(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/all/searchInputFields'
        ],
        function (_, chai, searchInputFields) {
            var expect = chai.expect;

            describe('The `all/searchInputFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchInputFields).to.be.an('array');
                    expect(searchInputFields).to.have.length(16);
                });
                it('Defines the `Keyword` field', function () {
                    var searchType = _.find(searchInputFields, { key: '_fulltext' });
                    expect(searchType.labelText).to.equal('Keyword');
                    expect(searchType.glyphicon).to.equal('search');
                    expect(searchType.basicSearch).to.equal(true);
                });
                it('Defines the `Author` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Author' });
                    expect(searchType.labelText).to.equal('Author');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Title` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.preferred_labels' });
                    expect(searchType.labelText).to.equal('Item Name / Title');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Subject` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_occurrences.preferred_labels' });
                    expect(searchType.labelText).to.equal('Subject');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Accession Number` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.idno' });
                    expect(searchType.labelText).to.equal('Accession Number');
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
                it('Defines the `Publication Type` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.PublicationType' });
                    expect(searchType.labelText).to.equal('Publication Type');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Creator` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Creator.CreatorName' });
                    expect(searchType.labelText).to.equal('Creator');
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
                it('Defines the `Item Dates` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.ItemDates' });
                    expect(searchType.labelText).to.equal('Item Dates');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Makers Marks` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.MakersMarks' });
                    expect(searchType.labelText).to.equal('Makers Marks');
                    expect(searchType.basicSearch).to.equal(false);
                });
                it('Defines the `Importance` field', function () {
                    var searchType = _.find(searchInputFields, { key: 'ca_objects.Importance' });
                    expect(searchType.labelText).to.equal('Importance');
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
