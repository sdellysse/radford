'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var InvalidDependencyDefinitionError = function InvalidDependencyDefinitionError(serviceName) {
    this.name = 'InvalidDependencyDefinitionError';
    this.message = 'Invalid dependency definition for service \'' + serviceName + '\'';
    this.stack = new Error().stack;

    this.serviceName = serviceName;
};
InvalidDependencyDefinitionError.prototype = Object.create(Error.prototype);
InvalidDependencyDefinitionError.constructor = InvalidDependencyDefinitionError;

exports.default = InvalidDependencyDefinitionError;
module.exports = exports['default'];