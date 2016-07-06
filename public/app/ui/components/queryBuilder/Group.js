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
                    var op, fields;
                    op = '';
                    fields = _(this.children())
                        .map(function (child) {
                            if (child.text().length === 0) {
                                return undefined;
                            }
                            var text = op + ' ' + child.text();
                            op = this.selectedLogicalOperator();
                            return text.trim();
                        }.bind(this))
                        .filter()
                        .value();
                    return fields.length ? '(' + fields.join(' ') + ')' : '';
                }.bind(this));

                this.query = ko.pureComputed(function () {
                    return _(this.children())
                        .map(function (child) {
                            if (!child.query()) {
                                return undefined;
                            }
                            return child.query();
                        })
                        .filter()
                        .value();
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

            return Group;
        }
    );
}());
