"use strict";

const ServiceRedefinitionForbiddenError = function (definitionName) {
    this.name = 'ServiceRedefinitionForbiddenError';
    this.message = `Cannot redefine service '${ definitionName }'`;
    this.stack = (new Error()).stack;

    this.definitionName = definitionName;
};
ServiceRedefinitionForbiddenError.prototype = Object.create(Error.prototype);
ServiceRedefinitionForbiddenError.constructor = ServiceRedefinitionForbiddenError;

module.exports = ServiceRedefinitionForbiddenError;
