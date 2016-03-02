const InvalidCacheKeyError = function (serviceName, cacheKey) {
    this.name = 'InvalidCacheKeyError';
    this.message = `Invalid cache key '${ cacheKey }' for service '${ serviceName }'`;
    this.stack = (new Error()).stack;

    this.serviceName = serviceName;
    this.cacheKey = cacheKey;
};
InvalidCacheKeyError.prototype = Object.create(Error.prototype);
InvalidCacheKeyError.constructor = InvalidCacheKeyError;

module.exports = InvalidCacheKeyError;
