(function () {
    'use strict';

    define(
        [
            'chai',
            'config/collections/library/detailFields'
        ],
        function (chai, detailFields) {
            var expect = chai.expect;

            describe('The `library/detailFields` module', function () {
                it('Defines a static array', function () {
                    expect(detailFields).to.be.an('array');
                    expect(detailFields).to.have.length(16);
                });
                it('Defines the `idno` field', function () {
                    expect(detailFields[0].key).to.equal('idno');
                    expect(detailFields[0].labelText).to.equal('Accession Number');
                });
                it('Defines the `Title` field', function () {
                    expect(detailFields[1].key).to.equal('Title');
                    expect(detailFields[1].labelText).to.equal('Title');
                    expect(detailFields[1].placeholder).to.equal('(untitled)');
                });
                it('Defines the `Author` field', function () {
                    expect(detailFields[2].key).to.equal('Author');
                    expect(detailFields[2].labelText).to.equal('Author');
                    expect(detailFields[2].parse).to.equal(true);
                    expect(detailFields[2].filter).to.equal(true);
                    expect(detailFields[2].display).to.equal('list');
                });
                it('Defines the `PublicationType` field', function () {
                    expect(detailFields[3].key).to.equal('PublicationType');
                    expect(detailFields[3].labelText).to.equal('Type');
                });
                it('Defines the `Publisher` field', function () {
                    expect(detailFields[4].key).to.equal('Publisher');
                    expect(detailFields[4].labelText).to.equal('Publisher');
                });
                it('Defines the `DateOfPublication` field', function () {
                    expect(detailFields[5].key).to.equal('DateOfPublication');
                    expect(detailFields[5].labelText).to.equal('Date of Publication');
                });
                it('Defines the `PlaceOfPublication` field', function () {
                    expect(detailFields[6].key).to.equal('PlaceOfPublication');
                    expect(detailFields[6].labelText).to.equal('Place of Publication');
                });
                it('Defines the `Edition` field', function () {
                    expect(detailFields[7].key).to.equal('Edition');
                    expect(detailFields[7].labelText).to.equal('Edition');
                });
                it('Defines the `Size` field', function () {
                    expect(detailFields[8].key).to.equal('Size');
                    expect(detailFields[8].labelText).to.equal('Size');
                });
                it('Defines the `Series` field', function () {
                    expect(detailFields[9].key).to.equal('Series');
                    expect(detailFields[9].labelText).to.equal('Series');
                });
                it('Defines the `Subjects` field', function () {
                    expect(detailFields[10].key).to.equal('Subjects');
                    expect(detailFields[10].labelText).to.equal('Subjects');
                    expect(detailFields[10].parse).to.equal(true);
                    expect(detailFields[10].filter).to.equal(true);
                    expect(detailFields[10].display).to.equal('list');
                });
                it('Defines the `Collation` field', function () {
                    expect(detailFields[11].key).to.equal('Collation');
                    expect(detailFields[11].labelText).to.equal('Collation');
                });
                it('Defines the `ISBNISSN` field', function () {
                    expect(detailFields[12].key).to.equal('ISBNISSN');
                    expect(detailFields[12].labelText).to.equal('ISBN / ISSN');
                });
                it('Defines the `LibraryNumber` field', function () {
                    expect(detailFields[13].key).to.equal('LibraryNumber');
                    expect(detailFields[13].labelText).to.equal('Library Number');
                });
                it('Defines the `Donated` field', function () {
                    expect(detailFields[14].key).to.equal('Donated');
                    expect(detailFields[14].labelText).to.equal('Donated');
                });
                it('Defines the `Purchased` field', function () {
                    expect(detailFields[15].key).to.equal('Purchased');
                    expect(detailFields[15].labelText).to.equal('Purchased');
                });
            });
        }
    );
}());
