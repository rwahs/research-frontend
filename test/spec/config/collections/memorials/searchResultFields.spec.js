(function () {
    'use strict';

    define(
        [
            'chai',
            'config/collections/memorials/searchResultFields'
        ],
        function (chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `memorials/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(6);
                });
                it('Defines the `idno` field', function () {
                    expect(searchResultFields[0].key).to.equal('idno');
                    expect(searchResultFields[0].labelText).to.equal('Accession Number');
                });
                it('Defines the `ItemName` field', function () {
                    expect(searchResultFields[1].key).to.equal('ItemName');
                    expect(searchResultFields[1].labelText).to.equal('Item Name');
                });
                it('Defines the `Creator` field', function () {
                    expect(searchResultFields[2].key).to.equal('Creator');
                    expect(searchResultFields[2].labelText).to.equal('Creator');
                    expect(searchResultFields[2].parse).to.equal(true);
                    expect(searchResultFields[2].filter).to.equal('Value');
                    expect(searchResultFields[2].display).to.equal('typed-list');
                });
                it('Defines the `ErectedBy` field', function () {
                    expect(searchResultFields[3].key).to.equal('ErectedBy');
                    expect(searchResultFields[3].labelText).to.equal('Erected By');
                });
                it('Defines the `Location` field', function () {
                    expect(searchResultFields[4].key).to.equal('Location');
                    expect(searchResultFields[4].labelText).to.equal('Location');
                    expect(searchResultFields[4].parse).to.equal(true);
                    expect(searchResultFields[4].skip).to.equal(1);
                    expect(searchResultFields[4].filter).to.equal(true);
                    expect(searchResultFields[4].display).to.equal('hierarchy');
                });
                it('Defines the `Subjects` field', function () {
                    expect(searchResultFields[5].key).to.equal('Subjects');
                    expect(searchResultFields[5].labelText).to.equal('Subjects');
                    expect(searchResultFields[5].parse).to.equal(true);
                    expect(searchResultFields[5].filter).to.equal(true);
                    expect(searchResultFields[5].display).to.equal('list');
                });
            });
        }
    );
}());
