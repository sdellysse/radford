"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = cleanInvocations;

var _invalidInvocationsError = require("./errors/invalid-invocations-error");

var _invalidInvocationsError2 = _interopRequireDefault(_invalidInvocationsError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An invocation list can come from either a service's dependency function or
 * from the service getter itself. A list must always be an array. The following
 * variations are supported, in any combination:
 *
 * - [ "logger" ]
 * - [ "logger", {
 *       prefix: "something",
 *   }]
 * - [
 *      {
 *          name: "logger",
 *          args: {
 *              prefix: "something",
 *          },
 *      },
 *  ]
 *
 *  All items in the list will be converted to the last type.
 */
function cleanInvocations(invocations) {
    if (!Array.isArray(invocations)) {
        throw new _invalidInvocationsError2.default("must be an array");
    }

    return invocations.map(function (invocation) {
        if (invocation == null) {
            throw new _invalidInvocationsError2.default("invocation cannot be nullish");
        } else if (typeof invocation === "string") {
            return {
                name: invocation,
                _as: invocation,
                args: {}
            };
        } else if (1 && Array.isArray(invocation) && invocation.length === 2 && typeof invocation[0] === "string") {
            return {
                name: invocation[0],
                _as: invocation[0],
                args: invocation[1]
            };
        } else if (1 && typeof invocation.name === "string" && _typeof(invocation.args) === "object") {
            if (typeof invocation._as === "undefined") {
                invocation._as = invocation.name;
            }

            return invocation;
        } else {
            throw new _invalidInvocationsError2.default("invocation could be understood");
        }
    });
}
module.exports = exports['default'];