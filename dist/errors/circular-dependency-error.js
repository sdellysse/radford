'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CircularDependencyError = function CircularDependencyError() {
    this.name = 'CircularDependencyError';
    this.message = 'Circular dependency detected';
    this.stack = new Error().stack;
};
CircularDependencyError.prototype = Object.create(Error.prototype);
CircularDependencyError.constructor = CircularDependencyError;

exports.default = CircularDependencyError;
module.exports = exports['default'];