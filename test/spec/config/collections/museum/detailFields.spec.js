(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/museum/detailFields'
        ],
        function (_, chai, detailFields) {
            var expect = chai.expect;

            describe('The `museum/detailFields` module', function () {
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
                it('Defines the `ItemName` field', function () {
                    var itemNameField = _.find(detailFields, { key: 'ItemName' });
                    expect(itemNameField.labelText).to.equal('Item Name');
                    expect(itemNameField.placeholder).to.equal('(unnamed)');
                });
                it('Defines the `Description` field', function () {
                    var descriptionField = _.find(detailFields, { key: 'Description' });
                    expect(descriptionField.labelText).to.equal('Description');
                });
                it('Defines the `MakersMarks` field', function () {
                    var makersMarksField = _.find(detailFields, { key: 'MakersMarks' });
                    expect(makersMarksField.labelText).to.equal('Makers Marks');
                });
                it('Defines the `Dates` field', function () {
                    var datesField = _.find(detailFields, { key: 'Dates' });
                    expect(datesField.labelText).to.equal('Dates');
                });
                it('Defines the `EarliestYear` field', function () {
                    var earliestYearField = _.find(detailFields, { key: 'EarliestYear' });
                    expect(earliestYearField.labelText).to.equal('Earliest Year');
                });
                it('Defines the `LatestYear` field', function () {
                    var latestYearField = _.find(detailFields, { key: 'LatestYear' });
                    expect(latestYearField.labelText).to.equal('Latest Year');
                });
                it('Defines the `HistoricalDetails` field', function () {
                    var historicalDetailsField = _.find(detailFields, { key: 'HistoricalDetails' });
                    expect(historicalDetailsField.labelText).to.equal('Historical Details');
                });
                it('Defines the `BibliographReferences` field', function () {
                    var bibliographicReferencesField = _.find(detailFields, { key: 'BibliographReferences' });
                    expect(bibliographicReferencesField.labelText).to.equal('Bibliographic References');
                });
                it('Defines the `Subjects` field', function () {
                    var subjectsField = _.find(detailFields, { key: 'Subjects' });
                    expect(subjectsField.labelText).to.equal('Subjects');
                    expect(subjectsField.parse).to.equal(true);
                    expect(subjectsField.filter).to.equal(true);
                    expect(subjectsField.display).to.equal('list');
                });
                it('Defines the `Importance` field', function () {
                    var importanceField = _.find(detailFields, { key: 'Importance' });
                    expect(importanceField.labelText).to.equal('Importance');
                });
                it('Defines the `StatementOfSignificance` field', function () {
                    var statementOfSignificanceField = _.find(detailFields, { key: 'StatementOfSignificance' });
                    expect(statementOfSignificanceField.labelText).to.equal('Statement of Significance');
                });
                it('Defines the `Classification` field', function () {
                    var classificationField = _.find(detailFields, { key: 'Classification' });
                    expect(classificationField.labelText).to.equal('Classification');
                    expect(classificationField.parse).to.equal(true);
                    expect(classificationField.skipNested).to.equal(1);
                    expect(classificationField.filter).to.equal(true);
                    expect(classificationField.display).to.equal('hierarchy-list');
                });
                it('Defines the `MediaMedium` field', function () {
                    var purchasedField = _.find(detailFields, { key: 'MediaMedium' });
                    expect(purchasedField.display).to.equal('image');
                    expect(purchasedField.placeholder).to.equal(false);
                });
            });
        }
    );
}());
