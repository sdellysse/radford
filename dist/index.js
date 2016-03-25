"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createContainer = require("./create-container");

var _createContainer2 = _interopRequireDefault(_createContainer);

var _invalidCreatePropertyError = require("./errors/invalid-create-property-error");

var _invalidCreatePropertyError2 = _interopRequireDefault(_invalidCreatePropertyError);

var _invalidDependencyDefinitionError = require("./errors/invalid-dependency-definition-error");

var _invalidDependencyDefinitionError2 = _interopRequireDefault(_invalidDependencyDefinitionError);

var _invalidInvocationsError = require("./errors/invalid-invocations-error");

var _invalidInvocationsError2 = _interopRequireDefault(_invalidInvocationsError);

var _invalidServiceNameError = require("./errors/invalid-service-name-error");

var _invalidServiceNameError2 = _interopRequireDefault(_invalidServiceNameError);

var _invokeContainer = require("./invoke-container");

var _invokeContainer2 = _interopRequireDefault(_invokeContainer);

var _serviceRedefinitionForbiddenError = require("./errors/service-redefinition-forbidden-error");

var _serviceRedefinitionForbiddenError2 = _interopRequireDefault(_serviceRedefinitionForbiddenError);

var _UnknownServiceError = require("./errors/UnknownServiceError");

var _UnknownServiceError2 = _interopRequireDefault(_UnknownServiceError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radford = function Radford(options) {
    if (typeof options === "undefined") {
        options = {};
    }

    if (options.definitions) {
        this.define(options.definitions);
    }
};

Object.assign(Radford, {
    errors: {
        InvalidCreatePropertyError: _invalidCreatePropertyError2.default,
        InvalidDependencyDefinitionError: _invalidDependencyDefinitionError2.default,
        InvalidInvocationsError: _invalidInvocationsError2.default,
        InvalidServiceNameError: _invalidServiceNameError2.default,
        ServiceRedefinitionForbiddenError: _serviceRedefinitionForbiddenError2.default,
        UnknownServiceError: _UnknownServiceError2.default
    }
});

Object.assign(Radford.prototype, {
    define: function define(definitions) {
        this.container = (0, _createContainer2.default)(definitions, this.container);
    },

    invoke: function invoke() {
        for (var _len = arguments.length, invocations = Array(_len), _key = 0; _key < _len; _key++) {
            invocations[_key] = arguments[_key];
        }

        return (0, _invokeContainer2.default)(this.container, invocations);
    }
});

exports.default = Radford;
module.exports = exports['default'];