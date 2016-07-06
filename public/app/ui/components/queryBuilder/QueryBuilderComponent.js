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
                            label: '= (equals)',
                            displayFormat: function (field, value) {
                                return field + ' EQUALS ' + value;
                            }
                        },
                        {
                            label: '!= (does not equal)',
                            displayFormat: function (field, value) {
                                return field + ' NOT-EQUALS ' + value;
                            }
                        },
                        {
                            label: '^ (starts with)',
                            displayFormat: function (field, value) {
                                return field + ' STARTS-WITH ' + value;
                            }
                        },
                        {
                            label: '!^ (does not start with)',
                            displayFormat: function (field, value) {
                                return field + ' NOT-STARTS-WITH ' + value;
                            }
                        },
                        {
                            label: '% (contains)',
                            displayFormat: function (field, value) {
                                return field + ' CONTAINS ' + value;
                            }
                        },
                        {
                            label: '!% (does not contain)',
                            displayFormat: function (field, value) {
                                return field + ' NOT-CONTAINS ' + value;
                            }
                        }
                    ];
                });

                this.maxDepth = ko.pureComputed(function () {
                    return parameters.maxDepth;
                });

                // the text() function is just an example to show output
                this.text = ko.computed(function () {
                    var root = this.root();
                    return root ? root.text() : undefined;
                }.bind(this));

                this.root(new Group(this));
            };
        }
    );
}());
