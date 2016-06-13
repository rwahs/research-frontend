(function () {
    'use strict';

    define(
        [
            'chai',
            'config/collections/photographs/searchResultFields'
        ],
        function (chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `photographs/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(10);
                });
                it('Defines the `idno` field', function () {
                    expect(searchResultFields[0].key).to.equal('idno');
                    expect(searchResultFields[0].labelText).to.equal('Accession Number');
                });
                it('Defines the `Title` field', function () {
                    expect(searchResultFields[1].key).to.equal('Title');
                    expect(searchResultFields[1].labelText).to.equal('Title');
                });
                it('Defines the `Creator` field', function () {
                    expect(searchResultFields[2].key).to.equal('Creator');
                    expect(searchResultFields[2].labelText).to.equal('Creator');
                    expect(searchResultFields[2].parse).to.equal(true);
                    expect(searchResultFields[2].filter).to.equal('Value');
                    expect(searchResultFields[2].display).to.equal('typed-list');
                });
                it('Defines the `DateOfCreation` field', function () {
                    expect(searchResultFields[3].key).to.equal('DateOfCreation');
                    expect(searchResultFields[3].labelText).to.equal('Date of Creation');
                });
                it('Defines the `Publisher` field', function () {
                    expect(searchResultFields[4].key).to.equal('Publisher');
                    expect(searchResultFields[4].labelText).to.equal('Publisher');
                });
                it('Defines the `DateOfPublication` field', function () {
                    expect(searchResultFields[5].key).to.equal('DateOfPublication');
                    expect(searchResultFields[5].labelText).to.equal('Date of Publication');
                });
                it('Defines the `PlaceOfPublication` field', function () {
                    expect(searchResultFields[6].key).to.equal('PlaceOfPublication');
                    expect(searchResultFields[6].labelText).to.equal('Place of Publication');
                });
                it('Defines the `Medium` field', function () {
                    expect(searchResultFields[7].key).to.equal('Medium');
                    expect(searchResultFields[7].labelText).to.equal('Medium');
                });
                it('Defines the `Subjects` field', function () {
                    expect(searchResultFields[8].key).to.equal('Subjects');
                    expect(searchResultFields[8].labelText).to.equal('Subjects');
                    expect(searchResultFields[8].parse).to.equal(true);
                    expect(searchResultFields[8].filter).to.equal(true);
                    expect(searchResultFields[8].display).to.equal('list');
                });
                it('Defines the `Media` field', function () {
                    expect(searchResultFields[9].key).to.equal('Media');
                    expect(searchResultFields[9].labelText).to.equal('Image');
                    expect(searchResultFields[9].display).to.equal('image');
                    expect(searchResultFields[9].placeholder).to.equal('(No image available)');
                });
            });
        }
    );
}());
