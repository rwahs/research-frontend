(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/memorials/searchResultFields'
        ],
        function (_, chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `memorials/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(7);
                });
                it('Defines the `MediaThumbnail` field', function () {
                    var mediaField = _.find(searchResultFields, { key: 'MediaThumbnail' });
                    expect(mediaField.labelText).to.equal('Image');
                    expect(mediaField.display).to.equal('image');
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
                it('Defines the `ItemName` field', function () {
                    var itemNameField = _.find(searchResultFields, { key: 'ItemName' });
                    expect(itemNameField.labelText).to.equal('Item Name');
                    expect(itemNameField.sort).to.equal(true);
                });
                it('Defines the `Creator` field', function () {
                    var creatorField = _.find(searchResultFields, { key: 'Creator' });
                    expect(creatorField.labelText).to.equal('Creator');
                    expect(creatorField.parse).to.equal(true);
                    expect(creatorField.filter).to.equal('Value');
                    expect(creatorField.display).to.equal('typed-list');
                    expect(_.isFunction(creatorField.sort)).to.equal(true);
                });
                it('Defines the `ErectedBy` field', function () {
                    var erectedByField = _.find(searchResultFields, { key: 'ErectedBy' });
                    expect(erectedByField.labelText).to.equal('Erected By');
                    expect(erectedByField.sort).to.equal(true);
                });
                it('Defines the `Location` field', function () {
                    var locationField = _.find(searchResultFields, { key: 'Location' });
                    expect(locationField.labelText).to.equal('Location');
                    expect(locationField.parse).to.equal(true);
                    expect(locationField.skip).to.equal(1);
                    expect(locationField.filter).to.equal(true);
                    expect(locationField.display).to.equal('hierarchy');
                    expect(_.isFunction(locationField.sort)).to.equal(true);
                });
            });
        }
    );
}());
