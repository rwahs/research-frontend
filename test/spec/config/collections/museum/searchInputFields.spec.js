(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/museum/searchInputFields'
        ],
        function (_, chai, searchInputFields) {
            var expect = chai.expect;

            describe('The `museum/searchInputFields` module', function () {
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
            });
        }
    );
}());
