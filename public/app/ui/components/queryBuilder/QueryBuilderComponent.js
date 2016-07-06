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
                            label: '~ (contains)',
                            displayFormat: function (field, value) {
                                return field + ' CONTAINS ' + value;
                            },
                            queryFormat: function (value) {
                                return '"' + value + '"';
                            }
                        },
                        {
                            label: '!~ (does not contain)',
                            displayFormat: function (field, value) {
                                return field + ' NOT-CONTAINS ' + value;
                            },
                            queryFormat: function (value) {
                                return '-"' + value + '"';
                            }
                        },
                        {
                            label: '^ (starts with)',
                            displayFormat: function (field, value) {
                                return field + ' STARTS-WITH ' + value;
                            },
                            queryFormat: function (value) {
                                return '"' + value + '"*';
                            }
                        },
                        {
                            label: '!^ (does not start with)',
                            displayFormat: function (field, value) {
                                return field + ' NOT-STARTS-WITH ' + value;
                            },
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

                this.query.subscribe(parameters.queryObservable);

                this.root(new Group(this));
            };
        }
    );
}());
