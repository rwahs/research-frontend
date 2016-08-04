(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/library/searchResultFields'
        ],
        function (_, chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `library/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(9);
                });
                it('Defines the `MediaThumbnail` field', function () {
                    var mediaField = _.find(searchResultFields, { key: 'MediaThumbnail' });
                    expect(mediaField.labelText).to.equal('Image');
                    expect(mediaField.display).to.equal('cover-image');
                });
                it('Defines the `MediaSmall` field', function () {
                    var mediaField = _.find(searchResultFields, { key: 'MediaSmall' });
                    expect(mediaField.display).to.equal('cover-image');
                    expect(mediaField.tableColumn).to.equal(false);
                });
                it('Defines the `type` field', function () {
                    var titleField = _.find(searchResultFields, { key: 'type' });
                    expect(titleField.labelText).to.equal('Item Type');
                    expect(titleField.sort).to.equal(true);
                });
                it('Defines the `Title` field', function () {
                    var titleField = _.find(searchResultFields, { key: 'Title' });
                    expect(titleField.labelText).to.equal('Title');
                    expect(titleField.sort).to.equal(true);
                });
                it('Defines the `Author` field', function () {
                    var authorField = _.find(searchResultFields, { key: 'Author' });
                    expect(authorField.labelText).to.equal('Author');
                    expect(authorField.parse).to.equal(true);
                    expect(authorField.filter).to.equal(true);
                    expect(authorField.display).to.equal('list');
                    expect(_.isFunction(authorField.sort)).to.equal(true);
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
                it('Defines the `PublicationType` field', function () {
                    var publicationTypeField = _.find(searchResultFields, { key: 'PublicationType' });
                    expect(publicationTypeField.labelText).to.equal('Publication Type');
                    expect(publicationTypeField.sort).to.equal(true);
                });
            });
        }
    );
}());
