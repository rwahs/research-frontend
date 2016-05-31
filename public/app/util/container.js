(function () {
    'use strict';

    define(
        [
        ],
        function () {
            var registry = {},
                sealed = false;

            return {
                register: function (key, object) {
                    if (sealed) {
                        throw 'Attempt to register "' + key + '" after container is sealed';
                    }
                    if (this.isRegistered(key)) {
                        throw 'Attempt to register "' + key + '" already registered';
                    }
                    registry[key] = object;
                },

                isRegistered: function (key) {
                    return !!registry[key];
                },

                resolve: function (key) {
                    if (!this.isRegistered(key)) {
                        throw 'Attempt to resolve "' + key + '" not registered';
                    }
                    return registry[key];
                },

                seal: function () {
                    sealed = true;
                },

                isSealed: function () {
                    return sealed;
                },

                reset: function () {
                    registry = {};
                    sealed = false;
                }
            };
        }
    );
}());
