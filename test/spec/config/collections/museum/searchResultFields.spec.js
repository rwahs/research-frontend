(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/museum/searchResultFields'
        ],
        function (_, chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `museum/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(8);
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
                it('Defines the `type` field', function () {
                    var idnoField = _.find(searchResultFields, { key: 'type' });
                    expect(idnoField.labelText).to.equal('Item Type');
                });
                it('Defines the `idno` field', function () {
                    var idnoField = _.find(searchResultFields, { key: 'idno' });
                    expect(idnoField.labelText).to.equal('Accession Number');
                });
                it('Defines the `ItemName` field', function () {
                    var itemNameField = _.find(searchResultFields, { key: 'ItemName' });
                    expect(itemNameField.labelText).to.equal('Item Name');
                });
                it('Defines the `Dates` field', function () {
                    var datesField = _.find(searchResultFields, { key: 'Dates' });
                    expect(datesField.labelText).to.equal('Dates');
                });
                it('Defines the `Importance` field', function () {
                    var importanceField = _.find(searchResultFields, { key: 'Importance' });
                    expect(importanceField.labelText).to.equal('Importance');
                });
                it('Defines the `Classification` field', function () {
                    var classificationField = _.find(searchResultFields, { key: 'Classification' });
                    expect(classificationField.labelText).to.equal('Classification');
                    expect(classificationField.parse).to.equal(true);
                    expect(classificationField.skipNested).to.equal(1);
                    expect(classificationField.filter).to.equal(true);
                    expect(classificationField.display).to.equal('hierarchy-list');
                });
            });
        }
    );
}());
