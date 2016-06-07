(function () {
    'use strict';

    define(
        [
            'knockout'
        ],
        function (ko) {
            return function (searchType, selectedSearchTypeObservable) {
                this.key = searchType.key;
                this.label = '<span class="small glyphicon glyphicon-' + searchType.glyphicon + '"></span> ' + searchType.labelText;
                this.placeholder = 'Search by ' + searchType.labelText + '...';
                this.active = ko.pureComputed(function () {
                    return selectedSearchTypeObservable() === searchType.key;
                });
                this.makeActive = function () {
                    selectedSearchTypeObservable(searchType.key);
                };
            };
        }
    );
}());
