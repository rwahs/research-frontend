(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            var RESULTS_MODE_GLYPHICONS = {
                    List: 'glyphicon-list',
                    Thumbnails: 'glyphicon-th',
                    Table: 'glyphicon-list-alt'
                };

            return function (parameters) {
                var parent = parameters.parent;

                if (!parent) {
                    throw new Error('ListControlsComponent missing required parameter: `parent`.');
                }

                this.availableResultsModes = ko.pureComputed(function () {
                    return _.map(
                        parent.availableResultsModes(),
                        function (mode) {
                            var url = parent.searchUrlFor({ mode: mode });
                            return {
                                label: mode,
                                glyphicon: 'glyphicon ' + RESULTS_MODE_GLYPHICONS[mode],
                                longLabel: 'Display results in ' + mode + ' mode',
                                url: url,
                                active: ko.pureComputed(function () {
                                    return mode === parent.resultsMode();
                                }),
                                click: function () {
                                    window.history.pushState({}, window.title, url);
                                    parent.resultsMode(mode);
                                    return false;
                                }
                            };
                        }
                    );
                });

                this.availablePageSizes = ko.pureComputed(function () {
                    return _.map(
                        parent.pager.availablePageSizes(),
                        function (size) {
                            var url = parent.searchUrlFor({ start: 0, size: size });
                            return {
                                label: size,
                                longLabel: 'Display ' + size + ' results per page',
                                url: url,
                                active: ko.pureComputed(function () {
                                    return size === parent.pager.pageSize();
                                }),
                                click: function () {
                                    window.history.pushState({}, window.title, url);
                                    parent.pager.pageSize(size);
                                    return false;
                                }
                            };
                        }
                    );
                });

                this.availableJumpPageNumbers = ko.pureComputed(function () {
                    return _.map(
                        parent.pager.availableJumpPageNumbers(),
                        function (n) {
                            var target = n * parent.pager.pageSize(),
                                url = parent.searchUrlFor({ start: target });
                            return {
                                label: n + 1,
                                longLabel: 'Jump to Page ' + (n + 1),
                                url: url,
                                active: ko.pureComputed(function () {
                                    return parent.pager.pageNumber() === n;
                                }),
                                click: function () {
                                    window.history.pushState({}, window.title, url);
                                    parent.pager.start(target);
                                    return false;
                                }
                            };
                        }
                    );
                });

                this.firstPageUrl = ko.pureComputed(function () {
                    return parent.searchUrlFor({ start: parent.pager.firstPageStart() });
                });

                this.lastPageUrl = ko.pureComputed(function () {
                    return parent.searchUrlFor({ start: parent.pager.lastPageStart() });
                });

                this.previousPageUrl = ko.pureComputed(function () {
                    return parent.searchUrlFor({ start: parent.pager.previousPageStart() });
                });

                this.nextPageUrl = ko.pureComputed(function () {
                    return parent.searchUrlFor({ start: parent.pager.nextPageStart() });
                });

                this.atFirstPage = ko.pureComputed(function () {
                    return parent.pager.start() <= 0;
                });

                this.atLastPage = ko.pureComputed(function () {
                    return parent.pager.start() >= parent.pager.lastPageStart();
                });

                this.jumpToFirstPage = function () {
                    if (this.atFirstPage()) {
                        return false;
                    }
                    window.history.pushState({}, window.title, this.firstPageUrl());
                    parent.pager.start(parent.pager.firstPageStart());
                }.bind(this);

                this.jumpToLastPage = function () {
                    if (this.atLastPage()) {
                        return false;
                    }
                    window.history.pushState({}, window.title, this.lastPageUrl());
                    parent.pager.start(parent.pager.lastPageStart());
                }.bind(this);

                this.jumpToPreviousPage = function () {
                    if (this.atFirstPage()) {
                        return false;
                    }
                    window.history.pushState({}, window.title, this.previousPageUrl());
                    parent.pager.start(parent.pager.previousPageStart());
                }.bind(this);

                this.jumpToNextPage = function () {
                    if (this.atLastPage()) {
                        return false;
                    }
                    window.history.pushState({}, window.title, this.nextPageUrl());
                    parent.pager.start(parent.pager.nextPageStart());
                }.bind(this);
            };
        }
    );
}());
