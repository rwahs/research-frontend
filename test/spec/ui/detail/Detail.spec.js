(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/detail/Detail'
        ],
        function (chai, Detail) {
            var expect = chai.expect;

            describe('The `Detail` module', function () {
                it('Defines a constructor function', function () {
                    expect(Detail).to.be.a('function');
                });
            });
        }
    );
}());
