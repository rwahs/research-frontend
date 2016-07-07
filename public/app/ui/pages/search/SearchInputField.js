(function () {
    'use strict';

    define(
        [
            'knockout'
        ],
        function (ko) {
            return function (field, selectedInputFieldObservable) {
                this.key = ko.pureComputed(function () {
                    return field.key;
                });

                this.basicSearch = ko.pureComputed(function () {
                    return field.basicSearch;
                });

                this.labelText = ko.pureComputed(function () {
                    return field.labelText;
                });

                this.glyphicon = ko.pureComputed(function () {
                    return '<span class="small glyphicon glyphicon-' + field.glyphicon + '"></span>';
                });

                this.placeholder = ko.pureComputed(function () {
                    return 'Search by ' + field.labelText + '...';
                });

                this.active = ko.pureComputed(function () {
                    return selectedInputFieldObservable() === field.key;
                });

                this.makeActive = function () {
                    selectedInputFieldObservable(field.key);
                };
            };
        }
    );
}());
