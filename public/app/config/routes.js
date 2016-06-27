(function () {
    'use strict';

    define(
        [
            'page',
            'querystring',
            'util/bind'
        ],
        function (page, qs, bind) {
            var routes, types = [ 'library', 'photographs', 'museum', 'memorials' ];

            routes = function () {
                page('/', function (context) {
                    return bind('ui/pages/home/home', 'ui/pages/home/HomePage', context);
                });

                page('/about', function (context) {
                    return bind('ui/pages/about/about', 'ui/pages/about/AboutPage', context);
                });

                page('/:type/search', function (context) {
                    if (types.indexOf(context.params.type) < 0) {
                        return bind('ui/pages/error/404', 'ui/pages/error/ErrorPage', context);
                    }
                    return bind('ui/pages/search/search', 'ui/pages/search/SearchPage', context);
                });

                page('/:type/detail/:id', function (context) {
                    if (types.indexOf(context.params.type) < 0) {
                        return bind('ui/pages/error/404', 'ui/pages/error/ErrorPage', context);
                    }
                    return bind('ui/pages/detail/detail', 'ui/pages/detail/DetailPage', context);
                });

                page('*', function (context) {
                    return bind('ui/pages/error/404', 'ui/pages/error/ErrorPage', context);
                });

                page();
            };

            routes.searchUrlFor = function (type, query) {
                return '/' + type + '/search' + (query ? '?' + qs.stringify(query) : '');
            };

            routes.detailUrlFor = function (type, id) {
                return '/' + type + '/detail/' + id;
            };

            routes.pushState = function (url) {
                return page.show(url, {}, false, true);
            };

            return routes;
        }
    );
}());
