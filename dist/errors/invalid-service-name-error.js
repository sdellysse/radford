'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var InvalidServiceNameError = function InvalidServiceNameError(serviceName) {
    this.name = 'InvalidServiceNameError';
    this.message = 'Invalid service name: \'' + serviceName + '\'';
    this.stack = new Error().stack;

    this.serviceName = serviceName;
};
InvalidServiceNameError.prototype = Object.create(Error.prototype);
InvalidServiceNameError.constructor = InvalidServiceNameError;

exports.default = InvalidServiceNameError;
module.exports = exports['default'];