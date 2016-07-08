(function () {
    'use strict';

    define(
        [
            'chai',
            'util/container',
            'config/settings'
        ],
        function (chai, container, settings) {
            var expect = chai.expect;

            describe('The `settings` configuration module', function () {
                it('Defines a function', function () {
                    expect(settings).to.be.a('function');
                });
                describe('When invoked', function () {
                    beforeEach(function () {
                        settings();
                    });
                    it('Registers the settings', function () {
                        expect(container.isRegistered('settings.all')).to.equal(true);
                        expect(container.isRegistered('settings.library')).to.equal(true);
                        expect(container.isRegistered('settings.memorials')).to.equal(true);
                        expect(container.isRegistered('settings.museum')).to.equal(true);
                        expect(container.isRegistered('settings.photographs')).to.equal(true);
                    });
                    it('Registers the correct settings', function () {
                        expect(container.resolve('settings.all')).to.deep.equal({
                            collectionName: 'All Collections',
                            searchInputFields: 'config/collections/all/searchInputFields',
                            searchResultFields: 'config/collections/all/searchResultFields'
                        });
                        expect(container.resolve('settings.library')).to.deep.equal({
                            collectionName: 'Library',
                            labelField: 'Title',
                            searchInputFields: 'config/collections/library/searchInputFields',
                            searchResultFields: 'config/collections/library/searchResultFields',
                            detailFields: 'config/collections/library/detailFields'
                        });
                        expect(container.resolve('settings.memorials')).to.deep.equal({
                            collectionName: 'Public Memorials',
                            labelField: 'ItemName',
                            searchInputFields: 'config/collections/memorials/searchInputFields',
                            searchResultFields: 'config/collections/memorials/searchResultFields',
                            detailFields: 'config/collections/memorials/detailFields'
                        });
                        expect(container.resolve('settings.museum')).to.deep.equal({
                            collectionName: 'Museum',
                            labelField: 'ItemName',
                            searchInputFields: 'config/collections/museum/searchInputFields',
                            searchResultFields: 'config/collections/museum/searchResultFields',
                            detailFields: 'config/collections/museum/detailFields'
                        });
                        expect(container.resolve('settings.photographs')).to.deep.equal({
                            collectionName: 'Photographs',
                            labelField: 'Title',
                            searchInputFields: 'config/collections/photographs/searchInputFields',
                            searchResultFields: 'config/collections/photographs/searchResultFields',
                            detailFields: 'config/collections/photographs/detailFields'
                        });
                    });
                    afterEach(function () {
                        container.reset();
                    });
                });
            });
        }
    );
}());
