(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'sinon',
            'knockout',
            'config/components'
        ],
        function (_, chai, sinon, ko, components) {
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
                    it('Configures the correct number of components', function () {
                        expect(ko.components.register.callCount).to.equal(23);
                    });
                    it('Configures the "library detail" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/library/detail' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/library/detail.html');
                    });
                    it('Configures the "library list-result" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/library/list-result' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/library/list-result.html');
                    });
                    it('Configures the "library thumbnails-result" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/library/thumbnails-result' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/library/thumbnails-result.html');
                    });
                    it('Configures the "memorials detail" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/memorials/detail' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/memorials/detail.html');
                    });
                    it('Configures the "memorials list-result" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/memorials/list-result' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/memorials/list-result.html');
                    });
                    it('Configures the "memorials thumbnails-result" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/memorials/thumbnails-result' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/memorials/thumbnails-result.html');
                    });
                    it('Configures the "museum detail" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/museum/detail' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/museum/detail.html');
                    });
                    it('Configures the "museum list-result" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/museum/list-result' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/museum/list-result.html');
                    });
                    it('Configures the "museum thumbnails-result" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/museum/thumbnails-result' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/museum/thumbnails-result.html');
                    });
                    it('Configures the "photographs detail" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/photographs/detail' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/photographs/detail.html');
                    });
                    it('Configures the "photographs list-result" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/photographs/list-result' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/photographs/list-result.html');
                    });
                    it('Configures the "photographs thumbnails-result" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/photographs/thumbnails-result' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/photographs/thumbnails-result.html');
                    });
                    it('Configures the "table-results" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/table-results' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/table-results.html');
                    });
                    it('Configures the "table-results" collections component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'collections/table-results' });
                        expect(args[1].viewModel).to.equal(undefined);
                        expect(args[1].template.require).to.equal('text!ui/components/collections/table-results.html');
                    });
                    it('Configures the "list controls" component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'controls/list' });
                        expect(args[1].viewModel.require).to.equal('ui/components/controls/ListControlsComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/controls/list-controls.html');
                    });
                    it('Configures the "text" display component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'display/text' });
                        expect(args[1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/display/text.html');
                    });
                    it('Configures the "list" display component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'display/list' });
                        expect(args[1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/display/list.html');
                    });
                    it('Configures the "typed-list" display component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'display/typed-list' });
                        expect(args[1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/display/typed-list.html');
                    });
                    it('Configures the "hierarchy" display component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'display/hierarchy' });
                        expect(args[1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/display/hierarchy.html');
                    });
                    it('Configures the "hierarchy-list" display component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'display/hierarchy-list' });
                        expect(args[1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/display/hierarchy-list.html');
                    });
                    it('Configures the "image" display component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'display/image' });
                        expect(args[1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/display/image.html');
                    });
                    it('Configures the "cover-image" display component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'display/cover-image' });
                        expect(args[1].viewModel.require).to.equal('ui/components/display/DisplayComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/display/cover-image.html');
                    });
                    it('Configures the quick search component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'search/quick' });
                        expect(args[1].viewModel.require).to.equal('ui/components/search/quick/QuickSearchComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/search/quick/quick-search.html');
                    });
                    it('Configures the query builder search component', function () {
                        var args = _.find(ko.components.register.args, { 0: 'search/query-builder' });
                        expect(args[1].viewModel.require).to.equal('ui/components/search/queryBuilder/QueryBuilderComponent');
                        expect(args[1].template.require).to.equal('text!ui/components/search/queryBuilder/query-builder.html');
                    });
                    afterEach(function () {
                        ko.components.register.restore();
                    });
                });
            });
        }
    );
}());
