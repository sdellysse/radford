'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var InvalidInvocationsError = function InvalidInvocationsError(reason) {
    this.name = 'InvalidInvocationsError';
    this.message = 'Invalid Invocation: \'' + reason + '\'';
    this.stack = new Error().stack;

    this.reason = reason;
};
InvalidInvocationsError.prototype = Object.create(Error.prototype);
InvalidInvocationsError.constructor = InvalidInvocationsError;

exports.default = InvalidInvocationsError;
module.exports = exports['default'];