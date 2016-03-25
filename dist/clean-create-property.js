"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cleanCreateProperty;

var _invalidCreatePropertyError = require("./errors/invalid-create-property-error");

var _invalidCreatePropertyError2 = _interopRequireDefault(_invalidCreatePropertyError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanCreateProperty(name, create) {
    if (typeof create !== "function") {
        throw new _invalidCreatePropertyError2.default(name);
    }

    return create;
}
module.exports = exports['default'];