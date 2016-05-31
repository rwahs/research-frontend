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
            typeahead: '../lib/typeahead.js/dist/typeahead.jquery',
            bloodhound: '../lib/typeahead.js/dist/bloodhound',
            page: '../lib/page/page',

            // Application modules
            config: 'config/',
            models: 'models/',
            services: 'services/',
            ui: 'ui/',
            util: 'util/'
        },
        shim: {
            bloodhound: {
                exports: 'Bloodhound'
            },
            typeahead: {
                deps: [ 'jquery' ]
            }
        }
    });

    // Boot the application
    require([ 'jquery' ], function () {
        require([ 'bootstrap' ], function () {
            var environment = 'development';
            if (environment !== 'production') {
                console.log('Running in "' + environment + '" environment');
            }
            require([ 'config/env/' + environment, 'util/router' ], function (configure, router) {
                configure();
                router();
            });
        });
    });
}());
