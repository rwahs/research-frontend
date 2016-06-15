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
                ajaxOptions = {
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('research-frontend:NotReallySecret'));
                    }
                };

            return function () {
                container.register('search.library', searchService(simpleApiBaseUrl + '/library_search', ajaxOptions, false, true));
                container.register('search.photographs', searchService(simpleApiBaseUrl + '/photographs_search', ajaxOptions, false, true));
                container.register('search.museum', searchService(simpleApiBaseUrl + '/museum_search', ajaxOptions, false, true));
                container.register('search.memorials', searchService(simpleApiBaseUrl + '/memorials_search', ajaxOptions, false, true));

                container.register('detail.library', detailService(simpleApiBaseUrl + '/library_detail', ajaxOptions, false, true));
                container.register('detail.photographs', detailService(simpleApiBaseUrl + '/photographs_detail', ajaxOptions, false, true));
                container.register('detail.museum', detailService(simpleApiBaseUrl + '/museum_detail', ajaxOptions, false, true));
                container.register('detail.memorials', detailService(simpleApiBaseUrl + '/memorials_detail', ajaxOptions, false, true));

                container.seal();
            };
        }
    );
}());
