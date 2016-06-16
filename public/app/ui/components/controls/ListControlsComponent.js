(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'config/routes'
        ],
        function (_, ko, routes) {
            var RESULTS_MODE_GLYPHICONS = {
                    List: 'glyphicon-list',
                    Thumbnails: 'glyphicon-th',
                    Table: 'glyphicon-list-alt'
                };

            return function (parameters) {
                if (!parameters) {
                    throw new Error('ListControlsComponent missing parameter map.');
                }
                if (!parameters.modeSwitcher) {
                    throw new Error('ListControlsComponent missing required parameter: `modeSwitcher`.');
                }
                if (!parameters.pager) {
                    throw new Error('ListControlsComponent missing required parameter: `pager`.');
                }
                if (!parameters.sorter) {
                    throw new Error('ListControlsComponent missing required parameter: `sorter`.');
                }
                if (!parameters.searchUrlFor) {
                    throw new Error('ListControlsComponent missing required parameter: `searchUrlFor`.');
                }

                this.sortField = ko.pureComputed({
                    read: function () {
                        return parameters.sorter.field();
                    },
                    write: function (field) {
                        routes.pushState(parameters.searchUrlFor({ sort: field || '' }));
                        parameters.sorter.field(field);
                    }
                });

                this.sortDirection = ko.pureComputed({
                    read: function () {
                        return parameters.sorter.direction();
                    },
                    write: function (direction) {
                        routes.pushState(parameters.searchUrlFor({ dir: direction }));
                        parameters.sorter.direction(direction);
                    }
                });

                this.pageSize = ko.pureComputed({
                    read: function () {
                        return parameters.pager.pageSize();
                    },
                    write: function (size) {
                        routes.pushState(parameters.searchUrlFor({ size: size }));
                        parameters.pager.pageSize(size);
                    }
                });

                this.availableSortFields = ko.pureComputed(function () {
                    return parameters.sorter.availableSortFields();
                });

                this.isAscending = ko.pureComputed(function () {
                    return parameters.sorter.direction() === 'asc';
                });

                this.isDescending = ko.pureComputed(function () {
                    return parameters.sorter.direction() === 'desc';
                });

                this.sortAscendingUrl = ko.pureComputed(function () {
                    return parameters.searchUrlFor({ dir: 'asc' });
                });

                this.sortDescendingUrl = ko.pureComputed(function () {
                    return parameters.searchUrlFor({ dir: 'desc' });
                });

                this.availableModes = ko.pureComputed(function () {
                    return _.map(
                        parameters.modeSwitcher.availableModes(),
                        function (mode) {
                            var url = parameters.searchUrlFor({ mode: mode });
                            return {
                                label: mode,
                                glyphicon: 'glyphicon ' + RESULTS_MODE_GLYPHICONS[mode],
                                longLabel: 'Display results in ' + mode + ' mode',
                                url: url,
                                active: ko.pureComputed(function () {
                                    return mode === parameters.modeSwitcher.mode();
                                }),
                                click: function () {
                                    routes.pushState(url);
                                    parameters.modeSwitcher.mode(mode);
                                    return false;
                                }
                            };
                        }
                    );
                });

                this.availablePageSizes = ko.pureComputed(function () {
                    return parameters.pager.availablePageSizes();
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
                                    routes.pushState(url);
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

                this.sortAscending = function () {
                    routes.pushState(this.sortAscendingUrl());
                    parameters.sorter.direction('asc');
                }.bind(this);

                this.sortDescending = function () {
                    routes.pushState(this.sortDescendingUrl());
                    parameters.sorter.direction('desc');
                }.bind(this);

                this.jumpToFirstPage = function () {
                    if (!this.atFirstPage()) {
                        routes.pushState(this.firstPageUrl());
                        parameters.pager.start(parameters.pager.firstPageStart());
                    }
                    return false;
                }.bind(this);

                this.jumpToLastPage = function () {
                    if (!this.atLastPage()) {
                        routes.pushState(this.lastPageUrl());
                        parameters.pager.start(parameters.pager.lastPageStart());
                    }
                    return false;
                }.bind(this);

                this.jumpToPreviousPage = function () {
                    if (!this.atFirstPage()) {
                        routes.pushState(this.previousPageUrl());
                        parameters.pager.start(parameters.pager.previousPageStart());
                    }
                    return false;
                }.bind(this);

                this.jumpToNextPage = function () {
                    if (!this.atLastPage()) {
                        routes.pushState(this.nextPageUrl());
                        parameters.pager.start(parameters.pager.nextPageStart());
                    }
                    return false;
                }.bind(this);
            };
        }
    );
}());
