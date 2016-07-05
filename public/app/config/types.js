(function () {
    'use strict';

    define(
        [
            'util/container'
        ],
        function (container) {
            return function () {
                container.register('types', {
                    'Library Record': 'library',
                    'Photograph': 'photographs',
                    'Public Memorial': 'memorials',
                    'Museum Record': 'museum',
                    'Museum Artefact': 'museum',
                    'Costume': 'museum',
                    'Artwork': 'museum'
                });
            };
        }
    );
}());
