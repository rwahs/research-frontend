(function () {
    'use strict';

    define(
        [
            'chai',
            'ui/pages/search/SearchPage'
        ],
        function (chai, SearchPage) {
            var expect = chai.expect;

            describe('The `SearchPage` module', function () {
                it('Defines a constructor function', function () {
                    expect(SearchPage).to.be.a('function');
                });
            });
        }
    );
}());
