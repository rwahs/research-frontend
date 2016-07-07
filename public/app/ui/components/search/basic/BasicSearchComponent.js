(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            return function (parameters) {
                var selectedSearchFieldKey;

                if (!parameters.fields || parameters.fields().length === 0) {
                    throw new Error('BasicSearchComponent missing required parameter: `fields`.');
                }
                if (!parameters.queryObservable) {
                    throw new Error('BasicSearchComponent missing required parameter: `queryObservable`.');
                }

                selectedSearchFieldKey = ko.observable(_.filter(parameters.fields(), 'basicSearch')[0].key);

                this.searchText = ko.observable(''); // TODO Set initial value

                this.searchText.subscribe(function () {
                    var text = this.searchText();
                    if (text.length === 0) {
                        return parameters.queryObservable(undefined);
                    }
                    parameters.queryObservable({
                        operator: 'AND',
                        children: _.map(
                            text.split(/\s+/),
                            function (term) {
                                return {
                                    field: selectedSearchFieldKey(),
                                    operator: 'contains',
                                    value: term
                                };
                            }
                        )
                    });
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
