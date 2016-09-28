// Based on http://kindohm.github.io/knockout-query-builder/js/viewModel.js
(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'models/query/Group',
            'models/query/Condition'
        ],
        function (_, ko, Group, Condition) {
            return function (parameters) {
                var root, rootSubscription;

                if (!parameters.queryObservable || !ko.isObservable(parameters.queryObservable)) {
                    throw new Error('QueryBuilderComponent missing or invalid required parameter: `queryObservable`.');
                }
                if (!parameters.submit || !_.isFunction(parameters.submit)) {
                    throw new Error('QueryBuilderComponent missing or invalid required parameter: `submit`.');
                }
                if (!parameters.fields || parameters.fields().length === 0) {
                    throw new Error('QueryBuilderComponent missing required parameter: `fields`.');
                }
                if (!parameters.comparators || parameters.comparators().length === 0) {
                    throw new Error('QueryBuilderComponent missing required parameter: `comparators`.');
                }
                if (!parameters.maxDepth) {
                    throw new Error('QueryBuilderComponent missing required parameter: `maxDepth`.');
                }

                root = new Group(this);

                this.root = ko.pureComputed(function () {
                    return root;
                });

                this.fields = ko.pureComputed(function () {
                    return parameters.fields();
                });

                this.comparators = ko.pureComputed(function () {
                    return parameters.comparators();
                });

                this.maxDepth = ko.pureComputed(function () {
                    return parameters.maxDepth;
                });

                this.dispose = function () {
                    if (rootSubscription) {
                        rootSubscription.dispose();
                    }
                };

                this.templateFor = function (node) {
                    if (node instanceof Group) {
                        return 'group-template';
                    }
                    if (node instanceof Condition) {
                        return 'condition-template';
                    }
                };

                this.keypressHandler = function (ignore, evt) {
                    if (evt.keyCode === 13) {
                        parameters.submit();
                        return false;
                    }
                    return true;
                };

                // Parse the initial query.
                root.parse(parameters.queryObservable());
                rootSubscription = root.query.subscribe(parameters.queryObservable);
            };
        }
    );
}());
