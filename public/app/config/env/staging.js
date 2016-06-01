(function () {
    'use strict';

    define(
        [
            'util/container',
            'services/searchService'
        ],
        function (container, searchService) {
            var simpleApiBaseUrl = 'https://staging-collections.histwest.org.au/service.php/simple',
                enableCORS = { xhrFields: { withCredentials: true } };

            return function () {
                container.register('search.library', searchService(simpleApiBaseUrl + '/library_search', enableCORS, true));
                container.register('search.photographs', searchService(simpleApiBaseUrl + '/photographs_search', enableCORS, true));
                container.register('search.museum', searchService(simpleApiBaseUrl + '/museum_search', enableCORS, true));
                container.register('search.memorials', searchService(simpleApiBaseUrl + '/memorials_search', enableCORS, true));
                container.seal();
            };
        }
    );
}());
