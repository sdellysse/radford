"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cleanDefinition;

var _cleanCreateProperty = require("./clean-create-property");

var _cleanCreateProperty2 = _interopRequireDefault(_cleanCreateProperty);

var _cleanDependenciesProperty = require("./clean-dependencies-property");

var _cleanDependenciesProperty2 = _interopRequireDefault(_cleanDependenciesProperty);

var _invalidServiceNameError = require("./errors/invalid-service-name-error");

var _invalidServiceNameError2 = _interopRequireDefault(_invalidServiceNameError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanDefinition(name, serviceDefinition) {
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new _invalidServiceNameError2.default(name);
    }

    return {
        name: name,
        dependencies: (0, _cleanDependenciesProperty2.default)(name, serviceDefinition.dependencies),
        create: (0, _cleanCreateProperty2.default)(name, serviceDefinition.create),

        _resolving: false
    };
}
module.exports = exports['default'];