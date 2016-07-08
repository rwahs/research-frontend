(function () {
    'use strict';

    define(
        [
            'jquery',
            'chai',
            'sinon',
            'services/detailService'
        ],
        function ($, chai, sinon, detailService) {
            var expect = chai.expect;

            describe('The `detailService` module', function () {
                it('Defines a function', function () {
                    expect(detailService).to.be.a('function');
                });
                describe('When AJAX calls are working correctly', function () {
                    beforeEach(function () {
                        sinon.stub($, 'ajax', function (params) {
                            params.success({
                                ok: true,
                                id: 42,
                                name: 'The Meaning of Life',
                                field: 'value'
                            });
                        });
                    });
                    describe('When invoked with valid parameters and no options', function () {
                        var service;
                        beforeEach(function () {
                            service = detailService(
                                'http://server.name/path/to/api'
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When invoked with no parameters', function () {
                            var serviceError, serviceResult;
                            beforeEach(function (done) {
                                service(undefined, function (err, result) {
                                    serviceError = err;
                                    serviceResult = result;
                                    done();
                                });
                            });
                            it('Does not make an AJAX call', function () {
                                sinon.assert.notCalled($.ajax);
                            });
                            it('Throws an error', function () {
                                expect(serviceError.toString()).to.equal('Error: Missing required "id" parameter in detail service');
                                expect(serviceResult).to.equal(undefined);
                            });
                        });
                        describe('When invoked with an id', function () {
                            var serviceError, serviceResult;
                            beforeEach(function (done) {
                                service(42, function (err, result) {
                                    serviceError = err;
                                    serviceResult = result;
                                    done();
                                });
                            });
                            it('Makes an AJAX call', function () {
                                sinon.assert.calledOnce($.ajax);
                                expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?id=42');
                                expect($.ajax.args[0][0].success).to.be.a('function');
                                expect($.ajax.args[0][0].error).to.be.a('function');
                            });
                            it('Records a valid result', function () {
                                expect(serviceError).to.equal(undefined);
                                expect(serviceResult).to.be.an('object');
                                expect(serviceResult.id).to.equal(42);
                            });
                        });
                    });
                    describe('When invoked with valid parameters including `ajaxOptions` option', function () {
                        var service;
                        beforeEach(function () {
                            service = detailService(
                                'http://server.name/path/to/api',
                                {
                                    ajaxOptions: {
                                        foo: 'bar'
                                    }
                                }
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When invoked with an id', function () {
                            var serviceError, serviceResult;
                            beforeEach(function (done) {
                                service(42, function (err, result) {
                                    serviceError = err;
                                    serviceResult = result;
                                    done();
                                });
                            });
                            it('Makes an AJAX call', function () {
                                sinon.assert.calledOnce($.ajax);
                                expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?id=42');
                                expect($.ajax.args[0][0].foo).to.equal('bar');
                                expect($.ajax.args[0][0].success).to.be.a('function');
                                expect($.ajax.args[0][0].error).to.be.a('function');
                            });
                            it('Records a valid result', function () {
                                expect(serviceError).to.equal(undefined);
                                expect(serviceResult).to.be.an('object');
                                expect(serviceResult.id).to.equal(42);
                            });
                        });
                    });
                    describe('When invoked with valid parameters including `noCache` option', function () {
                        var service;
                        beforeEach(function () {
                            service = detailService(
                                'http://server.name/path/to/api',
                                {
                                    noCache: true
                                }
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When invoked with an id', function () {
                            var serviceError, serviceResult;
                            beforeEach(function (done) {
                                service(42, function (err, result) {
                                    serviceError = err;
                                    serviceResult = result;
                                    done();
                                });
                            });
                            it('Makes an AJAX call', function () {
                                sinon.assert.calledOnce($.ajax);
                                expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?id=42&noCache=1');
                                expect($.ajax.args[0][0].success).to.be.a('function');
                                expect($.ajax.args[0][0].error).to.be.a('function');
                            });
                            it('Records a valid result', function () {
                                expect(serviceError).to.equal(undefined);
                                expect(serviceResult).to.be.an('object');
                                expect(serviceResult.id).to.equal(42);
                            });
                        });
                    });
                    afterEach(function () {
                        $.ajax.restore();
                    });
                });
                describe('When AJAX calls are working correctly but the service is returning not-ok results', function () {
                    beforeEach(function () {
                        sinon.stub($, 'ajax', function (params) {
                            params.success({
                                ok: false,
                                id: 42,
                                name: 'The Meaning of Life',
                                field: 'value'
                            });
                        });
                    });
                    describe('When invoked with valid parameters and no options', function () {
                        var service;
                        beforeEach(function () {
                            service = detailService(
                                'http://server.name/path/to/api'
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When invoked with an id', function () {
                            var serviceError, serviceResult;
                            beforeEach(function (done) {
                                service(42, function (err, result) {
                                    serviceError = err;
                                    serviceResult = result;
                                    done();
                                });
                            });
                            it('Makes an AJAX call', function () {
                                sinon.assert.calledOnce($.ajax);
                                expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?id=42');
                                expect($.ajax.args[0][0].success).to.be.a('function');
                                expect($.ajax.args[0][0].error).to.be.a('function');
                            });
                            it('Records the error', function () {
                                expect(serviceResult).to.equal(undefined);
                                expect(serviceError.toString()).to.equal('Error: Invalid response received from server');
                            });
                        });
                    });
                    afterEach(function () {
                        $.ajax.restore();
                    });
                });
                describe('When AJAX calls are returning errors', function () {
                    beforeEach(function () {
                        sinon.stub($, 'ajax', function (params) {
                            params.error(undefined, undefined, new Error('Error returned from AJAX'));
                        });
                    });
                    describe('When invoked with valid parameters and no options', function () {
                        var service;
                        beforeEach(function () {
                            service = detailService(
                                'http://server.name/path/to/api'
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When invoked', function () {
                            var serviceError, serviceResult;
                            beforeEach(function (done) {
                                service(42, function (err, result) {
                                    serviceError = err;
                                    serviceResult = result;
                                    done();
                                });
                            });
                            it('Makes an AJAX call', function () {
                                sinon.assert.calledOnce($.ajax);
                                expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?id=42');
                                expect($.ajax.args[0][0].success).to.be.a('function');
                                expect($.ajax.args[0][0].error).to.be.a('function');
                            });
                            it('Records the error', function () {
                                expect(serviceError.toString()).to.equal('Error: Error returned from AJAX');
                                expect(serviceResult).to.equal(undefined);
                            });
                        });
                    });
                    afterEach(function () {
                        $.ajax.restore();
                    });
                });
            });
        }
    );
}());
