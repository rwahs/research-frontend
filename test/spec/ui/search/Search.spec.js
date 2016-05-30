(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/search/Search'
        ],
        function (chai, Search) {
            var expect = chai.expect;

            describe('The `Search` module', function () {
                it('Defines a constructor function', function () {
                    expect(Search).to.be.a('function');
                });
            });
        }
    );
}());
