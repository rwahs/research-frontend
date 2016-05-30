(function () {
    'use strict';

    define(
        [
            'chai',
            'util/container',
            'config/env/development'
        ],
        function (chai, container, development) {
            var expect = chai.expect;

            describe('The `config/env/development` module', function () {
                it('Defines a function', function () {
                    expect(development).to.be.a('function');
                });
                describe('When invoked', function () {
                    beforeEach(function () {
                        development();
                    });
                    it('Registers search services', function () {
                        expect(container.isRegistered('LibrarySearchService')).to.equal(true);
                        expect(container.isRegistered('PhotographsSearchService')).to.equal(true);
                        expect(container.isRegistered('MuseumSearchService')).to.equal(true);
                        expect(container.isRegistered('MemorialsSearchService')).to.equal(true);
                    });
                    it('Seals the container', function () {
                        expect(container.isSealed()).to.equal(true);
                    });
                    afterEach(function () {
                        container.reset();
                    });
                });
            });
        }
    );
}());
