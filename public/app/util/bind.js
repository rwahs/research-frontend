(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            var current,
                applicationContainer = document.getElementById('application-container');

            return function (viewPath, viewModelPath, context) {
                var element, vm, runHook, attach;

                runHook = function (vm, hook, element, callback) {
                    callback = callback || _.noop;
                    if (_.isFunction(vm[hook])) {
                        return vm[hook](element, callback);
                    }
                    callback();
                };

                attach = function () {
                    runHook(vm, 'attaching', element, function () {
                        applicationContainer.innerHTML = '';
                        applicationContainer.appendChild(element);
                        ko.applyBindings(vm, element);
                        runHook(vm, 'binding', element, function () {
                            current = { vm: vm, element: element };
                            runHook(vm, 'ready', element);
                        });
                    });
                };

                require([ 'text!' + viewPath + '.html', viewModelPath ], function (view, ViewModel) {
                    element = document.createElement('div');
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
