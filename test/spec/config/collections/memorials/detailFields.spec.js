(function () {
    'use strict';

    define(
        [
            'chai',
            'config/collections/memorials/detailFields'
        ],
        function (chai, detailFields) {
            var expect = chai.expect;

            describe('The `memorials/detailFields` module', function () {
                it('Defines a static array', function () {
                    expect(detailFields).to.be.an('array');
                    expect(detailFields).to.have.length(12);
                });
                it('Defines the `idno` field', function () {
                    expect(detailFields[0].key).to.equal('idno');
                    expect(detailFields[0].labelText).to.equal('Accession Number');
                });
                it('Defines the `ItemName` field', function () {
                    expect(detailFields[1].key).to.equal('ItemName');
                    expect(detailFields[1].labelText).to.equal('Item Name');
                    expect(detailFields[1].placeholder).to.equal('(unnamed)');
                });
                it('Defines the `Description` field', function () {
                    expect(detailFields[2].key).to.equal('Description');
                    expect(detailFields[2].labelText).to.equal('Description');
                    expect(detailFields[2].display).to.equal('html');
                });
                it('Defines the `Inscription` field', function () {
                    expect(detailFields[3].key).to.equal('Inscription');
                    expect(detailFields[3].labelText).to.equal('Inscription');
                });
                it('Defines the `Creator` field', function () {
                    expect(detailFields[4].key).to.equal('Creator');
                    expect(detailFields[4].labelText).to.equal('Creator');
                    expect(detailFields[4].parse).to.equal(true);
                    expect(detailFields[4].filter).to.equal('Value');
                    expect(detailFields[4].display).to.equal('typed-list');
                });
                it('Defines the `ErectedBy` field', function () {
                    expect(detailFields[5].key).to.equal('ErectedBy');
                    expect(detailFields[5].labelText).to.equal('Erected By');
                });
                it('Defines the `Location` field', function () {
                    expect(detailFields[6].key).to.equal('Location');
                    expect(detailFields[6].labelText).to.equal('Location');
                    expect(detailFields[6].parse).to.equal(true);
                    expect(detailFields[6].skip).to.equal(1);
                    expect(detailFields[6].filter).to.equal(true);
                    expect(detailFields[6].display).to.equal('hierarchy');
                });
                it('Defines the `Dates` field', function () {
                    expect(detailFields[7].key).to.equal('Dates');
                    expect(detailFields[7].labelText).to.equal('Dates');
                });
                it('Defines the `Subjects` field', function () {
                    expect(detailFields[8].key).to.equal('Subjects');
                    expect(detailFields[8].labelText).to.equal('Subjects');
                    expect(detailFields[8].parse).to.equal(true);
                    expect(detailFields[8].filter).to.equal(true);
                    expect(detailFields[8].display).to.equal('list');
                });
                it('Defines the `Materials` field', function () {
                    expect(detailFields[9].key).to.equal('Materials');
                    expect(detailFields[9].labelText).to.equal('Materials');
                });
                it('Defines the `Dimensions` field', function () {
                    expect(detailFields[10].key).to.equal('Dimensions');
                    expect(detailFields[10].labelText).to.equal('Dimensions');
                    expect(detailFields[10].parse).to.equal(true);
                    expect(detailFields[10].filter).to.equal('Value');
                    expect(detailFields[10].display).to.equal('typed-list');
                });
                it('Defines the `Provenance` field', function () {
                    expect(detailFields[11].key).to.equal('Provenance');
                    expect(detailFields[11].labelText).to.equal('Provenance');
                });
            });
        }
    );
}());
