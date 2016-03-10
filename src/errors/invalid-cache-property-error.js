"use strict";

const InvalidCachePropertyError = function (serviceName) {
    this.name = 'InvalidCachePropertyError';
    this.message = `Invalid cache property for service '${ serviceName }'`;
    this.stack = (new Error()).stack;

    this.serviceName = serviceName;
};
InvalidCachePropertyError.prototype = Object.create(Error.prototype);
InvalidCachePropertyError.constructor = InvalidCachePropertyError;

module.exports = InvalidCachePropertyError;
