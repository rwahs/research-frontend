(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/library/detailFields'
        ],
        function (_, chai, detailFields) {
            var expect = chai.expect;

            describe('The `library/detailFields` module', function () {
                it('Defines a static array', function () {
                    expect(detailFields).to.be.an('array');
                    expect(detailFields).to.have.length(19);
                });
                it('Defines the `type` field', function () {
                    expect(detailFields[0].key).to.equal('type');
                    expect(detailFields[0].labelText).to.equal('Item Type');
                });
                it('Defines the `idno` field', function () {
                    var idnoField = _.find(detailFields, { key: 'idno' });
                    expect(idnoField.labelText).to.equal('Accession Number');
                });
                it('Defines the `Title` field', function () {
                    var titleField = _.find(detailFields, { key: 'Title' });
                    expect(titleField.labelText).to.equal('Title');
                    expect(titleField.placeholder).to.equal('(untitled)');
                });
                it('Defines the `Author` field', function () {
                    var authorField = _.find(detailFields, { key: 'Author' });
                    expect(authorField.labelText).to.equal('Author');
                    expect(authorField.parse).to.equal(true);
                    expect(authorField.filter).to.equal(true);
                    expect(authorField.display).to.equal('list');
                });
                it('Defines the `Publisher` field', function () {
                    var publisherField = _.find(detailFields, { key: 'Publisher' });
                    expect(publisherField.labelText).to.equal('Publisher');
                });
                it('Defines the `DateOfPublication` field', function () {
                    var dateOfPublicationField = _.find(detailFields, { key: 'DateOfPublication' });
                    expect(dateOfPublicationField.labelText).to.equal('Date of Publication');
                });
                it('Defines the `PlaceOfPublication` field', function () {
                    var placeOfPublicationField = _.find(detailFields, { key: 'PlaceOfPublication' });
                    expect(placeOfPublicationField.labelText).to.equal('Place of Publication');
                });
                it('Defines the `PublicationType` field', function () {
                    var publicationTypeField = _.find(detailFields, { key: 'PublicationType' });
                    expect(publicationTypeField.labelText).to.equal('Type');
                });
                it('Defines the `Edition` field', function () {
                    var editionField = _.find(detailFields, { key: 'Edition' });
                    expect(editionField.labelText).to.equal('Edition');
                });
                it('Defines the `Size` field', function () {
                    var sizeField = _.find(detailFields, { key: 'Size' });
                    expect(sizeField.labelText).to.equal('Size');
                });
                it('Defines the `Series` field', function () {
                    var seriesField = _.find(detailFields, { key: 'Series' });
                    expect(seriesField.labelText).to.equal('Series');
                });
                it('Defines the `Subjects` field', function () {
                    var subjectsField = _.find(detailFields, { key: 'Subjects' });
                    expect(subjectsField.labelText).to.equal('Subjects');
                    expect(subjectsField.parse).to.equal(true);
                    expect(subjectsField.filter).to.equal(true);
                    expect(subjectsField.display).to.equal('list');
                });
                it('Defines the `Collation` field', function () {
                    var collationField = _.find(detailFields, { key: 'Collation' });
                    expect(collationField.labelText).to.equal('Collation');
                });
                it('Defines the `ISBNISSN` field', function () {
                    var isbnissnField = _.find(detailFields, { key: 'ISBNISSN' });
                    expect(isbnissnField.labelText).to.equal('ISBN / ISSN');
                });
                it('Defines the `LibraryNumber` field', function () {
                    var libraryNumberField = _.find(detailFields, { key: 'LibraryNumber' });
                    expect(libraryNumberField.labelText).to.equal('Library Number');
                });
                it('Defines the `Donated` field', function () {
                    var donatedField = _.find(detailFields, { key: 'Donated' });
                    expect(donatedField.labelText).to.equal('Donated');
                });
                it('Defines the `Purchased` field', function () {
                    var purchasedField = _.find(detailFields, { key: 'Purchased' });
                    expect(purchasedField.labelText).to.equal('Purchased');
                });
                it('Defines the `MediaMedium` field', function () {
                    var mediaMediumField = _.find(detailFields, { key: 'MediaMedium' });
                    expect(mediaMediumField.display).to.equal('image');
                    expect(mediaMediumField.placeholder).to.equal(false);
                });
                it('Defines the `MediaAccess` field', function () {
                    var mediaMediumField = _.find(detailFields, { key: 'MediaAccess' });
                    expect(mediaMediumField).to.be.an('object');
                });
            });
        }
    );
}());
