(function () {
    'use strict';

    define(
        [
            'chai',
            'util/container',
            'config/types'
        ],
        function (chai, container, types) {
            var expect = chai.expect;

            describe('The `types` configuration module', function () {
                it('Defines a function', function () {
                    expect(types).to.be.a('function');
                });
                describe('When invoked', function () {
                    beforeEach(function () {
                        types();
                        container.seal();
                    });
                    it('Registers the types object', function () {
                        expect(container.isRegistered('types')).to.equal(true);
                    });
                    it('Registers the correct mappings', function () {
                        var typeMap = container.resolve('types');
                        expect(typeMap['Library Record']).to.equal('library');
                        expect(typeMap['Photograph']).to.equal('photographs');
                        expect(typeMap['Public Memorial']).to.equal('memorials');
                        expect(typeMap['Museum Record']).to.equal('museum');
                        expect(typeMap['Museum Artefact']).to.equal('museum');
                        expect(typeMap['Costume']).to.equal('museum');
                        expect(typeMap['Artwork']).to.equal('museum');
                    });
                    afterEach(function () {
                        container.reset();
                    });
                });
            });
        }
    );
}());
