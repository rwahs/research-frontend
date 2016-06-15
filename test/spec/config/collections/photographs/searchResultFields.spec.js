(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/photographs/searchResultFields'
        ],
        function (_, chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `photographs/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(10);
                });
                it('Defines the `MediaThumbnail` field', function () {
                    var mediaField = _.find(searchResultFields, { key: 'MediaThumbnail' });
                    expect(mediaField.labelText).to.equal('Image');
                    expect(mediaField.display).to.equal('image');
                    expect(mediaField.placeholder).to.equal('(No image available)');
                });
                it('Defines the `MediaSmall` field', function () {
                    var mediaField = _.find(searchResultFields, { key: 'MediaSmall' });
                    expect(mediaField.display).to.equal('image');
                    expect(mediaField.tableColumn).to.equal(false);
                });
                it('Defines the `idno` field', function () {
                    var idnoField = _.find(searchResultFields, { key: 'idno' });
                    expect(idnoField.labelText).to.equal('Accession Number');
                    expect(idnoField.sort).to.equal(true);
                });
                it('Defines the `Title` field', function () {
                    var titleField = _.find(searchResultFields, { key: 'Title' });
                    expect(titleField.labelText).to.equal('Title');
                    expect(titleField.sort).to.equal(true);
                });
                it('Defines the `Creator` field', function () {
                    var creatorField = _.find(searchResultFields, { key: 'Creator' });
                    expect(creatorField.labelText).to.equal('Creator');
                    expect(creatorField.parse).to.equal(true);
                    expect(creatorField.filter).to.equal('Value');
                    expect(creatorField.display).to.equal('typed-list');
                    expect(_.isFunction(creatorField.sort)).to.equal(true);
                });
                it('Defines the `DateOfCreation` field', function () {
                    var dateOfCreationField = _.find(searchResultFields, { key: 'DateOfCreation' });
                    expect(dateOfCreationField.labelText).to.equal('Date of Creation');
                    expect(dateOfCreationField.sort).to.equal(true);
                });
                it('Defines the `Publisher` field', function () {
                    var publisherField = _.find(searchResultFields, { key: 'Publisher' });
                    expect(publisherField.labelText).to.equal('Publisher');
                    expect(publisherField.sort).to.equal(true);
                });
                it('Defines the `DateOfPublication` field', function () {
                    var dateOfPublicationField = _.find(searchResultFields, { key: 'DateOfPublication' });
                    expect(dateOfPublicationField.labelText).to.equal('Date of Publication');
                    expect(dateOfPublicationField.sort).to.equal(true);
                });
                it('Defines the `PlaceOfPublication` field', function () {
                    var placeOfPublicationField = _.find(searchResultFields, { key: 'PlaceOfPublication' });
                    expect(placeOfPublicationField.labelText).to.equal('Place of Publication');
                    expect(placeOfPublicationField.sort).to.equal(true);
                });
                it('Defines the `Medium` field', function () {
                    var mediumField = _.find(searchResultFields, { key: 'Medium' });
                    expect(mediumField.labelText).to.equal('Medium');
                    expect(mediumField.sort).to.equal(true);
                });
            });
        }
    );
}());
