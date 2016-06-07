(function () {
    'use strict';

    define(
        [
            'chai',
            'config/collections/museum/detailFields'
        ],
        function (chai, detailFields) {
            var expect = chai.expect;

            describe('The `museum/detailFields` module', function () {
                it('Defines a static array', function () {
                    expect(detailFields).to.be.an('array');
                    expect(detailFields).to.have.length(14);
                });
                it('Defines the `type` field', function () {
                    expect(detailFields[0].key).to.equal('type');
                    expect(detailFields[0].labelText).to.equal('Item Type');
                });
                it('Defines the `idno` field', function () {
                    expect(detailFields[1].key).to.equal('idno');
                    expect(detailFields[1].labelText).to.equal('Accession Number');
                });
                it('Defines the `ItemName` field', function () {
                    expect(detailFields[2].key).to.equal('ItemName');
                    expect(detailFields[2].labelText).to.equal('Item Name');
                    expect(detailFields[2].placeholder).to.equal('(unnamed)');
                });
                it('Defines the `Description` field', function () {
                    expect(detailFields[3].key).to.equal('Description');
                    expect(detailFields[3].labelText).to.equal('Description');
                });
                it('Defines the `MakersMarks` field', function () {
                    expect(detailFields[4].key).to.equal('MakersMarks');
                    expect(detailFields[4].labelText).to.equal('Makers Marks');
                });
                it('Defines the `Dates` field', function () {
                    expect(detailFields[5].key).to.equal('Dates');
                    expect(detailFields[5].labelText).to.equal('Dates');
                });
                it('Defines the `EarliestYear` field', function () {
                    expect(detailFields[6].key).to.equal('EarliestYear');
                    expect(detailFields[6].labelText).to.equal('Earliest Year');
                });
                it('Defines the `LatestYear` field', function () {
                    expect(detailFields[7].key).to.equal('LatestYear');
                    expect(detailFields[7].labelText).to.equal('Latest Year');
                });
                it('Defines the `HistoricalDetails` field', function () {
                    expect(detailFields[8].key).to.equal('HistoricalDetails');
                    expect(detailFields[8].labelText).to.equal('Historical Details');
                });
                it('Defines the `BibliographReferences` field', function () {
                    expect(detailFields[9].key).to.equal('BibliographReferences');
                    expect(detailFields[9].labelText).to.equal('Bibliographic References');
                });
                it('Defines the `Subjects` field', function () {
                    expect(detailFields[10].key).to.equal('Subjects');
                    expect(detailFields[10].labelText).to.equal('Subjects');
                    expect(detailFields[10].parse).to.equal(true);
                    expect(detailFields[10].filter).to.equal(true);
                    expect(detailFields[10].display).to.equal('list');
                });
                it('Defines the `Importance` field', function () {
                    expect(detailFields[11].key).to.equal('Importance');
                    expect(detailFields[11].labelText).to.equal('Importance');
                });
                it('Defines the `StatementOfSignificance` field', function () {
                    expect(detailFields[12].key).to.equal('StatementOfSignificance');
                    expect(detailFields[12].labelText).to.equal('Statement of Significance');
                });
                it('Defines the `Classification` field', function () {
                    expect(detailFields[13].key).to.equal('Classification');
                    expect(detailFields[13].labelText).to.equal('Classification');
                    expect(detailFields[13].parse).to.equal(true);
                    expect(detailFields[13].skipNested).to.equal(1);
                    expect(detailFields[13].filter).to.equal(true);
                    expect(detailFields[13].display).to.equal('hierarchy-list');
                });
            });
        }
    );
}());
