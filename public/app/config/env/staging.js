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
                container.register('LibrarySearchService', searchService(simpleApiBaseUrl + '/library_search', enableCORS, true));
                container.register('PhotographsSearchService', searchService(simpleApiBaseUrl + '/photographs_search', enableCORS, true));
                container.register('MuseumSearchService', searchService(simpleApiBaseUrl + '/museum_search', enableCORS, true));
                container.register('MemorialsSearchService', searchService(simpleApiBaseUrl + '/memorials_search', enableCORS, true));
                container.seal();
            };
        }
    );
}());
