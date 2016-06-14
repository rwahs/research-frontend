(function () {
    'use strict';

    define(
        [
            'chai',
            'knockout',
            'models/ListPager'
        ],
        function (chai, ko, ListPager) {
            var expect = chai.expect;

            describe('The `ListPager` module', function () {
                it('Defines a constructor function', function () {
                    expect(ListPager).to.be.a('function');
                });
                // TODO
            });
        }
    );
}());
