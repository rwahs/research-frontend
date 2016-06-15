(function () {
    'use strict';

    define(
        [
            'util/container',
            'services/searchService',
            'services/detailService'
        ],
        function (container, searchService, detailService) {
            var simpleApiBaseUrl = 'https://staging-collections.histwest.org.au/service.php/simple',
                noCache = false,
                ajaxOptions = {
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('research-frontend:NotReallySecret'));
                    }
                };

            return function () {
                container.register('search.library', searchService(simpleApiBaseUrl + '/library_search', ajaxOptions, noCache, true));
                container.register('search.photographs', searchService(simpleApiBaseUrl + '/photographs_search', ajaxOptions, noCache, true));
                container.register('search.museum', searchService(simpleApiBaseUrl + '/museum_search', ajaxOptions, noCache, true));
                container.register('search.memorials', searchService(simpleApiBaseUrl + '/memorials_search', ajaxOptions, noCache, true));

                container.register('detail.library', detailService(simpleApiBaseUrl + '/library_detail', ajaxOptions, noCache, true));
                container.register('detail.photographs', detailService(simpleApiBaseUrl + '/photographs_detail', ajaxOptions, noCache, true));
                container.register('detail.museum', detailService(simpleApiBaseUrl + '/museum_detail', ajaxOptions, noCache, true));
                container.register('detail.memorials', detailService(simpleApiBaseUrl + '/memorials_detail', ajaxOptions, noCache, true));

                container.seal();
            };
        }
    );
}());
