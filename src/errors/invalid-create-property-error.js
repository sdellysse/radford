const InvalidCreatePropertyError = function (serviceName) {
    this.name = 'InvalidCreatePropertyError';
    this.message = `Invalid create property for service '${ serviceName }'`;
    this.stack = (new Error()).stack;

    this.serviceName = serviceName;
};
InvalidCreatePropertyError.prototype = Object.create(Error.prototype);
InvalidCreatePropertyError.constructor = InvalidCreatePropertyError;

export default InvalidCreatePropertyError;
