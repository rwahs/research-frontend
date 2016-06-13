(function () {
    'use strict';

    define(
        [
            'chai',
            'knockout',
            'models/PaginatedList'
        ],
        function (chai, ko, PaginatedList) {
            var expect = chai.expect;

            describe('The `PaginatedList` module', function () {
                it('Defines a constructor function', function () {
                    expect(PaginatedList).to.be.a('function');
                });
                // TODO
            });
        }
    );
}());
