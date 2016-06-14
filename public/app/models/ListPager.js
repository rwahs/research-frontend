(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            var PAGINATION_JUMP_COUNT = 7,
                DEFAULT_PAGE_SIZE = 12,
                DEFAULT_AVAILABLE_PAGE_SIZES = [ 12, 24, 48, 96 ];

            return function (sourceObservable, start, size, availablePageSizes) {
                this.start = ko.observable(start || 0);
                this.pageSize = ko.observable(size || DEFAULT_PAGE_SIZE);
                this.availablePageSizes = ko.observableArray(availablePageSizes || DEFAULT_AVAILABLE_PAGE_SIZES);

                this.fullResultsCount = ko.pureComputed(function () {
                    return sourceObservable().length;
                });

                this.pageCount = ko.pureComputed(function () {
                    return Math.ceil(sourceObservable().length / this.pageSize());
                }.bind(this));

                this.pageNumber = ko.pureComputed(function () {
                    return Math.floor(this.start() / this.pageSize());
                }.bind(this));

                this.currentPage = ko.pureComputed(function () {
                    var data = sourceObservable(),
                        start = this.start(),
                        pageSize = this.pageSize();
                    return data.slice(start, start + pageSize);
                }.bind(this));

                this.currentPageStart = ko.pureComputed(function () {
                    return this.currentPage() * this.pageSize();
                }.bind(this));

                this.availableJumpPageNumbers = ko.pureComputed(function () {
                    var pageJumpsPerSide = Math.floor(PAGINATION_JUMP_COUNT / 2),
                        first = Math.max(0, this.pageNumber() - pageJumpsPerSide),
                        last = Math.min(this.pageCount(), this.pageNumber() + 1 + pageJumpsPerSide);
                    if (first === 0) {
                        last = Math.min(this.pageCount(), PAGINATION_JUMP_COUNT);
                    }
                    if (last === this.pageCount()) {
                        first = Math.max(0, this.pageCount() - PAGINATION_JUMP_COUNT);
                    }
                    return _.range(first, last);
                }.bind(this));

                this.firstPageStart = ko.pureComputed(function () {
                    return 0;
                }.bind(this));

                this.lastPageStart = ko.pureComputed(function () {
                    return (this.pageCount() - 1) * this.pageSize();
                }.bind(this));

                this.previousPageStart = ko.pureComputed(function () {
                    return Math.max(0, this.start() - this.pageSize());
                }.bind(this));

                this.nextPageStart = ko.pureComputed(function () {
                    return Math.min(this.lastPageStart(), this.start() + this.pageSize());
                }.bind(this));
            };
        }
    );
}());
