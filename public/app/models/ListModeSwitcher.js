(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            var AVAILABLE_MODES = [ 'List', 'Thumbnails', 'Table' ];

            return function (mode) {
                this.mode = ko.observable(mode || AVAILABLE_MODES[0]);

                this.availableModes = ko.pureComputed(function () {
                    return AVAILABLE_MODES;
                });

                this.resultsContainerClassName = ko.pureComputed(function () {
                    return 'results-container-' + this.mode().toLowerCase();
                }.bind(this));
            };
        }
    );
}());
