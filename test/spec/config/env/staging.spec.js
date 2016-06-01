(function () {
    'use strict';

    define(
        [
            'chai',
            'util/container',
            'config/env/staging'
        ],
        function (chai, container, configure) {
            var expect = chai.expect;

            describe('The `config/env/staging` module', function () {
                it('Defines a function', function () {
                    expect(configure).to.be.a('function');
                });
                describe('When invoked', function () {
                    beforeEach(function () {
                        configure();
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
