(function () {
    'use strict';

    define(
        [
            'util/container'
        ],
        function (container) {
            return function () {
                container.register('settings.all', {
                    collectionName: 'All Collections',
                    comparators: 'config/comparators',
                    searchInputFields: 'config/collections/all/searchInputFields',
                    searchResultFields: 'config/collections/all/searchResultFields'
                });
                container.register('settings.library', {
                    collectionName: 'Library',
                    labelField: 'Title',
                    comparators: 'config/comparators',
                    searchInputFields: 'config/collections/library/searchInputFields',
                    searchResultFields: 'config/collections/library/searchResultFields',
                    detailFields: 'config/collections/library/detailFields'
                });
                container.register('settings.photographs', {
                    collectionName: 'Photographs',
                    labelField: 'Title',
                    comparators: 'config/comparators',
                    searchInputFields: 'config/collections/photographs/searchInputFields',
                    searchResultFields: 'config/collections/photographs/searchResultFields',
                    detailFields: 'config/collections/photographs/detailFields'
                });
                container.register('settings.museum', {
                    collectionName: 'Museum',
                    labelField: 'ItemName',
                    comparators: 'config/comparators',
                    searchInputFields: 'config/collections/museum/searchInputFields',
                    searchResultFields: 'config/collections/museum/searchResultFields',
                    detailFields: 'config/collections/museum/detailFields'
                });
                container.register('settings.memorials', {
                    collectionName: 'Public Memorials',
                    labelField: 'ItemName',
                    comparators: 'config/comparators',
                    searchInputFields: 'config/collections/memorials/searchInputFields',
                    searchResultFields: 'config/collections/memorials/searchResultFields',
                    detailFields: 'config/collections/memorials/detailFields'
                });
            };
        }
    );
}());
