(function () {
    'use strict';

    define(
        [
            'util/container',
            'services/searchService',
            'services/detailService',
            'ui/overlay'
        ],
        function (container, searchService, detailService, overlay) {
            var simpleApiBaseUrl, options;

            simpleApiBaseUrl = 'http://localhost/providence/service.php/simple';
            options = {
                noCache: true,
                logErrors: true,
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
                container.register('search.all', searchService(simpleApiBaseUrl + '/all_search', options));
                container.register('search.library', searchService(simpleApiBaseUrl + '/library_search', options));
                container.register('search.photographs', searchService(simpleApiBaseUrl + '/photographs_search', options));
                container.register('search.museum', searchService(simpleApiBaseUrl + '/museum_search', options));
                container.register('search.memorials', searchService(simpleApiBaseUrl + '/memorials_search', options));

                container.register('detail.library', detailService(simpleApiBaseUrl + '/library_detail', options));
                container.register('detail.photographs', detailService(simpleApiBaseUrl + '/photographs_detail', options));
                container.register('detail.museum', detailService(simpleApiBaseUrl + '/museum_detail', options));
                container.register('detail.memorials', detailService(simpleApiBaseUrl + '/memorials_detail', options));

                container.register('ui.overlay', overlay(true));
            };
        }
    );
}());
