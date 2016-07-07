// Based on http://kindohm.github.io/knockout-query-builder/js/group.js
(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'models/query/Condition'
        ],
        function (_, ko, Condition) {
            var Group;

            Group = function (queryBuilder, parentGroup) {
                this.children = ko.observableArray();
                this.selectedLogicalOperator = ko.observable();

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

                this.depth = ko.pureComputed(function () {
                    return parentGroup ? 1 + parentGroup.depth() : 0;
                });

                this.allowChildren = ko.pureComputed(function () {
                    return this.depth() + 1 < queryBuilder.maxDepth();
                }.bind(this));

                this.text = ko.pureComputed(function () {
                    var fields;
                    fields = _(this.children()).invokeMap('text').filter().value();
                    return fields.length ? '(' + fields.join(' ' + this.selectedLogicalOperator() + ' ') + ')' : '';
                }.bind(this));

                this.query = ko.pureComputed(function () {
                    return {
                        operator: this.selectedLogicalOperator(),
                        children: _(this.children()).invokeMap('query').filter().value()
                    };
                }.bind(this));

                this.parse = function (query) {
                    if (!query) {
                        return;
                    }
                    if (!query.operator) {
                        throw new Error('Cannot parse Group query, missing `operator`');
                    }
                    if (!query.children) {
                        throw new Error('Cannot parse Group query, missing `children`');
                    }
                    this.selectedLogicalOperator(query.operator);
                    this.children(_.map(query.children, function (child) {
                        var childNode;
                        if (child.operator && child.children) {
                            childNode = new Group(queryBuilder, this);
                        } else if (child.field && child.comparator && child.value) {
                            childNode = new Condition(queryBuilder);
                        } else {
                            throw new Error('Cannot parse Group query, invalid data encountered in query structure: ' + JSON.stringify(child));
                        }
                        childNode.parse(child);
                        return childNode;
                    }));
                };

                this.addCondition = function () {
                    this.children.push(new Condition(queryBuilder));
                }.bind(this);

                this.addGroup = function () {
                    this.children.push(new Group(queryBuilder, this));
                }.bind(this);

                this.removeChild = function (child) {
                    this.children.remove(child);
                }.bind(this);

                this.children.push(new Condition(queryBuilder));
                this.selectedLogicalOperator(this.logicalOperators()[0]);
            };

            return Group;
        }
    );
}());
