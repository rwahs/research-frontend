// Based on http://kindohm.github.io/knockout-query-builder/js/viewModel.js
(function () {
    'use strict';

    define(
        [
            'knockout',
            'ui/components/queryBuilder/Group'
        ],
        function (ko, Group) {
            return function (parameters) {
                if (!parameters.fields) {
                    throw new Error('QueryBuilderComponent missing required parameter: `fields`.');
                }
                if (!parameters.maxDepth) {
                    throw new Error('QueryBuilderComponent missing required parameter: `maxDepth`.');
                }
                if (!parameters.queryObservable) {
                    throw new Error('QueryBuilderComponent missing required parameter: `queryObservable`.');
                }

                this.root = ko.observable();

                this.logicalOperators = ko.pureComputed(function () {
                    return [
                        {
                            label: 'and',
                            value: 'AND'
                        },
                        {
                            label: 'or',
                            value: 'OR'
                        }
                    ];
                });

                this.fields = ko.pureComputed(function () {
                    return parameters.fields();
                });

                this.comparators = ko.pureComputed(function () {
                    return [
                        {
                            key: 'contains',
                            label: 'contains',
                            queryFormat: function (value) {
                                return '"' + value + '"';
                            }
                        },
                        {
                            key: '!contains',
                            label: 'does not contain',
                            queryFormat: function (value) {
                                return '-"' + value + '"';
                            }
                        },
                        {
                            key: 'starts',
                            label: 'starts with',
                            queryFormat: function (value) {
                                return '"' + value + '"*';
                            }
                        },
                        {
                            key: '!starts',
                            label: 'does not start with',
                            queryFormat: function (value) {
                                return '-"' + value + '"*';
                            }
                        }
                    ];
                });

                this.maxDepth = ko.pureComputed(function () {
                    return parameters.maxDepth;
                });

                this.text = ko.pureComputed(function () {
                    var root = this.root();
                    return root ? root.text() : undefined;
                }.bind(this));

                this.query = ko.pureComputed(function () {
                    var root = this.root();
                    return root ? root.query() : undefined;
                }.bind(this));

                if (parameters.queryObservable()) {
                    this.root(Group.parse(parameters.queryObservable(), this));
                } else {
                    this.root(new Group(this));
                }

                this.query.subscribe(parameters.queryObservable);
            };
        }
    );
}());
