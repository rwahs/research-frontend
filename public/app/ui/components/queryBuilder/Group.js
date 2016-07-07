// Based on http://kindohm.github.io/knockout-query-builder/js/group.js
(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'ui/components/queryBuilder/Condition'
        ],
        function (_, ko, Condition) {
            var Group;

            Group = function (queryBuilder, parentGroup) {
                this.templateName = 'group-template';
                this.children = ko.observableArray();
                this.selectedLogicalOperator = ko.observable();

                this.logicalOperators = ko.pureComputed(function () {
                    return queryBuilder.logicalOperators();
                });

                this.depth = ko.pureComputed(function () {
                    return parentGroup ? 1 + parentGroup.depth() : 0;
                });

                this.text = ko.pureComputed(function () {
                    var fields;
                    fields = _(this.children()).invokeMap('text').filter().value();
                    return fields.length ? '(' + fields.join(' ' + this.selectedLogicalOperator() + ' ') + ')' : '';
                }.bind(this));

                this.query = ko.pureComputed(function () {
                    return {
                        operator: this.selectedLogicalOperator(),
                        children: _(this.children())
                            .map(function (child) {
                                if (!child.query()) {
                                    return undefined;
                                }
                                return child.query();
                            })
                            .filter()
                            .value()
                    };
                }.bind(this));

                this.allowChildren = ko.pureComputed(function () {
                    return this.depth() + 1 < queryBuilder.maxDepth();
                }.bind(this));

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

            Group.parse = function (query, queryBuilder, parentGroup) {
                var group;
                if (!query.operator) {
                    throw new Error('Cannot parse Group query, missing `operator`');
                }
                if (!query.children) {
                    throw new Error('Cannot parse Group query, missing `children`');
                }
                group = new Group(queryBuilder, parentGroup);
                group.selectedLogicalOperator(query.operator);
                group.children(_.map(query.children, function (child) {
                    if (child.operator && child.children) {
                        return Group.parse(child, queryBuilder, group);
                    }
                    if (child.field && child.comparator && child.value) {
                        return Condition.parse(child, queryBuilder);
                    }
                    throw new Error('Cannot parse Group query, invalid data encountered in query structure: ' + JSON.stringify(child));
                }));
                return group;
            };

            return Group;
        }
    );
}());
