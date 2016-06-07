(function () {
    'use strict';

    define(
        [
            'chai',
            'config/collections/photographs/detailFields'
        ],
        function (chai, detailFields) {
            var expect = chai.expect;

            describe('The `photographs/detailFields` module', function () {
                it('Defines a static array', function () {
                    expect(detailFields).to.be.an('array');
                    expect(detailFields).to.have.length(12);
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
                it('Defines the `Creator` field', function () {
                    expect(detailFields[2].key).to.equal('Creator');
                    expect(detailFields[2].labelText).to.equal('Creator');
                    expect(detailFields[2].parse).to.equal(true);
                    expect(detailFields[2].filter).to.equal('Value');
                    expect(detailFields[2].display).to.equal('typed-list');
                });
                it('Defines the `DateOfCreation` field', function () {
                    expect(detailFields[3].key).to.equal('DateOfCreation');
                    expect(detailFields[3].labelText).to.equal('Date of Creation');
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
                it('Defines the `Medium` field', function () {
                    expect(detailFields[7].key).to.equal('Medium');
                    expect(detailFields[7].labelText).to.equal('Medium');
                });
                it('Defines the `PhysicalDescription` field', function () {
                    expect(detailFields[8].key).to.equal('PhysicalDescription');
                    expect(detailFields[8].labelText).to.equal('Physical Description');
                });
                it('Defines the `Subjects` field', function () {
                    expect(detailFields[9].key).to.equal('Subjects');
                    expect(detailFields[9].labelText).to.equal('Subjects');
                    expect(detailFields[9].parse).to.equal(true);
                    expect(detailFields[9].filter).to.equal(true);
                    expect(detailFields[9].display).to.equal('list');
                });
                it('Defines the `Summary` field', function () {
                    expect(detailFields[10].key).to.equal('Summary');
                    expect(detailFields[10].labelText).to.equal('Summary');
                });
                it('Defines the `Notes` field', function () {
                    expect(detailFields[11].key).to.equal('Notes');
                    expect(detailFields[11].labelText).to.equal('Notes');
                });
            });
        }
    );
}());
