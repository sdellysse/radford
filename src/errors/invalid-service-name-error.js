"use strict";

const InvalidServiceNameError = function (serviceName) {
    this.name = 'InvalidServiceNameError';
    this.message = `Invalid service name: '${ serviceName }'`;
    this.stack = (new Error()).stack;

    this.serviceName = serviceName;
};
InvalidServiceNameError.prototype = Object.create(Error.prototype);
InvalidServiceNameError.constructor = InvalidServiceNameError;

module.exports = InvalidServiceNameError;
