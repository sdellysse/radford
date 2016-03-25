"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = invokeContainer;

var _circularDependencyError = require("./errors/circular-dependency-error");

var _circularDependencyError2 = _interopRequireDefault(_circularDependencyError);

var _cleanInvocations = require("./clean-invocations");

var _cleanInvocations2 = _interopRequireDefault(_cleanInvocations);

var _unknownServiceError = require("./errors/unknown-service-error");

var _unknownServiceError2 = _interopRequireDefault(_unknownServiceError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function invokeContainer(container, invocations) {
    invocations = (0, _cleanInvocations2.default)(invocations);

    var retval = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = invocations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var invocation = _step.value;

            var serviceDefinition = container[invocation.name];
            if (typeof serviceDefinition === "undefined") {
                throw new _unknownServiceError2.default(invocation.name);
            }

            if (serviceDefinition._resolving) {
                throw new _circularDependencyError2.default();
            }
            serviceDefinition._resolving = true;

            var dependencyInvocations = serviceDefinition.dependencies(invocation.args);
            var dependencies = invokeContainer(container, dependencyInvocations);
            var serviceObject = serviceDefinition.create(dependencies, invocation.args);
            serviceDefinition._resolving = false;

            retval[invocation._as] = serviceObject;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return retval;
}
module.exports = exports['default'];