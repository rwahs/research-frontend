(function () {
    'use strict';

    define(
        [
            'knockout'
        ],
        function (ko) {
            return function () {
                ko.components.register(
                    'collections/library/detail',
                    { template: { require: 'text!ui/components/collections/library/detail.html' } }
                );

                ko.components.register(
                    'collections/library/list-result',
                    { template: { require: 'text!ui/components/collections/library/list-result.html' } }
                );

                ko.components.register(
                    'collections/memorials/detail',
                    { template: { require: 'text!ui/components/collections/memorials/detail.html' } }
                );

                ko.components.register(
                    'collections/memorials/list-result',
                    { template: { require: 'text!ui/components/collections/memorials/list-result.html' } }
                );

                ko.components.register(
                    'collections/museum/detail',
                    { template: { require: 'text!ui/components/collections/museum/detail.html' } }
                );

                ko.components.register(
                    'collections/museum/list-result',
                    { template: { require: 'text!ui/components/collections/museum/list-result.html' } }
                );

                ko.components.register(
                    'collections/photographs/detail',
                    { template: { require: 'text!ui/components/collections/photographs/detail.html' } }
                );

                ko.components.register(
                    'collections/photographs/list-result',
                    { template: { require: 'text!ui/components/collections/photographs/list-result.html' } }
                );

                ko.components.register(
                    'controls/list',
                    {
                        viewModel: { require: 'ui/components/controls/ListControlsComponent' },
                        template: { require: 'text!ui/components/controls/list-controls.html' }
                    }
                );

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

                ko.components.register(
                    'display/image',
                    {
                        viewModel: { require: 'ui/components/display/DisplayComponent' },
                        template: { require: 'text!ui/components/display/image.html' }
                    }
                );
            };
        }
    );
}());
