(function () {
    'use strict';

    define(
        [
            'jquery',
            'chai',
            'sinon',
            'services/cachingService'
        ],
        function ($, chai, sinon, cachingService) {
            var expect = chai.expect;

            describe('The `cachingService` module', function () {
                it('Defines a function', function () {
                    expect(cachingService).to.be.a('function');
                });
                describe('When invoked with valid parameters', function () {
                    var wrappedService, service;
                    beforeEach(function () {
                        wrappedService = sinon.stub().yields(null, [ 'first result', 'second result', 'third result' ]);
                        service = cachingService(wrappedService, 100); // 0.1 second to keep tests running fast
                    });
                    it('Returns a function', function () {
                        expect(service).to.be.a('function');
                    });
                    describe('When invoked', function () {
                        beforeEach(function (done) {
                            service('key', done);
                        });
                        it('Calls the wrapped service', function () {
                            sinon.assert.calledOnce(wrappedService);
                            sinon.assert.calledWith(wrappedService, 'key');
                        });
                        describe('When invoked again immediately, with the same parameter', function () {
                            beforeEach(function (done) {
                                service('key', done);
                            });
                            it('Does not call the wrapped service again', function () {
                                sinon.assert.calledOnce(wrappedService);
                            });
                        });
                        describe('When invoked again before the default TTL elapses, with the same parameter', function () {
                            beforeEach(function (done) {
                                setTimeout(function () {
                                    service('key', done);
                                }, 50); // 0.05 second, half the TTL
                            });
                            it('Does not call the wrapped service again', function () {
                                sinon.assert.calledOnce(wrappedService);
                            });
                            describe('When invoked again after the TTL elapses, with the same parameter', function () {
                                beforeEach(function (done) {
                                    setTimeout(function () {
                                        service('key', done);
                                    }, 51); // Just a bit more than the other half of the TTL
                                });
                                it('Calls the wrapped service again', function () {
                                    sinon.assert.calledTwice(wrappedService);
                                });
                            });
                        });
                        describe('When invoked again immediately, with a different parameter', function () {
                            beforeEach(function (done) {
                                service('key-2', done);
                            });
                            it('Calls the wrapped service again with the different parameter', function () {
                                sinon.assert.calledTwice(wrappedService);
                                sinon.assert.calledWith(wrappedService, 'key-2');
                            });
                        });
                    });
                });
            });
        }
    );
}());
