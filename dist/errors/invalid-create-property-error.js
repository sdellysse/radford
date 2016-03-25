'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var InvalidCreatePropertyError = function InvalidCreatePropertyError(serviceName) {
    this.name = 'InvalidCreatePropertyError';
    this.message = 'Invalid create property for service \'' + serviceName + '\'';
    this.stack = new Error().stack;

    this.serviceName = serviceName;
};
InvalidCreatePropertyError.prototype = Object.create(Error.prototype);
InvalidCreatePropertyError.constructor = InvalidCreatePropertyError;

exports.default = InvalidCreatePropertyError;
module.exports = exports['default'];