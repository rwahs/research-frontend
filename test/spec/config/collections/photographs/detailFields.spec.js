(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/photographs/detailFields'
        ],
        function (_, chai, detailFields) {
            var expect = chai.expect;

            describe('The `photographs/detailFields` module', function () {
                it('Defines a static array', function () {
                    expect(detailFields).to.be.an('array');
                    expect(detailFields).to.have.length(15);
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
                it('Defines the `Creator` field', function () {
                    var creatorField = _.find(detailFields, { key: 'Creator' });
                    expect(creatorField.labelText).to.equal('Creator');
                    expect(creatorField.parse).to.equal(true);
                    expect(creatorField.filter).to.equal('Value');
                    expect(creatorField.display).to.equal('typed-list');
                });
                it('Defines the `DateOfCreation` field', function () {
                    var dateOfCreationField = _.find(detailFields, { key: 'DateOfCreation' });
                    expect(dateOfCreationField.labelText).to.equal('Date of Creation');
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
                it('Defines the `Medium` field', function () {
                    var mediumField = _.find(detailFields, { key: 'Medium' });
                    expect(mediumField.labelText).to.equal('Medium');
                });
                it('Defines the `PhysicalDescription` field', function () {
                    var physicalDescriptionField = _.find(detailFields, { key: 'PhysicalDescription' });
                    expect(physicalDescriptionField.labelText).to.equal('Physical Description');
                });
                it('Defines the `Subjects` field', function () {
                    var subjectsField = _.find(detailFields, { key: 'Subjects' });
                    expect(subjectsField.labelText).to.equal('Subjects');
                    expect(subjectsField.parse).to.equal(true);
                    expect(subjectsField.filter).to.equal(true);
                    expect(subjectsField.display).to.equal('list');
                });
                it('Defines the `Summary` field', function () {
                    var summaryField = _.find(detailFields, { key: 'Summary' });
                    expect(summaryField.labelText).to.equal('Summary');
                });
                it('Defines the `Notes` field', function () {
                    var notesField = _.find(detailFields, { key: 'Notes' });
                    expect(notesField.labelText).to.equal('Notes');
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
