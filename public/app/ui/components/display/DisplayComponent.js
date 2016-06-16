(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout'
        ],
        function (_, ko) {
            return function (parameters) {
                var defaultPlaceholder = (parameters.display === 'image') ?
                        '<span class="img-thumbnail img-placeholder"><span><span class="glyphicon glyphicon-picture"></span></span></span>' :
                        '&mdash;';

                if (!parameters.name) {
                    throw new Error('DisplayComponent missing required parameter: `name`.');
                }
                if (!parameters.data) {
                    throw new Error('DisplayComponent missing required parameter: `data`.');
                }

                this.value = ko.pureComputed(function () {
                    var data = ko.unwrap(parameters.data);
                    return data ? data[parameters.name] : undefined;
                }.bind(this));

                this.hasValue = ko.pureComputed(function () {
                    var value = this.value();
                    return !!value && (!_.isArray(value) || value.length > 0);
                }.bind(this));

                this.labelText = ko.pureComputed(function () {
                    return parameters.labelText;
                });

                this.placeholder = ko.pureComputed(function () {
                    return parameters.placeholder === false ? false : (parameters.placeholder || defaultPlaceholder);
                }.bind(this));
            };
        }
    );
}());
