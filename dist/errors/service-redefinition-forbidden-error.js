'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ServiceRedefinitionForbiddenError = function ServiceRedefinitionForbiddenError(definitionName) {
    this.name = 'ServiceRedefinitionForbiddenError';
    this.message = 'Cannot redefine service \'' + definitionName + '\'';
    this.stack = new Error().stack;

    this.definitionName = definitionName;
};
ServiceRedefinitionForbiddenError.prototype = Object.create(Error.prototype);
ServiceRedefinitionForbiddenError.constructor = ServiceRedefinitionForbiddenError;

exports.default = ServiceRedefinitionForbiddenError;
module.exports = exports['default'];