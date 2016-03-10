"use strict";

const UnknownServiceError = function (serviceName) {
    this.name = 'UnknownServiceError';
    this.message = `Unknown service '${ serviceName }'`;
    this.stack = (new Error()).stack;

    this.serviceName = serviceName;
};
UnknownServiceError.prototype = Object.create(Error.prototype);
UnknownServiceError.constructor = UnknownServiceError;

module.exports = UnknownServiceError;
