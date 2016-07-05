(function () {
    'use strict';

    // Initialise RequireJS module loader
    require.config({
        urlArgs: 'm=' + (new Date()).getTime(),
        baseUrl: '/app/',
        paths: {
            // RequireJS extensions
            text: '../lib/text/text',

            // Vendor libraries
            knockout: '../lib/knockout/dist/knockout.debug',
            lodash: '../lib/lodash/lodash',
            jquery: '../lib/jquery/dist/jquery',
            bootstrap: '../lib/bootstrap/dist/js/bootstrap',
            page: '../lib/page/page',
            querystring: '../lib/querystring/querystring',

            // Application modules
            config: 'config/',
            models: 'models/',
            services: 'services/',
            ui: 'ui/',
            util: 'util/'
        }
    });

    // Boot the application
    require([ 'jquery', 'knockout' ], function ($, ko) {
        require([ 'bootstrap' ], function () {
            // This value is replaced during the packaging process.
            var environment = 'development';
            if (environment !== 'production' && console && typeof console.log === 'function') {
                console.log('Running in "' + environment + '" environment');
            }
            require(
                [
                    'util/container',
                    'config/types',
                    'config/settings',
                    'config/env/' + environment,
                    'config/components',
                    'config/routes',
                    'text!ui/shell.html'
                ],
                function (container, types, settings, env, components, routes, shellView) {
                    types();
                    settings();
                    env();
                    components();
                    ko.applyBindings(undefined, $('#application-container').html(shellView)[0]);
                    routes();
                    container.seal();
                }
            );
        });
    });
}());
