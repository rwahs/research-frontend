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
                describe('When the wrapped service is returning valid results', function () {
                    var wrappedService;
                    beforeEach(function () {
                        wrappedService = sinon.spy(function (key, callback) {
                            callback(null, [ key + '-result-1', key + '-result-2', key + '-result-3' ]);
                        });
                    });
                    describe('When invoked with valid parameters', function () {
                        var service;
                        beforeEach(function () {
                            service = cachingService(wrappedService, { ttl: 100 }); // 0.1 second to keep tests running fast
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When invoked', function () {
                            var err, result;
                            beforeEach(function (done) {
                                service('key-1', function (e, r) {
                                    err = e;
                                    result = r;
                                    done();
                                });
                            });
                            it('Calls the wrapped service', function () {
                                sinon.assert.calledOnce(wrappedService);
                                sinon.assert.calledWith(wrappedService, 'key-1');
                            });
                            it('Returns result from the wrapped service', function () {
                                expect(err).to.equal(null);
                                expect(result).to.deep.equal([ 'key-1-result-1', 'key-1-result-2', 'key-1-result-3' ]);
                            });
                            describe('When invoked again immediately, with the same parameter', function () {
                                beforeEach(function (done) {
                                    service('key-1', function (e, r) {
                                        err = e;
                                        result = r;
                                        done();
                                    });
                                });
                                it('Does not call the wrapped service again', function () {
                                    sinon.assert.calledOnce(wrappedService);
                                });
                                it('Returns result from the wrapped service', function () {
                                    expect(err).to.equal(null);
                                    expect(result).to.deep.equal([ 'key-1-result-1', 'key-1-result-2', 'key-1-result-3' ]);
                                });
                            });
                            describe('When invoked again before the default TTL elapses, with the same parameter', function () {
                                beforeEach(function (done) {
                                    setTimeout(function () {
                                        service('key-1', function (e, r) {
                                            err = e;
                                            result = r;
                                            done();
                                        });
                                    }, 50); // 0.05 second, half the TTL
                                });
                                it('Does not call the wrapped service again', function () {
                                    sinon.assert.calledOnce(wrappedService);
                                });
                                it('Returns result from the wrapped service', function () {
                                    expect(err).to.equal(null);
                                    expect(result).to.deep.equal([ 'key-1-result-1', 'key-1-result-2', 'key-1-result-3' ]);
                                });
                                describe('When invoked again after the TTL elapses, with the same parameter', function () {
                                    beforeEach(function (done) {
                                        setTimeout(function () {
                                            service('key-1', function (e, r) {
                                                err = e;
                                                result = r;
                                                done();
                                            });
                                        }, 51); // Just a bit more than the other half of the TTL
                                    });
                                    it('Calls the wrapped service again', function () {
                                        sinon.assert.calledTwice(wrappedService);
                                    });
                                    it('Returns result from the wrapped service', function () {
                                        expect(err).to.equal(null);
                                        expect(result).to.deep.equal([ 'key-1-result-1', 'key-1-result-2', 'key-1-result-3' ]);
                                    });
                                    describe('When invoked again immediately, with a different parameter', function () {
                                        beforeEach(function (done) {
                                            service('key-2', function (e, r) {
                                                err = e;
                                                result = r;
                                                done();
                                            });
                                        });
                                        it('Calls the wrapped service again with the different parameter', function () {
                                            sinon.assert.calledThrice(wrappedService);
                                            sinon.assert.calledWith(wrappedService, 'key-2');
                                        });
                                        it('Returns result from the wrapped service', function () {
                                            expect(err).to.equal(null);
                                            expect(result).to.deep.equal([ 'key-2-result-1', 'key-2-result-2', 'key-2-result-3' ]);
                                        });
                                    });
                                });
                                describe('When invoked again immediately, with a different parameter', function () {
                                    beforeEach(function (done) {
                                        service('key-2', function (e, r) {
                                            err = e;
                                            result = r;
                                            done();
                                        });
                                    });
                                    it('Calls the wrapped service again with the different parameter', function () {
                                        sinon.assert.calledTwice(wrappedService);
                                        sinon.assert.calledWith(wrappedService, 'key-2');
                                    });
                                    it('Returns result from the wrapped service', function () {
                                        expect(err).to.equal(null);
                                        expect(result).to.deep.equal([ 'key-2-result-1', 'key-2-result-2', 'key-2-result-3' ]);
                                    });
                                });
                            });
                            describe('When invoked again immediately, with a different parameter', function () {
                                beforeEach(function (done) {
                                    service('key-2', function (e, r) {
                                        err = e;
                                        result = r;
                                        done();
                                    });
                                });
                                it('Calls the wrapped service again with the different parameter', function () {
                                    sinon.assert.calledTwice(wrappedService);
                                    sinon.assert.calledWith(wrappedService, 'key-2');
                                });
                                it('Returns result from the wrapped service', function () {
                                    expect(err).to.equal(null);
                                    expect(result).to.deep.equal([ 'key-2-result-1', 'key-2-result-2', 'key-2-result-3' ]);
                                });
                            });
                        });
                    });
                });
                describe('When the wrapped service is returning errors', function () {
                    var wrappedService;
                    beforeEach(function () {
                        wrappedService = sinon.spy(function (key, callback) {
                            callback('Error from wrapped service');
                        });
                    });
                    describe('When invoked with valid parameters', function () {
                        var service;
                        beforeEach(function () {
                            service = cachingService(wrappedService);
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When invoked', function () {
                            var err, result;
                            beforeEach(function (done) {
                                service('key-1', function (e, r) {
                                    err = e;
                                    result = r;
                                    done();
                                });
                            });
                            it('Calls the wrapped service', function () {
                                sinon.assert.calledOnce(wrappedService);
                                sinon.assert.calledWith(wrappedService, 'key-1');
                            });
                            it('Returns error from the wrapped service', function () {
                                expect(err).to.equal('Error from wrapped service');
                                expect(result).to.equal(undefined);
                            });
                            describe('When invoked again', function () {
                                var err, result;
                                beforeEach(function (done) {
                                    service('key-1', function (e, r) {
                                        err = e;
                                        result = r;
                                        done();
                                    });
                                });
                                it('Calls the wrapped service again', function () {
                                    sinon.assert.calledTwice(wrappedService);
                                    sinon.assert.calledWith(wrappedService, 'key-1');
                                });
                                it('Returns error from the wrapped service', function () {
                                    expect(err).to.equal('Error from wrapped service');
                                    expect(result).to.equal(undefined);
                                });
                            });
                        });
                    });
                });
            });
        }
    );
}());
