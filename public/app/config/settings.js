(function () {
    'use strict';

    define(
        [
            'util/container'
        ],
        function (container) {
            return function () {
                container.register('settings.library', {
                    collectionName: 'Library',
                    searchTypes: 'config/collections/library/searchTypes',
                    searchResultFields: 'config/collections/library/searchResultFields',
                    detailFields: 'config/collections/library/detailFields'
                });
                container.register('settings.photographs', {
                    collectionName: 'Photographs',
                    searchTypes: 'config/collections/photographs/searchTypes',
                    searchResultFields: 'config/collections/photographs/searchResultFields',
                    detailFields: 'config/collections/photographs/detailFields'
                });
                container.register('settings.museum', {
                    collectionName: 'Museum',
                    searchTypes: 'config/collections/museum/searchTypes',
                    searchResultFields: 'config/collections/museum/searchResultFields',
                    detailFields: 'config/collections/museum/detailFields'
                });
                container.register('settings.memorials', {
                    collectionName: 'Public Memorials',
                    searchTypes: 'config/collections/memorials/searchTypes',
                    searchResultFields: 'config/collections/memorials/searchResultFields',
                    detailFields: 'config/collections/memorials/detailFields'
                });
            };
        }
    );
}());
