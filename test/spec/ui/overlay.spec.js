(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/overlay'
        ],
        function (chai, overlay) {
            var expect = chai.expect;

            describe('The `overlay` module', function () {
                it('Defines a function', function () {
                    expect(overlay).to.be.a('function');
                });
                describe('When invoked', function () {
                    var instance;
                    beforeEach(function () {
                        instance = overlay();
                    });
                    it('Returns an object with `loading` and `error` methods', function () {
                        expect(instance.loading).to.be.a('function');
                        expect(instance.error).to.be.a('function');
                    });
                });
            });
        }
    );
}());
