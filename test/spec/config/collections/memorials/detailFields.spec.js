(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/memorials/detailFields'
        ],
        function (_, chai, detailFields) {
            var expect = chai.expect;

            describe('The `memorials/detailFields` module', function () {
                it('Defines a static array', function () {
                    expect(detailFields).to.be.an('array');
                    expect(detailFields).to.have.length(14);
                });
                it('Defines the `type` field', function () {
                    expect(detailFields[0].key).to.equal('type');
                    expect(detailFields[0].labelText).to.equal('Item Type');
                });
                it('Defines the `idno` field', function () {
                    var idnoField = _.find(detailFields, { key: 'idno' });
                    expect(idnoField.labelText).to.equal('Accession Number');
                });
                it('Defines the `ItemName` field', function () {
                    var itemNameField = _.find(detailFields, { key: 'ItemName' });
                    expect(itemNameField.labelText).to.equal('Item Name');
                    expect(itemNameField.placeholder).to.equal('(unnamed)');
                });
                it('Defines the `Description` field', function () {
                    var descriptionField = _.find(detailFields, { key: 'Description' });
                    expect(descriptionField.labelText).to.equal('Description');
                });
                it('Defines the `Inscription` field', function () {
                    var inscriptionField = _.find(detailFields, { key: 'Inscription' });
                    expect(inscriptionField.labelText).to.equal('Inscription');
                });
                it('Defines the `Creator` field', function () {
                    var creatorField = _.find(detailFields, { key: 'Creator' });
                    expect(creatorField.labelText).to.equal('Creator');
                    expect(creatorField.parse).to.equal(true);
                    expect(creatorField.filter).to.equal('Value');
                    expect(creatorField.display).to.equal('typed-list');
                });
                it('Defines the `ErectedBy` field', function () {
                    var erectedByField = _.find(detailFields, { key: 'ErectedBy' });
                    expect(erectedByField.labelText).to.equal('Erected By');
                });
                it('Defines the `Location` field', function () {
                    var locationField = _.find(detailFields, { key: 'Location' });
                    expect(locationField.labelText).to.equal('Location');
                    expect(locationField.parse).to.equal(true);
                    expect(locationField.skip).to.equal(1);
                    expect(locationField.filter).to.equal(true);
                    expect(locationField.display).to.equal('hierarchy');
                });
                it('Defines the `Dates` field', function () {
                    var datesField = _.find(detailFields, { key: 'Dates' });
                    expect(datesField.labelText).to.equal('Dates');
                });
                it('Defines the `Subjects` field', function () {
                    var subjectsField = _.find(detailFields, { key: 'Subjects' });
                    expect(subjectsField.labelText).to.equal('Subjects');
                    expect(subjectsField.parse).to.equal(true);
                    expect(subjectsField.filter).to.equal(true);
                    expect(subjectsField.display).to.equal('list');
                });
                it('Defines the `Materials` field', function () {
                    var materialsField = _.find(detailFields, { key: 'Materials' });
                    expect(materialsField.labelText).to.equal('Materials');
                });
                it('Defines the `Dimensions` field', function () {
                    var dimensionsField = _.find(detailFields, { key: 'Dimensions' });
                    expect(dimensionsField.labelText).to.equal('Dimensions');
                    expect(dimensionsField.parse).to.equal(true);
                    expect(dimensionsField.filter).to.equal('Value');
                    expect(dimensionsField.display).to.equal('typed-list');
                });
                it('Defines the `Provenance` field', function () {
                    var provenanceField = _.find(detailFields, { key: 'Provenance' });
                    expect(provenanceField.labelText).to.equal('Provenance');
                });
                it('Defines the `MediaMedium` field', function () {
                    var mediaMediumField = _.find(detailFields, { key: 'MediaMedium' });
                    expect(mediaMediumField.display).to.equal('image');
                    expect(mediaMediumField.placeholder).to.equal(false);
                });
            });
        }
    );
}());
