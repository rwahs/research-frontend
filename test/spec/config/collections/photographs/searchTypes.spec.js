(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/photographs/searchTypes'
        ],
        function (_, chai, searchTypes) {
            var expect = chai.expect;

            describe('The `photographs/searchTypes` module', function () {
                it('Defines a static array', function () {
                    expect(searchTypes).to.be.an('array');
                    expect(searchTypes).to.have.length(4);
                });
                it('Defines the `Keyword` field', function () {
                    var searchType = _.find(searchTypes, { key: '_fulltext' });
                    expect(searchType.labelText).to.equal('Keyword');
                    expect(searchType.glyphicon).to.equal('search');
                });
                it('Defines the `Creator` field', function () {
                    var searchType = _.find(searchTypes, { key: 'ca_objects.Creator.CreatorName' });
                    expect(searchType.labelText).to.equal('Creator');
                    expect(searchType.glyphicon).to.equal('user');
                });
                it('Defines the `Title` field', function () {
                    var searchType = _.find(searchTypes, { key: 'ca_objects.preferred_labels' });
                    expect(searchType.labelText).to.equal('Title');
                    expect(searchType.glyphicon).to.equal('certificate');
                });
                it('Defines the `Subject` field', function () {
                    var searchType = _.find(searchTypes, { key: 'ca_occurrences.preferred_labels' });
                    expect(searchType.labelText).to.equal('Subject');
                    expect(searchType.glyphicon).to.equal('paperclip');
                });
            });
        }
    );
}());
