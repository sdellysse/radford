import createContainer from "./create-container";
import InvalidCreatePropertyError from "./errors/invalid-create-property-error";
import InvalidDependencyDefinitionError from "./errors/invalid-dependency-definition-error";
import InvalidInvocationsError from "./errors/invalid-invocations-error";
import InvalidServiceNameError from "./errors/invalid-service-name-error";
import invokeContainer from "./invoke-container";
import ServiceRedefinitionForbiddenError from "./errors/service-redefinition-forbidden-error";
import UnknownServiceError from "./errors/UnknownServiceError";

const Radford = function (options) {
    if (typeof(options) === "undefined") {
        options = {};
    }

    if (options.definitions) {
        this.define(options.definitions);
    }
}

Object.assign(Radford, {
    errors: {
        InvalidCreatePropertyError,
        InvalidDependencyDefinitionError,
        InvalidInvocationsError,
        InvalidServiceNameError,
        ServiceRedefinitionForbiddenError,
        UnknownServiceError,
    },
});

Object.assign(Radford.prototype, {
    define: function (definitions) {
        this.container = createContainer(definitions, this.container);
    },

    invoke: function (...invocations) {
        return invokeContainer(this.container, invocations);
    },
});

export default Radford;
