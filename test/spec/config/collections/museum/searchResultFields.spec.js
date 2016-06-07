(function () {
    'use strict';

    define(
        [
            'chai',
            'config/collections/museum/searchResultFields'
        ],
        function (chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `museum/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(7);
                });
                it('Defines the `type` field', function () {
                    expect(searchResultFields[0].key).to.equal('type');
                    expect(searchResultFields[0].labelText).to.equal('Item Type');
                });
                it('Defines the `idno` field', function () {
                    expect(searchResultFields[1].key).to.equal('idno');
                    expect(searchResultFields[1].labelText).to.equal('Accession Number');
                });
                it('Defines the `ItemName` field', function () {
                    expect(searchResultFields[2].key).to.equal('ItemName');
                    expect(searchResultFields[2].labelText).to.equal('Item Name');
                });
                it('Defines the `Dates` field', function () {
                    expect(searchResultFields[3].key).to.equal('Dates');
                    expect(searchResultFields[3].labelText).to.equal('Dates');
                });
                it('Defines the `Importance` field', function () {
                    expect(searchResultFields[4].key).to.equal('Importance');
                    expect(searchResultFields[4].labelText).to.equal('Importance');
                });
                it('Defines the `Subjects` field', function () {
                    expect(searchResultFields[5].key).to.equal('Subjects');
                    expect(searchResultFields[5].labelText).to.equal('Subjects');
                    expect(searchResultFields[5].parse).to.equal(true);
                    expect(searchResultFields[5].filter).to.equal(true);
                    expect(searchResultFields[5].display).to.equal('list');
                });
                it('Defines the `Classification` field', function () {
                    expect(searchResultFields[6].key).to.equal('Classification');
                    expect(searchResultFields[6].labelText).to.equal('Classification');
                    expect(searchResultFields[6].parse).to.equal(true);
                    expect(searchResultFields[6].skipNested).to.equal(1);
                    expect(searchResultFields[6].filter).to.equal(true);
                    expect(searchResultFields[6].display).to.equal('hierarchy-list');
                });
            });
        }
    );
}());
