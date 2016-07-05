(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            var current;

            return function (viewPath, viewModelPath, context) {
                var container, element, vm, runHook, attach;

                container = window.document.getElementById('page-container');

                runHook = function (vm, hook, element, callback) {
                    callback = callback || _.noop;
                    if (_.isFunction(vm[hook])) {
                        return vm[hook](element, callback);
                    }
                    callback();
                };

                attach = function () {
                    runHook(vm, 'attaching', element, function () {
                        container.innerHTML = '';
                        container.appendChild(element);
                        ko.applyBindings(vm, element);
                        runHook(vm, 'binding', element, function () {
                            current = { vm: vm, element: element };
                            runHook(vm, 'ready', element);
                        });
                    });
                };

                require([ 'text!' + viewPath + '.html', viewModelPath ], function (view, ViewModel) {
                    element = window.document.createElement('div');
                    element.innerHTML = view;
                    vm = new ViewModel(context);
                    if (current) {
                        return runHook(current.vm, 'detaching', current.element, attach);
                    }
                    attach();
                });
            };
        }
    );
}());
