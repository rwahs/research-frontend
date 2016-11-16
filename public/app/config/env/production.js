(function () {
    'use strict';

    define(
        [
            'util/container',
            'services/searchService',
            'services/detailService',
            'services/cachingService',
            'ui/overlay'
        ],
        function (container, searchService, detailService, cachingService, overlay) {
            var simpleApiBaseUrl, options;

            simpleApiBaseUrl = 'https://collections-api.histwest.org.au/service.php/simple';
            options = {
                noCache: false,
                logErrors: false,
                limit: 500,
                ajaxOptions: {
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('research-frontend:NotReallySecret'));
                    }
                }
            };

            return function () {
                container.register('options.service', options);
                container.register('options.shop', {
                    baseUrl: 'https://shop.histwest.org.au/index.php/',
                    path: {
                        search: 'catalogsearch/result/',
                        digitalPhotographs: 'photographs/digital-photograph.html'
                    }
                });
                container.register('options.providence', {
                    baseUrl: 'https://collections.histwest.org.au/index.php/',
                    path: {
                        objects: 'editor/objects/ObjectEditor/Summary/'
                    }
                });

                container.register('search.all', cachingService(searchService(simpleApiBaseUrl + '/all_search', options)));
                container.register('search.library', cachingService(searchService(simpleApiBaseUrl + '/library_search', options)));
                container.register('search.photographs', cachingService(searchService(simpleApiBaseUrl + '/photographs_search', options)));
                container.register('search.museum', cachingService(searchService(simpleApiBaseUrl + '/museum_search', options)));
                container.register('search.memorials', cachingService(searchService(simpleApiBaseUrl + '/memorials_search', options)));

                container.register('detail.library', cachingService(detailService(simpleApiBaseUrl + '/library_detail', options)));
                container.register('detail.photographs', cachingService(detailService(simpleApiBaseUrl + '/photographs_detail', options)));
                container.register('detail.museum', cachingService(detailService(simpleApiBaseUrl + '/museum_detail', options)));
                container.register('detail.memorials', cachingService(detailService(simpleApiBaseUrl + '/memorials_detail', options)));

                container.register('ui.overlay', overlay(false));
            };
        }
    );
}());
