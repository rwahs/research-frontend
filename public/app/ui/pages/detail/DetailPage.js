(function () {
    'use strict';

    define(
        [
            'knockout',
            'util/container',
            'util/safelyParseJson'
        ],
        function (ko, container, parse) {
            return function (context, parameters) {
                var detail;

                this.data = ko.observable({});
                this.loading = ko.observable(false);
                this.parse = parse;

                detail = container.resolve(parameters.detailServiceKey);

                this.binding = function (element, callback) {
                    this.loading(true);
                    this.data({});
                    detail(context.params.id, function (err, data) {
                        this.loading(false);
                        if (err) {
                            // TODO Display error
                            return callback();
                        }
                        this.data(data);
                        callback();
                    }.bind(this));
                };
            };
        }
    );
}());
