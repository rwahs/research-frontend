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
                if (_.isFunction(vm[hook])) {
                    return vm[hook](container, callback);
                }
                callback();
            };

            // Attach the view and view model specified by paths, using the given router context.
            attach = function (viewPath, viewModelPath, context) {
                var container, vm, _attach;

                _attach = function () {
                    runHook(vm, 'attaching', container, function () {
                        applicationContainer.innerHTML = '';
                        applicationContainer.appendChild(container);
                        runHook(vm, 'binding', container, function () {
                            ko.applyBindings(vm, container);
                            runHook(vm, 'ready', container, function () {
                                current = {
                                    vm: vm,
                                    container: container
                                };
                            });
                        });
                    });
                };

                require([ 'text!' + viewPath + '.html', viewModelPath ], function (view, ViewModel) {
                    container = document.createElement('div');
                    container.innerHTML = view;
                    vm = new ViewModel(context);
                    if (current) {
                        return runHook(current.vm, 'detaching', current.container, _attach);
                    }
                    _attach();
                });
            };

            // Configure and start the router.
            return function () {
                page('/', function (context) {
                    return attach('ui/pages/home', 'ui/pages/Page', context);
                });

                page('/about', function (context) {
                    return attach('ui/pages/about', 'ui/pages/Page', context);
                });

                page('/:type/search/:query?', function (context) {
                    switch (context.params.type) {
                        case 'library':
                            return attach('ui/search/library', 'ui/search/Search', context);
                        case 'photographs':
                            return attach('ui/search/photographs', 'ui/search/Search', context);
                        case 'museum':
                            return attach('ui/search/museum', 'ui/search/Search', context);
                        case 'memorials':
                            return attach('ui/search/memorials', 'ui/search/Search', context);
                        default:
                            return attach('ui/errors/404', 'ui/errors/404', context);
                    }
                });

                page('/:type/detail/:id', function (context) {
                    switch (context.params.type) {
                        case 'library':
                            return attach('ui/detail/library', 'ui/detail/Detail', context);
                        case 'photographs':
                            return attach('ui/detail/photographs', 'ui/detail/Detail', context);
                        case 'museum':
                            return attach('ui/detail/museum', 'ui/detail/Detail', context);
                        case 'memorials':
                            return attach('ui/detail/memorials', 'ui/detail/Detail', context);
                        default:
                            return attach('ui/errors/404', 'ui/errors/404', context);
                    }
                });

                page('*', function (context) {
                    return attach('ui/errors/404', 'ui/errors/404', context);
                });

                page.start();
            };
        }
    );
}());
