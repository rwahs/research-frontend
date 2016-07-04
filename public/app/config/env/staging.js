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
            var simpleApiBaseUrl = 'https://staging-collections-api.histwest.org.au/service.php/simple',
                ajaxOptions = {
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('research-frontend:NotReallySecret'));
                    }
                };

            return function () {
                container.register('search.library', cachingService(searchService(simpleApiBaseUrl + '/library_search', ajaxOptions, false, true)));
                container.register('search.photographs', cachingService(searchService(simpleApiBaseUrl + '/photographs_search', ajaxOptions, false, true)));
                container.register('search.museum', cachingService(searchService(simpleApiBaseUrl + '/museum_search', ajaxOptions, false, true)));
                container.register('search.memorials', cachingService(searchService(simpleApiBaseUrl + '/memorials_search', ajaxOptions, false, true)));

                container.register('detail.library', cachingService(detailService(simpleApiBaseUrl + '/library_detail', ajaxOptions, false, true)));
                container.register('detail.photographs', cachingService(detailService(simpleApiBaseUrl + '/photographs_detail', ajaxOptions, false, true)));
                container.register('detail.museum', cachingService(detailService(simpleApiBaseUrl + '/museum_detail', ajaxOptions, false, true)));
                container.register('detail.memorials', cachingService(detailService(simpleApiBaseUrl + '/memorials_detail', ajaxOptions, false, true)));

                container.register('ui.overlay', overlay(true));

                container.seal();
            };
        }
    );
}());
