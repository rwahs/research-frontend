(function () {
    'use strict';

    define(
        [
            'util/container',
            'services/searchService',
            'services/detailService'
        ],
        function (container, searchService, detailService) {
            var simpleApiBaseUrl = 'http://localhost/providence/service.php/simple',
                enableCORS = { xhrFields: { withCredentials: true } };

            return function () {
                container.register('search.library', searchService(simpleApiBaseUrl + '/library_search', enableCORS, true));
                container.register('search.photographs', searchService(simpleApiBaseUrl + '/photographs_search', enableCORS, true));
                container.register('search.museum', searchService(simpleApiBaseUrl + '/museum_search', enableCORS, true));
                container.register('search.memorials', searchService(simpleApiBaseUrl + '/memorials_search', enableCORS, true));

                container.register('detail.library', detailService(simpleApiBaseUrl + '/library_detail', enableCORS, true));
                container.register('detail.photographs', detailService(simpleApiBaseUrl + '/photographs_detail', enableCORS, true));
                container.register('detail.museum', detailService(simpleApiBaseUrl + '/museum_detail', enableCORS, true));
                container.register('detail.memorials', detailService(simpleApiBaseUrl + '/memorials_detail', enableCORS, true));

                container.seal();
            };
        }
    );
}());
