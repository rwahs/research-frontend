(function () {
    'use strict';

    define(
        [
            'jquery',
            'chai',
            'sinon',
            'services/searchService'
        ],
        function ($, chai, sinon, searchService) {
            var expect = chai.expect;

            describe('The `searchService` module', function () {
                it('Defines a function', function () {
                    expect(searchService).to.be.a('function');
                });
                describe('When AJAX calls are working correctly', function () {
                    beforeEach(function () {
                        sinon.stub($, 'ajax', function (params) {
                            params.success({
                                ok: true,
                                '1': 'first result',
                                '2': 'second result',
                                '3': 'third result'
                            });
                        });
                    });
                    describe('When invoked with valid parameters with no options', function () {
                        var service;
                        beforeEach(function () {
                            service = searchService(
                                'http://server.name/path/to/api'
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When the returned function is invoked', function () {
                            describe('When invoked with no parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = undefined;
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with one parameter', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value)');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with multiple parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            },
                                            {
                                                field: 'another',
                                                value: 'search this'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value) AND (another:search this)');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                        });
                    });
                    describe('When invoked with valid parameters including `ajaxOptions` option', function () {
                        var service;
                        beforeEach(function () {
                            service = searchService(
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
                        describe('When the returned function is invoked', function () {
                            describe('When invoked with no parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = undefined;
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=');
                                    expect($.ajax.args[0][0].foo).to.equal('bar');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with incorrectly structured parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    // This is the old syntax, it is no longer supported, see the next `describe`.
                                    parameters = { field: 'value' };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=');
                                    expect($.ajax.args[0][0].foo).to.equal('bar');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with one field value specified', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value)');
                                    expect($.ajax.args[0][0].foo).to.equal('bar');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with multiple parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            },
                                            {
                                                field: 'another',
                                                value: 'search this'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value) AND (another:search this)');
                                    expect($.ajax.args[0][0].foo).to.equal('bar');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                        });
                    });
                    describe('When invoked with valid parameters including `noCache` option', function () {
                        var service;
                        beforeEach(function () {
                            service = searchService(
                                'http://server.name/path/to/api',
                                {
                                    noCache: true
                                }
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When the returned function is invoked', function () {
                            describe('When invoked with no parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = undefined;
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=&noCache=1');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with one parameter', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value)&noCache=1');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with multiple parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            },
                                            {
                                                field: 'another',
                                                value: 'search this'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value) AND (another:search this)&noCache=1');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                        });
                    });
                    describe('When invoked with valid parameters including `logErrors` option', function () {
                        var service;
                        beforeEach(function () {
                            service = searchService(
                                'http://server.name/path/to/api',
                                {
                                    logErrors: true
                                }
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When the returned function is invoked', function () {
                            describe('When invoked with no parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = undefined;
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with one parameter', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value)');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with multiple parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            },
                                            {
                                                field: 'another',
                                                value: 'search this'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value) AND (another:search this)');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                        });
                    });
                    describe('When invoked with valid parameters including `limit` option', function () {
                        var service;
                        beforeEach(function () {
                            service = searchService(
                                'http://server.name/path/to/api',
                                {
                                    limit: 42
                                }
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When the returned function is invoked', function () {
                            describe('When invoked with no parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = undefined;
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=&limit=42');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with one parameter', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value)&limit=42');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
                            });
                            describe('When invoked with multiple parameters', function () {
                                var parameters, serviceError, serviceResult;
                                beforeEach(function (done) {
                                    parameters = {
                                        operator: 'AND',
                                        children: [
                                            {
                                                field: 'field',
                                                value: 'value'
                                            },
                                            {
                                                field: 'another',
                                                value: 'search this'
                                            }
                                        ]
                                    };
                                    service(parameters, function (err, result) {
                                        serviceError = err;
                                        serviceResult = result;
                                        done();
                                    });
                                });
                                it('Makes an AJAX call', function () {
                                    sinon.assert.calledOnce($.ajax);
                                    expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=(field:value) AND (another:search this)&limit=42');
                                    expect($.ajax.args[0][0].success).to.be.a('function');
                                    expect($.ajax.args[0][0].error).to.be.a('function');
                                });
                                it('Records a valid result', function () {
                                    expect(serviceError).to.equal(undefined);
                                    expect(serviceResult).to.be.an('array');
                                    expect(serviceResult).to.have.length(3);
                                });
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
                                '1': 'first result',
                                '2': 'second result',
                                '3': 'third result'
                            });
                        });
                    });
                    describe('When invoked', function () {
                        var service;
                        beforeEach(function () {
                            service = searchService(
                                'http://server.name/path/to/api'
                            );
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When invoked', function () {
                            var parameters, serviceError, serviceResult;
                            beforeEach(function (done) {
                                parameters = {};
                                service(parameters, function (err, result) {
                                    serviceError = err;
                                    serviceResult = result;
                                    done();
                                });
                            });
                            it('Makes an AJAX call', function () {
                                sinon.assert.calledOnce($.ajax);
                                expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=');
                                expect($.ajax.args[0][0].success).to.be.a('function');
                                expect($.ajax.args[0][0].error).to.be.a('function');
                            });
                            it('Records the error', function () {
                                expect(serviceError.toString()).to.equal('Error: Invalid response received from server');
                                expect(serviceResult).to.equal(undefined);
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
                    describe('When invoked', function () {
                        var service;
                        beforeEach(function () {
                            service = searchService('http://server.name/path/to/api');
                        });
                        it('Returns a function', function () {
                            expect(service).to.be.a('function');
                        });
                        describe('When the returned function is invoked', function () {
                            var parameters, serviceError, serviceResult;
                            beforeEach(function (done) {
                                parameters = {};
                                service(parameters, function (err, result) {
                                    serviceError = err;
                                    serviceResult = result;
                                    done();
                                });
                            });
                            it('Makes an AJAX call', function () {
                                sinon.assert.calledOnce($.ajax);
                                expect($.ajax.args[0][0].url).to.equal('http://server.name/path/to/api?q=');
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
