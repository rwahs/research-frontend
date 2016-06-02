(function () {
    'use strict';

    require.config({
        urlArgs: 'm=' + (new Date()).getTime(),
        paths: {
            // Test modules
            mocha: '../node_modules/mocha/mocha',
            chai: '../node_modules/chai/chai',
            sinon: '../node_modules/sinon/lib/sinon',

            // RequireJS extensions
            text: '../public/lib/text/text',

            // Vendor libraries
            knockout: '../public/lib/knockout/dist/knockout.debug',
            lodash: '../public/lib/lodash/lodash',
            jquery: '../public/lib/jquery/dist/jquery',
            bootstrap: '../public/lib/bootstrap/dist/js/bootstrap',
            typeahead: '../public/lib/typeahead.js/dist/typeahead.jquery',
            bloodhound: '../public/lib/typeahead.js/dist/bloodhound',
            page: '../public/lib/page/page',

            // Application modules
            config: '../public/app/config/',
            models: '../public/app/models/',
            services: '../public/app/services/',
            ui: '../public/app/ui/',
            util: '../public/app/util/',

            // Test specs, mocks and fixtures
            spec: 'spec/',
            mock: 'mock/',
            fixtures: 'fixtures/'
        },
        shim: {
            bloodhound: {
                exports: 'Bloodhound'
            },
            typeahead: {
                deps: [ 'jquery' ]
            },
            mocha: {
                init: function () {
                    // https://gist.github.com/michaelcox/3800736
                    // https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
                    return this.mocha.setup({
                        ui: 'bdd',
                        reporter: /phantom/i.test(window.navigator.userAgent) ? 'spec' : 'html'
                    });
                }
            }
        }
    });

    require(
        [
            'mocha'
        ],
        function (mocha) {
            require(
                [
                    'spec/config/env/development.spec',
                    'spec/config/env/staging.spec',
                    'spec/config/search/library/resultFields.spec',
                    'spec/config/search/library/searchTypes.spec',
                    'spec/config/search/memorials/resultFields.spec',
                    'spec/config/search/memorials/searchTypes.spec',
                    'spec/config/search/museum/resultFields.spec',
                    'spec/config/search/museum/searchTypes.spec',
                    'spec/config/search/photographs/resultFields.spec',
                    'spec/config/search/photographs/searchTypes.spec',
                    'spec/services/searchService.spec',
                    'spec/services/detailService.spec',
                    'spec/ui/pages/detail/DetailPage.spec',
                    'spec/ui/pages/error/ErrorPage.spec',
                    'spec/ui/pages/static/StaticPage.spec',
                    'spec/ui/pages/search/SearchPage.spec',
                    'spec/ui/pages/search/SearchMapper.spec',
                    'spec/util/container.spec',
                    'spec/util/router.spec',
                    'spec/util/safelyParseJson.spec'
                ],
                function () {
                    // See https://github.com/nathanboktae/mocha-phantomjs-core/issues/12
                    window.initMochaPhantomJS();
                    mocha.run();
                }
            );
        }
    );
}());
