(function () {
    'use strict';

    define(
        [
            'chai',
            'config/search/memorials/resultFields'
        ],
        function (chai, resultFields) {
            var expect = chai.expect;

            describe('The `memorials/resultFields` module', function () {
                it('Defines a static array', function () {
                    expect(resultFields).to.be.an('array');
                    expect(resultFields).to.have.length(6);
                });
                it('Defines the `idno` field', function () {
                    expect(resultFields[0].key).to.equal('idno');
                    expect(resultFields[0].labelText).to.equal('Accession Number');
                });
                it('Defines the `ItemName` field', function () {
                    expect(resultFields[1].key).to.equal('ItemName');
                    expect(resultFields[1].labelText).to.equal('Item Name');
                });
                it('Defines the `Creator` field', function () {
                    expect(resultFields[2].key).to.equal('Creator');
                    expect(resultFields[2].labelText).to.equal('Creator');
                    expect(resultFields[2].displayValue).to.be.a('function');
                });
                it('Defines the `Location` field', function () {
                    expect(resultFields[3].key).to.equal('Location');
                    expect(resultFields[3].labelText).to.equal('Location');
                    expect(resultFields[3].displayValue).to.be.a('function');
                });
                it('Defines the `ErectedBy` field', function () {
                    expect(resultFields[4].key).to.equal('ErectedBy');
                    expect(resultFields[4].labelText).to.equal('Erected By');
                });
                it('Defines the `Subjects` field', function () {
                    expect(resultFields[5].key).to.equal('Subjects');
                    expect(resultFields[5].labelText).to.equal('Subjects');
                    expect(resultFields[5].displayValue).to.be.a('function');
                });
            });
        }
    );
}());
