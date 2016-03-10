"use strict";

const CircularDependencyError = function () {
    this.name = 'CircularDependencyError';
    this.message = `Circular dependency detected`;
    this.stack = (new Error()).stack;
};
CircularDependencyError.prototype = Object.create(Error.prototype);
CircularDependencyError.constructor = CircularDependencyError;

module.exports = CircularDependencyError;
