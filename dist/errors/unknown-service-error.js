'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var UnknownServiceError = function UnknownServiceError(serviceName) {
    this.name = 'UnknownServiceError';
    this.message = 'Unknown service \'' + serviceName + '\'';
    this.stack = new Error().stack;

    this.serviceName = serviceName;
};
UnknownServiceError.prototype = Object.create(Error.prototype);
UnknownServiceError.constructor = UnknownServiceError;

exports.default = UnknownServiceError;
module.exports = exports['default'];