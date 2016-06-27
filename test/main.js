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
            page: '../public/lib/page/page',
            querystring: '../public/lib/querystring/querystring',

            // Application modules
            config: '../public/app/config/',
            models: '../public/app/models/',
            services: '../public/app/services/',
            ui: '../public/app/ui/',
            util: '../public/app/util/',

            // Test specs, mocks and fixtures
            spec: 'spec/',
            fixtures: 'fixtures/'
        },
        shim: {
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
                    // TODO Dynamically generate this list using `gulp`.
                    'spec/config/env/development.spec',
                    'spec/config/env/staging.spec',
                    'spec/config/env/uat.spec',
                    'spec/config/collections/library/detailFields.spec',
                    'spec/config/collections/library/searchResultFields.spec',
                    'spec/config/collections/library/searchTypes.spec',
                    'spec/config/collections/memorials/detailFields.spec',
                    'spec/config/collections/memorials/searchResultFields.spec',
                    'spec/config/collections/memorials/searchTypes.spec',
                    'spec/config/collections/museum/detailFields.spec',
                    'spec/config/collections/museum/searchResultFields.spec',
                    'spec/config/collections/museum/searchTypes.spec',
                    'spec/config/collections/photographs/detailFields.spec',
                    'spec/config/collections/photographs/searchResultFields.spec',
                    'spec/config/collections/photographs/searchTypes.spec',
                    'spec/config/components.spec',
                    'spec/config/routes.spec',
                    'spec/config/settings.spec',
                    'spec/models/DynamicRecord.spec',
                    'spec/models/ListPager.spec',
                    'spec/models/ListSorter.spec',
                    'spec/models/ListModeSwitcher.spec',
                    'spec/services/cachingService.spec',
                    'spec/services/searchService.spec',
                    'spec/services/detailService.spec',
                    'spec/ui/responsive.spec',
                    'spec/ui/components/controls/ListControlsComponent.spec',
                    'spec/ui/components/display/DisplayComponent.spec',
                    'spec/ui/pages/detail/DetailPage.spec',
                    'spec/ui/pages/error/ErrorPage.spec',
                    'spec/ui/pages/search/SearchPage.spec',
                    'spec/ui/pages/search/SearchType.spec',
                    'spec/ui/pages/static/StaticPage.spec',
                    'spec/util/bind.spec',
                    'spec/util/container.spec',
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
