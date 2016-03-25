"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createContainer;

var _cleanDefinition = require("./clean-definition");

var _cleanDefinition2 = _interopRequireDefault(_cleanDefinition);

var _clone = require("clone");

var _clone2 = _interopRequireDefault(_clone);

var _serviceRedefinitionForbiddenError = require("./errors/service-redefinition-forbidden-error");

var _serviceRedefinitionForbiddenError2 = _interopRequireDefault(_serviceRedefinitionForbiddenError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createContainer(definitions, cloneFrom) {
    var retval = {};
    if (typeof cloneFrom !== "undefined") {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(cloneFrom)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var name = _step.value;

                retval[name] = (0, _clone2.default)(cloneFrom[name], false);
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
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(definitions)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _name = _step2.value;

            if (typeof retval[_name] !== "undefined") {
                throw new _serviceRedefinitionForbiddenError2.default(_name);
            }

            retval[_name] = (0, _cleanDefinition2.default)(_name, definitions[_name]);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return retval;
}
module.exports = exports['default'];