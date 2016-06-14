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
                if (!parameters || !parameters.pager) {
                    throw new Error('ListControlsComponent missing required parameter: `pager`.');
                }
                if (!parameters.resultsMode) {
                    throw new Error('ListControlsComponent missing required parameter: `resultsMode`.');
                }
                if (!parameters.availableResultsModes) {
                    throw new Error('ListControlsComponent missing required parameter: `availableResultsModes`.');
                }
                if (!parameters.searchUrlFor) {
                    throw new Error('ListControlsComponent missing required parameter: `searchUrlFor`.');
                }

                this.availableResultsModes = ko.pureComputed(function () {
                    return _.map(
                        parameters.availableResultsModes(),
                        function (mode) {
                            var url = parameters.searchUrlFor({ mode: mode });
                            return {
                                label: mode,
                                glyphicon: 'glyphicon ' + RESULTS_MODE_GLYPHICONS[mode],
                                longLabel: 'Display results in ' + mode + ' mode',
                                url: url,
                                active: ko.pureComputed(function () {
                                    return mode === parameters.resultsMode();
                                }),
                                click: function () {
                                    window.history.pushState({}, window.title, url);
                                    parameters.resultsMode(mode);
                                    return false;
                                }
                            };
                        }
                    );
                });

                this.availablePageSizes = ko.pureComputed(function () {
                    return _.map(
                        parameters.pager.availablePageSizes(),
                        function (size) {
                            var url = parameters.searchUrlFor({ start: 0, size: size });
                            return {
                                label: size,
                                longLabel: 'Display ' + size + ' results per page',
                                url: url,
                                active: ko.pureComputed(function () {
                                    return size === parameters.pager.pageSize();
                                }),
                                click: function () {
                                    window.history.pushState({}, window.title, url);
                                    parameters.pager.pageSize(size);
                                    return false;
                                }
                            };
                        }
                    );
                });

                this.availableJumpPageNumbers = ko.pureComputed(function () {
                    return _.map(
                        parameters.pager.availableJumpPageNumbers(),
                        function (n) {
                            var target = n * parameters.pager.pageSize(),
                                url = parameters.searchUrlFor({ start: target });
                            return {
                                label: n + 1,
                                longLabel: 'Jump to page ' + (n + 1),
                                url: url,
                                active: ko.pureComputed(function () {
                                    return parameters.pager.pageNumber() === n;
                                }),
                                click: function () {
                                    window.history.pushState({}, window.title, url);
                                    parameters.pager.start(target);
                                    return false;
                                }
                            };
                        }
                    );
                });

                this.firstPageUrl = ko.pureComputed(function () {
                    return parameters.searchUrlFor({ start: parameters.pager.firstPageStart() });
                });

                this.lastPageUrl = ko.pureComputed(function () {
                    return parameters.searchUrlFor({ start: parameters.pager.lastPageStart() });
                });

                this.previousPageUrl = ko.pureComputed(function () {
                    return parameters.searchUrlFor({ start: parameters.pager.previousPageStart() });
                });

                this.nextPageUrl = ko.pureComputed(function () {
                    return parameters.searchUrlFor({ start: parameters.pager.nextPageStart() });
                });

                this.atFirstPage = ko.pureComputed(function () {
                    return parameters.pager.start() <= 0;
                });

                this.atLastPage = ko.pureComputed(function () {
                    return parameters.pager.start() >= parameters.pager.lastPageStart();
                });

                this.jumpToFirstPage = function () {
                    if (this.atFirstPage()) {
                        return false;
                    }
                    window.history.pushState({}, window.title, this.firstPageUrl());
                    parameters.pager.start(parameters.pager.firstPageStart());
                }.bind(this);

                this.jumpToLastPage = function () {
                    if (this.atLastPage()) {
                        return false;
                    }
                    window.history.pushState({}, window.title, this.lastPageUrl());
                    parameters.pager.start(parameters.pager.lastPageStart());
                }.bind(this);

                this.jumpToPreviousPage = function () {
                    if (this.atFirstPage()) {
                        return false;
                    }
                    window.history.pushState({}, window.title, this.previousPageUrl());
                    parameters.pager.start(parameters.pager.previousPageStart());
                }.bind(this);

                this.jumpToNextPage = function () {
                    if (this.atLastPage()) {
                        return false;
                    }
                    window.history.pushState({}, window.title, this.nextPageUrl());
                    parameters.pager.start(parameters.pager.nextPageStart());
                }.bind(this);
            };
        }
    );
}());
