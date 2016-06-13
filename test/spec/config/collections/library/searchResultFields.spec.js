(function () {
    'use strict';

    define(
        [
            'chai',
            'config/collections/library/searchResultFields'
        ],
        function (chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `library/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(8);
                });
                it('Defines the `Media` field', function () {
                    expect(searchResultFields[0].key).to.equal('Media');
                    expect(searchResultFields[0].labelText).to.equal('Image');
                    expect(searchResultFields[0].display).to.equal('image');
                    expect(searchResultFields[0].placeholder).to.equal('(No image available)');
                });
                it('Defines the `Title` field', function () {
                    expect(searchResultFields[1].key).to.equal('Title');
                    expect(searchResultFields[1].labelText).to.equal('Title');
                });
                it('Defines the `Author` field', function () {
                    expect(searchResultFields[2].key).to.equal('Author');
                    expect(searchResultFields[2].labelText).to.equal('Author');
                    expect(searchResultFields[2].parse).to.equal(true);
                    expect(searchResultFields[2].filter).to.equal(true);
                    expect(searchResultFields[2].display).to.equal('list');
                });
                it('Defines the `Publisher` field', function () {
                    expect(searchResultFields[3].key).to.equal('Publisher');
                    expect(searchResultFields[3].labelText).to.equal('Publisher');
                });
                it('Defines the `DateOfPublication` field', function () {
                    expect(searchResultFields[4].key).to.equal('DateOfPublication');
                    expect(searchResultFields[4].labelText).to.equal('Date of Publication');
                });
                it('Defines the `PlaceOfPublication` field', function () {
                    expect(searchResultFields[5].key).to.equal('PlaceOfPublication');
                    expect(searchResultFields[5].labelText).to.equal('Place of Publication');
                });
                it('Defines the `PublicationType` field', function () {
                    expect(searchResultFields[6].key).to.equal('PublicationType');
                    expect(searchResultFields[6].labelText).to.equal('Type');
                });
                it('Defines the `Subjects` field', function () {
                    expect(searchResultFields[7].key).to.equal('Subjects');
                    expect(searchResultFields[7].labelText).to.equal('Subjects');
                    expect(searchResultFields[7].parse).to.equal(true);
                    expect(searchResultFields[7].filter).to.equal(true);
                    expect(searchResultFields[7].display).to.equal('list');
                });
            });
        }
    );
}());
