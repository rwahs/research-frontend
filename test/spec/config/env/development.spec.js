(function () {
    'use strict';

    define(
        [
            'chai',
            'util/container',
            'config/env/development'
        ],
        function (chai, container, configure) {
            var expect = chai.expect;

            describe('The `config/env/development` module', function () {
                it('Defines a function', function () {
                    expect(configure).to.be.a('function');
                });
                describe('When invoked', function () {
                    beforeEach(function () {
                        configure();
                    });
                    it('Registers search services', function () {
                        expect(container.isRegistered('search.all')).to.equal(true);
                        expect(container.isRegistered('search.library')).to.equal(true);
                        expect(container.isRegistered('search.photographs')).to.equal(true);
                        expect(container.isRegistered('search.museum')).to.equal(true);
                        expect(container.isRegistered('search.memorials')).to.equal(true);
                    });
                    it('Registers detail services', function () {
                        expect(container.isRegistered('detail.library')).to.equal(true);
                        expect(container.isRegistered('detail.photographs')).to.equal(true);
                        expect(container.isRegistered('detail.museum')).to.equal(true);
                        expect(container.isRegistered('detail.memorials')).to.equal(true);
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
