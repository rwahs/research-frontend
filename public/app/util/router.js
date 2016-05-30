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
            runHook = function (vm, hook, container, callback) {
                callback = callback || _.noop;
                if (_.isFunction(vm[hook])) {
                    return vm[hook](container, callback);
                }
                callback();
            };

            // Attach the view and view model specified by paths, using the given router context.
            attach = function (viewPath, viewModelPath, context, parameters) {
                var container, vm, _attach;

                _attach = function () {
                    runHook(vm, 'attaching', container, function () {
                        applicationContainer.innerHTML = '';
                        applicationContainer.appendChild(container);
                        runHook(vm, 'binding', container, function () {
                            ko.applyBindings(vm, container);
                            current = { vm: vm, container: container };
                            runHook(vm, 'ready', container);
                        });
                    });
                };

                require([ 'text!' + viewPath + '.html', viewModelPath ], function (view, ViewModel) {
                    container = document.createElement('div');
                    container.innerHTML = view;
                    vm = new ViewModel(context, parameters);
                    if (current) {
                        return runHook(current.vm, 'detaching', current.container, _attach);
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
                                    searchServiceKey: 'LibrarySearchService',
                                    detailUrlTemplate: '/library/detail/:id',
                                    searchTypes: 'ui/pages/search/library/searchTypes',
                                    resultFields: 'ui/pages/search/library/resultFields'
                                }
                            );
                        case 'photographs':
                            return attach(
                                'ui/pages/search/index',
                                'ui/pages/search/SearchPage',
                                context,
                                {
                                    collectionName: 'Photographs',
                                    searchServiceKey: 'PhotographsSearchService',
                                    detailUrlTemplate: '/photographs/detail/:id',
                                    searchTypes: 'ui/pages/search/photographs/searchTypes',
                                    resultFields: 'ui/pages/search/photographs/resultFields'
                                }
                            );
                        case 'museum':
                            return attach(
                                'ui/pages/search/index',
                                'ui/pages/search/SearchPage',
                                context,
                                {
                                    collectionName: 'Museum',
                                    searchServiceKey: 'MuseumSearchService',
                                    detailUrlTemplate: '/museum/detail/:id',
                                    searchTypes: 'ui/pages/search/museum/searchTypes',
                                    resultFields: 'ui/pages/search/museum/resultFields'
                                }
                            );
                        case 'memorials':
                            return attach(
                                'ui/pages/search/index',
                                'ui/pages/search/SearchPage',
                                context,
                                {
                                    collectionName: 'Memorials',
                                    searchServiceKey: 'MemorialsSearchService',
                                    detailUrlTemplate: '/memorials/detail/:id',
                                    searchTypes: 'ui/pages/search/memorials/searchTypes',
                                    resultFields: 'ui/pages/search/memorials/resultFields'
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
                                context
                            );
                        case 'photographs':
                            return attach(
                                'ui/pages/detail/photographs',
                                'ui/pages/detail/DetailPage',
                                context
                            );
                        case 'museum':
                            return attach(
                                'ui/pages/detail/museum',
                                'ui/pages/detail/DetailPage',
                                context
                            );
                        case 'memorials':
                            return attach(
                                'ui/pages/detail/memorials',
                                'ui/pages/detail/DetailPage',
                                context
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
