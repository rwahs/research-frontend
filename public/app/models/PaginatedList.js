(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            var PAGINATION_JUMP_COUNT = 7,
                DEFAULT_PAGE_SIZE = 12;

            return function (sourceObservable, start, size, generateUrl, changeUrl) {
                this.start = ko.observable(start || 0);
                this.pageSize = ko.observable(size || DEFAULT_PAGE_SIZE);

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
                    var list = this,
                        first = Math.max(0, this.pageNumber() - PAGINATION_JUMP_COUNT),
                        last = Math.min(this.pageCount(), this.pageNumber() + 1 + PAGINATION_JUMP_COUNT);
                    if (first === 0) {
                        last = Math.min(this.pageCount(), PAGINATION_JUMP_COUNT);
                    }
                    if (last === this.pageCount()) {
                        first = Math.max(0, this.pageCount() - PAGINATION_JUMP_COUNT);
                    }
                    return _.map(
                        _.range(first, last),
                        function (n) {
                            return {
                                label: n + 1,
                                longLabel: 'Jump to Page ' + (n + 1),
                                url: generateUrl(n * list.pageSize()),
                                active: ko.pureComputed(function () {
                                    return list.pageNumber() === n;
                                }),
                                jump: function () {
                                    changeUrl(generateUrl(n * list.pageSize()));
                                    list.start(n * list.pageSize());
                                    return false;
                                }
                            };
                        }
                    );
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

                this.firstPageUrl = ko.pureComputed(function () {
                    return generateUrl(this.firstPageStart());
                }.bind(this));

                this.lastPageUrl = ko.pureComputed(function () {
                    return generateUrl(this.lastPageStart());
                }.bind(this));

                this.previousPageUrl = ko.pureComputed(function () {
                    return generateUrl(this.previousPageStart());
                }.bind(this));

                this.nextPageUrl = ko.pureComputed(function () {
                    return generateUrl(this.nextPageStart());
                }.bind(this));

                this.atFirstPage = ko.pureComputed(function () {
                    return this.start() <= 0;
                }.bind(this));

                this.atLastPage = ko.pureComputed(function () {
                    return this.start() >= this.lastPageStart();
                }.bind(this));

                this.jumpToFirstPage = function () {
                    if (this.atFirstPage()) {
                        return false;
                    }
                    changeUrl(this.firstPageUrl());
                    this.start(this.firstPageStart());
                }.bind(this);

                this.jumpToLastPage = function () {
                    if (this.atLastPage()) {
                        return false;
                    }
                    changeUrl(this.lastPageUrl());
                    this.start(this.lastPageStart());
                }.bind(this);

                this.jumpToPreviousPage = function () {
                    if (this.atFirstPage()) {
                        return false;
                    }
                    changeUrl(this.previousPageUrl());
                    this.start(this.previousPageStart());
                }.bind(this);

                this.jumpToNextPage = function () {
                    if (this.atLastPage()) {
                        return false;
                    }
                    changeUrl(this.nextPageUrl());
                    this.start(this.nextPageStart());
                }.bind(this);
            };
        }
    );
}());
