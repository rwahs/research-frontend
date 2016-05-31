(function () {
    'use strict';

    define(
        [
            'chai',
            'config/search/museum/resultFields'
        ],
        function (chai, resultFields) {
            var expect = chai.expect;

            describe('The `museum/resultFields` module', function () {
                it('Defines a static array', function () {
                    expect(resultFields).to.be.an('array');
                    expect(resultFields).to.have.length(7);
                });
                it('Defines the `type` field', function () {
                    expect(resultFields[0].key).to.equal('type');
                    expect(resultFields[0].labelText).to.equal('Item Type');
                });
                it('Defines the `idno` field', function () {
                    expect(resultFields[1].key).to.equal('idno');
                    expect(resultFields[1].labelText).to.equal('Accession Number');
                });
                it('Defines the `ItemName` field', function () {
                    expect(resultFields[2].key).to.equal('ItemName');
                    expect(resultFields[2].labelText).to.equal('Item Name');
                });
                it('Defines the `Dates` field', function () {
                    expect(resultFields[3].key).to.equal('Dates');
                    expect(resultFields[3].labelText).to.equal('Dates');
                });
                it('Defines the `Importance` field', function () {
                    expect(resultFields[4].key).to.equal('Importance');
                    expect(resultFields[4].labelText).to.equal('Importance');
                });
                it('Defines the `Subjects` field', function () {
                    expect(resultFields[5].key).to.equal('Subjects');
                    expect(resultFields[5].labelText).to.equal('Subjects');
                    expect(resultFields[5].displayValue).to.be.a('function');
                });
                it('Defines the `Classification` field', function () {
                    expect(resultFields[6].key).to.equal('Classification');
                    expect(resultFields[6].labelText).to.equal('Classification');
                });
            });
        }
    );
}());
