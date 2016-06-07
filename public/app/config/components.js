(function () {
    'use strict';

    define(
        [
            'knockout'
        ],
        function (ko) {
            return function () {
                ko.components.register(
                    'display/text',
                    {
                        viewModel: { require: 'ui/components/display/DisplayComponent' },
                        template: { require: 'text!ui/components/display/text.html' }
                    }
                );

                ko.components.register(
                    'display/html',
                    {
                        viewModel: { require: 'ui/components/display/DisplayComponent' },
                        template: { require: 'text!ui/components/display/html.html' }
                    }
                );

                ko.components.register(
                    'display/list',
                    {
                        viewModel: { require: 'ui/components/display/DisplayComponent' },
                        template: { require: 'text!ui/components/display/list.html' }
                    }
                );

                ko.components.register(
                    'display/typed-list',
                    {
                        viewModel: { require: 'ui/components/display/DisplayComponent' },
                        template: { require: 'text!ui/components/display/typed-list.html' }
                    }
                );

                ko.components.register(
                    'display/hierarchy',
                    {
                        viewModel: { require: 'ui/components/display/DisplayComponent' },
                        template: { require: 'text!ui/components/display/hierarchy.html' }
                    }
                );

                ko.components.register(
                    'display/hierarchy-list',
                    {
                        viewModel: { require: 'ui/components/display/DisplayComponent' },
                        template: { require: 'text!ui/components/display/hierarchy-list.html' }
                    }
                );
            };
        }
    );
}());
