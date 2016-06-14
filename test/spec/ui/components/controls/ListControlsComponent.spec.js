(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'ui/components/controls/ListControlsComponent'
        ],
        function (chai, sinon, ListControlsComponent) {
            var expect = chai.expect;

            describe('The `ListControlsComponent` module', function () {
                it('Defines a constructor function', function () {
                    expect(ListControlsComponent).to.be.a('function');
                });
                // TODO Tests for this
            });
        }
    );
}());
