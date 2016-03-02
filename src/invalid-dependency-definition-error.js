const InvalidDependencyDefinitionError = function (serviceName) {
    this.name = 'InvalidDependencyDefinitionError';
    this.message = `Invalid dependency definition for service '${ serviceName }'`;
    this.stack = (new Error()).stack;

    this.serviceName = serviceName;
};
InvalidDependencyDefinitionError.prototype = Object.create(Error.prototype);
InvalidDependencyDefinitionError.constructor = InvalidDependencyDefinitionError;

module.exports = InvalidDependencyDefinitionError;
