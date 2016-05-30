(function () {
    'use strict';

    define(
        [
            'util/container',
            'services/SearchService'
        ],
        function (container, SearchService) {
            var simpleApiBaseUrl = 'http://localhost/providence/service.php/simple',
                enableCORS = { xhrFields: { withCredentials: true } };

            return function () {
                container.register('LibrarySearchService', new SearchService(simpleApiBaseUrl + '/library_search', enableCORS));
                container.register('PhotographsSearchService', new SearchService(simpleApiBaseUrl + '/photographs_search', enableCORS));
                container.register('MuseumSearchService', new SearchService(simpleApiBaseUrl + '/museum_search', enableCORS));
                container.register('MemorialsSearchService', new SearchService(simpleApiBaseUrl + '/memorials_search', enableCORS));
                container.seal();
            };
        }
    );
}());
