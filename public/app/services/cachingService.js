(function () {
    'use strict';

    define(
        [
            'lodash'
        ],
        function (_) {
            /**
             * This is a caching wrapper for function style services.  It makes several assumptions:
             *
             * + `wrappedService` is a function that accepts two parameters.
             * + The first argument to `wrappedService` can be stringified as JSON (e.g. no functions or object graphs
             *   containing functions) for use as a cache key.
             * + The last argument to `wrappedService` is a callback function.
             * + The callback function receives two parameters, an error and a result.
             *
             * Caching is performed in-memory only, so reloading the browser will clear the cache.  This allows updated
             * results to be retrieved.
             */
            return function (wrappedService, ttl) {
                var cache = {};

                ttl = ttl || 300000; // 5 minutes

                return function (/* ..., callback */) {
                    var _args = _(arguments),
                        callback = _args.last(),
                        cacheKey = JSON.stringify(_args.first()),
                        timestamp = Date.now();
                    if (cache[cacheKey] && cache[cacheKey].expiry > timestamp) {
                        // Cache hit
                        return callback.call(this, null, cache[cacheKey].data);
                    }
                    // Cache miss, call wrapped service, cache valid results and call the original callback
                    return wrappedService.apply(this, _args.dropRight().push(function (err, result) {
                        if (!err && result) {
                            cache[cacheKey] = {
                                data: result,
                                expiry: timestamp + ttl
                            };
                        }
                        callback.call(this, err, result);
                    }).value());
                };
            };
        }
    );
}());
