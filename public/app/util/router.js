(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'page'
        ],
        function (_, ko, page) {
            var runHook, attach, current,
                applicationContainer = document.getElementById('application-container');

            // Run the given named hook for the given vm.
            runHook = function (vm, hook, element, callback) {
                callback = callback || _.noop;
                if (_.isFunction(vm[hook])) {
                    return vm[hook](element, callback);
                }
                callback();
            };

            // Attach the view and view model specified by paths, using the given router context.
            attach = function (viewPath, viewModelPath, context, parameters) {
                var element, vm, _attach;

                _attach = function () {
                    runHook(vm, 'attaching', element, function () {
                        applicationContainer.innerHTML = '';
                        applicationContainer.appendChild(element);
                        runHook(vm, 'binding', element, function () {
                            ko.applyBindings(vm, element);
                            current = { vm: vm, element: element };
                            runHook(vm, 'ready', element);
                        });
                    });
                };

                require([ 'text!' + viewPath + '.html', viewModelPath ], function (view, ViewModel) {
                    element = document.createElement('div');
                    element.innerHTML = view;
                    vm = new ViewModel(context, parameters);
                    if (current) {
                        return runHook(current.vm, 'detaching', current.element, _attach);
                    }
                    _attach();
                });
            };

            // Configure and start the router.
            return function () {
                page('/', function (context) {
                    return attach(
                        'ui/pages/static/home',
                        'ui/pages/static/StaticPage',
                        context
                    );
                });

                page('/about', function (context) {
                    return attach(
                        'ui/pages/static/about',
                        'ui/pages/static/StaticPage',
                        context
                    );
                });

                page('/:type/search/:query?', function (context) {
                    switch (context.params.type) {
                        case 'library':
                            return attach(
                                'ui/pages/search/index',
                                'ui/pages/search/SearchPage',
                                context,
                                {
                                    collectionName: 'Library',
                                    searchServiceKey: 'search.library',
                                    detailUrlTemplate: '/library/detail/:id',
                                    searchTypes: 'config/collections/library/searchTypes',
                                    searchResultFields: 'config/collections/library/searchResultFields'
                                }
                            );
                        case 'photographs':
                            return attach(
                                'ui/pages/search/index',
                                'ui/pages/search/SearchPage',
                                context,
                                {
                                    collectionName: 'Photographs',
                                    searchServiceKey: 'search.photographs',
                                    detailUrlTemplate: '/photographs/detail/:id',
                                    searchTypes: 'config/collections/photographs/searchTypes',
                                    searchResultFields: 'config/collections/photographs/searchResultFields'
                                }
                            );
                        case 'museum':
                            return attach(
                                'ui/pages/search/index',
                                'ui/pages/search/SearchPage',
                                context,
                                {
                                    collectionName: 'Museum',
                                    searchServiceKey: 'search.museum',
                                    detailUrlTemplate: '/museum/detail/:id',
                                    searchTypes: 'config/collections/museum/searchTypes',
                                    searchResultFields: 'config/collections/museum/searchResultFields'
                                }
                            );
                        case 'memorials':
                            return attach(
                                'ui/pages/search/index',
                                'ui/pages/search/SearchPage',
                                context,
                                {
                                    collectionName: 'Public Memorials',
                                    searchServiceKey: 'search.memorials',
                                    detailUrlTemplate: '/memorials/detail/:id',
                                    searchTypes: 'config/collections/memorials/searchTypes',
                                    searchResultFields: 'config/collections/memorials/searchResultFields'
                                }
                            );
                        default:
                            return attach(
                                'ui/pages/error/404',
                                'ui/pages/error/ErrorPage',
                                context
                            );
                    }
                });

                page('/:type/detail/:id', function (context) {
                    switch (context.params.type) {
                        case 'library':
                            return attach(
                                'ui/pages/detail/library',
                                'ui/pages/detail/DetailPage',
                                context,
                                {
                                    detailServiceKey: 'detail.library',
                                    detailFields: 'config/collections/library/detailFields'
                                }
                            );
                        case 'photographs':
                            return attach(
                                'ui/pages/detail/photographs',
                                'ui/pages/detail/DetailPage',
                                context,
                                {
                                    detailServiceKey: 'detail.photographs',
                                    detailFields: 'config/collections/photographs/detailFields'
                                }
                            );
                        case 'museum':
                            return attach(
                                'ui/pages/detail/museum',
                                'ui/pages/detail/DetailPage',
                                context,
                                {
                                    detailServiceKey: 'detail.museum',
                                    detailFields: 'config/collections/museum/detailFields'
                                }
                            );
                        case 'memorials':
                            return attach(
                                'ui/pages/detail/memorials',
                                'ui/pages/detail/DetailPage',
                                context,
                                {
                                    detailServiceKey: 'detail.memorials',
                                    detailFields: 'config/collections/memorials/detailFields'
                                }
                            );
                        default:
                            return attach(
                                'ui/pages/error/404',
                                'ui/pages/error/ErrorPage',
                                context
                            );
                    }
                });

                page('*', function (context) {
                    return attach(
                        'ui/pages/error/404',
                        'ui/pages/error/ErrorPage',
                        context
                    );
                });

                page.start();
            };
        }
    );
}());
