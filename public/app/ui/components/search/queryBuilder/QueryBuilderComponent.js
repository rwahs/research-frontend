// Based on http://kindohm.github.io/knockout-query-builder/js/viewModel.js
(function () {
    'use strict';

    define(
        [
            'knockout',
            'models/query/Group',
            'models/query/Condition'
        ],
        function (ko, Group, Condition) {
            return function (parameters) {
                var root;

                if (!parameters.queryObservable || !ko.isObservable(parameters.queryObservable)) {
                    throw new Error('QueryBuilderComponent missing or invalid required parameter: `queryObservable`.');
                }
                if (!parameters.fields || parameters.fields().length === 0) {
                    throw new Error('QueryBuilderComponent missing required parameter: `fields`.');
                }
                if (!parameters.maxDepth) {
                    throw new Error('QueryBuilderComponent missing required parameter: `maxDepth`.');
                }

                root = new Group(this);
                root.parse(parameters.queryObservable());
                root.query.subscribe(parameters.queryObservable);

                this.root = ko.pureComputed(function () {
                    return root;
                });

                this.fields = ko.pureComputed(function () {
                    return parameters.fields();
                });

                this.maxDepth = ko.pureComputed(function () {
                    return parameters.maxDepth;
                });

                this.templateFor = function (node) {
                    if (node instanceof Group) {
                        return 'group-template';
                    }
                    if (node instanceof Condition) {
                        return 'condition-template';
                    }
                };
            };
        }
    );
}());
