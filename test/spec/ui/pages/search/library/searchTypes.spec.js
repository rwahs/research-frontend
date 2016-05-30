(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/pages/search/library/searchTypes'
        ],
        function (chai, searchTypes) {
            var expect = chai.expect;

            describe('The `library/searchTypes` module', function () {
                it('Defines a static array', function () {
                    expect(searchTypes).to.be.an('array');
                    expect(searchTypes).to.have.length(4);
                });
                it('Defines the `Title` field', function () {
                    expect(searchTypes[0].key).to.equal('_fulltext');
                    expect(searchTypes[0].labelText).to.equal('Keyword');
                    expect(searchTypes[0].glyphicon).to.equal('search');
                });
                it('Defines the `Author` field', function () {
                    expect(searchTypes[1].key).to.equal('ca_objects.Author');
                    expect(searchTypes[1].labelText).to.equal('Author');
                    expect(searchTypes[1].glyphicon).to.equal('user');
                });
                it('Defines the `Title` field', function () {
                    expect(searchTypes[2].key).to.equal('ca_objects.preferred_labels');
                    expect(searchTypes[2].labelText).to.equal('Title');
                    expect(searchTypes[2].glyphicon).to.equal('certificate');
                });
                it('Defines the `Subject` field', function () {
                    expect(searchTypes[3].key).to.equal('ca_occurrences');
                    expect(searchTypes[3].labelText).to.equal('Subject');
                    expect(searchTypes[3].glyphicon).to.equal('paperclip');
                });
            });
        }
    );
}());
