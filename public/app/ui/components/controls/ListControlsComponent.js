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
                if (!parameters || !parameters.pager) {
                    throw new Error('ListControlsComponent missing required parameter: `pager`.');
                }
                if (!parameters.sorter) {
                    throw new Error('ListControlsComponent missing required parameter: `sorter`.');
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

                this.availableSortFields = ko.pureComputed(function () {
                    return _.flatten(_.map(
                        parameters.sorter.availableSortFields(),
                        function (field) {
                            return [
                                {
                                    label: field.labelText + ' asc',
                                    longLabel: 'Sort ascending by ' + field.labelText,
                                    value: field.key + '-asc',
                                    active: ko.pureComputed(function () {
                                        return field.key === parameters.sorter.field();
                                    }),
                                    click: function () {
                                        routes.pushState(parameters.searchUrlFor({ sort: field.key, dir: 'asc' }));
                                        parameters.sorter.field(field.key);
                                        parameters.sorter.direction('asc');
                                        return false;
                                    }
                                },
                                {
                                    label: field.labelText + ' desc',
                                    longLabel: 'Sort descending by ' + field.labelText,
                                    value: field.key + '-desc',
                                    active: ko.pureComputed(function () {
                                        return field.key === parameters.sorter.field();
                                    }),
                                    click: function () {
                                        routes.pushState(parameters.searchUrlFor({ sort: field.key, dir: 'desc' }));
                                        parameters.sorter.field(field.key);
                                        parameters.sorter.direction('desc');
                                        return false;
                                    }
                                }
                            ];
                        }
                    ));
                });

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
                                    routes.pushState(url);
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
                                    routes.pushState(url);
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

                this.resetSort = function () {
                    parameters.sorter.field(null);
                    parameters.sorter.direction(null);
                };

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
