(function () {
    'use strict';

    define(
        [
            'chai',
            'util/container'
        ],
        function (chai, container) {
            var testObjectA, testObjectB, testObjectC, expect = chai.expect;

            // Simple objects that are registered into the container during the test.
            testObjectA = {
                name: 'Test object',
                purpose: 'Demonstrate the register and resolve methods'
            };

            testObjectB = {
                name: 'Second test object',
                meaningOfLife: 42
            };

            testObjectC = {
                name: 'Third test object'
            };

            describe('The container module', function () {
                before(function () {
                    container.register('test', testObjectA);
                });
                it('Exports a singleton', function () {
                    expect(container).to.be.a('object');
                });
                it('The container is not initially marked as sealed', function () {
                    expect(container.isSealed()).to.equal(false);
                });
                describe('When registering a key that has not already been registered', function () {
                    it('Does not throw an exception', function () {
                        expect(function () {
                            container.register('new-key', testObjectB);
                        }).not.to.throw();
                    });
                    it('Allows the registered value to be resolved', function () {
                        expect(container.resolve('new-key')).to.equal(testObjectB);
                    });
                });
                describe('When registering a key that is already registered', function () {
                    it('Throws an exception', function () {
                        expect(function () {
                            container.register('test', testObjectC);
                        }).to.throw('Attempt to register "test" already registered');
                    });
                });
                describe('When resolving a key that has been registered', function () {
                    it('Returns the registered value', function () {
                        expect(container.resolve('test')).to.equal(testObjectA);
                    });
                });
                describe('When resolving a key that has not been registered', function () {
                    it('Throws an exception', function () {
                        expect(function () {
                            container.resolve('foo-bar');
                        }).to.throw('Attempt to resolve "foo-bar" not registered');
                    });
                });
                describe('When testing a key that has been registered', function () {
                    it('Returns true', function () {
                        expect(container.isRegistered('test')).to.equal(true);
                    });
                });
                describe('When testing a key that has not been registered', function () {
                    it('Returns false', function () {
                        expect(container.isRegistered('not-registered')).to.equal(false);
                    });
                });
                describe('After sealing the container', function () {
                    beforeEach(function () {
                        container.seal();
                    });
                    it('The container is marked as sealed', function () {
                        expect(container.isSealed()).to.equal(true);
                    });
                    describe('When registering a key that has not already been registered', function () {
                        it('Throws an exception', function () {
                            expect(function () {
                                container.register('another-new-key', testObjectC);
                            }).to.throw('Attempt to register "another-new-key" after container is sealed');
                        });
                    });
                    describe('When registering a key that has already been registered', function () {
                        it('Throws an exception', function () {
                            expect(function () {
                                container.register('test', testObjectC);
                            }).to.throw('Attempt to register "test" after container is sealed');
                        });
                    });
                });
                after(function () {
                    container.reset();
                });
            });
        }
    );
}());
