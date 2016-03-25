"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = cleanDependenciesProperty;

var _cleanInvocations = require("./clean-invocations");

var _cleanInvocations2 = _interopRequireDefault(_cleanInvocations);

var _invalidDependencyDefinitionError = require("./errors/invalid-dependency-definition-error");

var _invalidDependencyDefinitionError2 = _interopRequireDefault(_invalidDependencyDefinitionError);

var _invalidInvocationsError = require("./errors/invalid-invocations-error");

var _invalidInvocationsError2 = _interopRequireDefault(_invalidInvocationsError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanDependenciesProperty(name, dependencies) {
    if (typeof dependencies === "function") {
        return function (args) {
            try {
                return (0, _cleanInvocations2.default)(dependencies(args));
            } catch (e) {
                if (e instanceof _invalidInvocationsError2.default) {
                    throw new _invalidDependencyDefinitionError2.default(name);
                } else {
                    throw e;
                }
            }
        };
    } else if (Array.isArray(dependencies)) {
        try {
            var _ret = function () {
                var cleanedList = (0, _cleanInvocations2.default)(dependencies);
                return {
                    v: function v() {
                        return cleanedList;
                    }
                };
            }();

            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        } catch (e) {
            if (e instanceof _invalidInvocationsError2.default) {
                throw new _invalidDependencyDefinitionError2.default(name);
            } else {
                throw e;
            }
        }
    } else if (0 || dependencies === false || dependencies == null) {
        return function () {
            return [];
        };
    }

    throw new _invalidDependencyDefinitionError2.default(name);
}
module.exports = exports['default'];