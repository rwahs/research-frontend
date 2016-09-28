(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'util/convertBasicSearch'
        ],
        function (_, ko, convertBasicSearch) {
            return function (parameters) {
                var selectedSearchFieldKey, initialProperties, getPropertiesFromQuery,
                    selectedSearchFieldKeySubscription, searchTextSubscription, querySubscription, operatorSubscription;

                // Inverse of `convertBasicSearch`.
                getPropertiesFromQuery = function (query) {
                    var selectedKey, selectedField;
                    if (!query || !query.children || query.children.length === 0) {
                        return undefined;
                    }
                    selectedKey = query.children[0].field;
                    if (!selectedKey) {
                        return undefined;
                    }
                    selectedField = _.find(parameters.fields(), { key: selectedKey });
                    if (!selectedField || !selectedField.basicSearch) {
                        return undefined;
                    }
                    return {
                        field: selectedKey,
                        text: _(query.children).filter({ field: selectedKey }).map('value').join(' '),
                        operator: query.operator
                    };
                };

                if (!parameters.fields || parameters.fields().length === 0) {
                    throw new Error('BasicSearchComponent missing required parameter: `fields`.');
                }
                if (!parameters.queryObservable || !ko.isObservable(parameters.queryObservable)) {
                    throw new Error('BasicSearchComponent missing or invalid required parameter: `queryObservable`.');
                }

                initialProperties = getPropertiesFromQuery(parameters.queryObservable());

                selectedSearchFieldKey = ko.observable(initialProperties && initialProperties.field ? initialProperties.field : parameters.fields()[0].key);
                selectedSearchFieldKeySubscription = selectedSearchFieldKey.subscribe(function (key) {
                    parameters.queryObservable(convertBasicSearch(key, this.searchText(), this.operator()));
                }.bind(this));

                this.searchText = ko.observable(initialProperties ? initialProperties.text : '');
                searchTextSubscription = this.searchText.subscribe(function (text) {
                    parameters.queryObservable(convertBasicSearch(selectedSearchFieldKey(), text, this.operator()));
                }.bind(this));

                querySubscription = parameters.queryObservable.subscribe(function (query) {
                    var properties = getPropertiesFromQuery(query);
                    selectedSearchFieldKey(properties ? properties.field : parameters.fields()[0].key);
                    this.searchText(properties ? properties.text : '');
                    this.operator(properties ? properties.operator : 'AND');
                }.bind(this));

                this.operator = ko.observable(initialProperties && initialProperties.operator ? initialProperties.operator : 'AND');
                operatorSubscription = this.operator.subscribe(function (operator) {
                    parameters.queryObservable(convertBasicSearch(selectedSearchFieldKey(), this.searchText(), operator));
                }.bind(this));

                this.displayedInputFields = ko.pureComputed(function () {
                    return _.filter(parameters.fields(), 'basicSearch');
                }.bind(this));

                this.displayFieldSwitch = ko.pureComputed(function () {
                    return this.displayedInputFields() && this.displayedInputFields().length > 1;
                }.bind(this));

                this.selectedSearchField = ko.pureComputed(function () {
                    return _.find(this.displayedInputFields(), { key: selectedSearchFieldKey() });
                }.bind(this));

                this.placeholder = ko.pureComputed(function () {
                    return 'Search by ' + this.selectedSearchField().labelText + '...';
                }.bind(this));

                this.displayLostQueryWarning = ko.pureComputed(function () {
                    var query = convertBasicSearch(selectedSearchFieldKey(), this.searchText(), this.operator());
                    return !_.isEqual(query, parameters.queryObservable());
                }.bind(this));

                this.dispose = function () {
                    if (selectedSearchFieldKeySubscription) {
                        selectedSearchFieldKeySubscription.dispose();
                    }
                    if (searchTextSubscription) {
                        searchTextSubscription.dispose();
                    }
                    if (querySubscription) {
                        querySubscription.dispose();
                    }
                    if (operatorSubscription) {
                        operatorSubscription.dispose();
                    }
                };

                this.isSelectedSearchField = function (field) {
                    return selectedSearchFieldKey() === field.key;
                };

                this.selectSearchField = function (field) {
                    selectedSearchFieldKey(field.key);
                };

                this.glyphiconCssFor = function (field) {
                    var css = { small: true };
                    if (field.glyphicon) {
                        css.glyphicon = true;
                        css['glyphicon-' + field.glyphicon] = true;
                    }
                    return css;
                };
            };
        }
    );
}());
