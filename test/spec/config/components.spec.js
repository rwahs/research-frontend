(function () {
    'use strict';

    define(
        [
            'chai',
            'sinon',
            'knockout',
            'config/components'
        ],
        function (chai, sinon, ko, components) {
            var expect = chai.expect;

            describe('The `components` configuration module', function () {
                it('Defines a function', function () {
                    expect(components).to.be.a('function');
                });
                describe('When invoked', function () {
                    beforeEach(function () {
                        sinon.stub(ko.components, 'register');
                        components();
                    });
                    it('Configures the "text" display component', function () {
                        expect(ko.components.register.args[0][0]).to.equal('display/text');
                        expect(ko.components.register.args[0][1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(ko.components.register.args[0][1].template.require).to.equal('text!ui/components/display/text.html');
                    });
                    it('Configures the "html" display component', function () {
                        expect(ko.components.register.args[1][0]).to.equal('display/html');
                        expect(ko.components.register.args[1][1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(ko.components.register.args[1][1].template.require).to.equal('text!ui/components/display/html.html');
                    });
                    it('Configures the "list" display component', function () {
                        expect(ko.components.register.args[2][0]).to.equal('display/list');
                        expect(ko.components.register.args[2][1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(ko.components.register.args[2][1].template.require).to.equal('text!ui/components/display/list.html');
                    });
                    it('Configures the "typed-list" display component', function () {
                        expect(ko.components.register.args[3][0]).to.equal('display/typed-list');
                        expect(ko.components.register.args[3][1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(ko.components.register.args[3][1].template.require).to.equal('text!ui/components/display/typed-list.html');
                    });
                    it('Configures the "hierarchy" display component', function () {
                        expect(ko.components.register.args[4][0]).to.equal('display/hierarchy');
                        expect(ko.components.register.args[4][1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(ko.components.register.args[4][1].template.require).to.equal('text!ui/components/display/hierarchy.html');
                    });
                    it('Configures the "hierarchy-list" display component', function () {
                        expect(ko.components.register.args[5][0]).to.equal('display/hierarchy-list');
                        expect(ko.components.register.args[5][1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(ko.components.register.args[5][1].template.require).to.equal('text!ui/components/display/hierarchy-list.html');
                    });
                    afterEach(function () {
                        ko.components.register.restore();
                    });
                });
            });
        }
    );
}());
