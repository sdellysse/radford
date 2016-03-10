"use strict";

const cleanDefinition = require("./clean-definition");
const getServicesFromContainerInvocations = require("./get-services-from-container-invocations");
const ServiceRedefinitionForbiddenError = require("./errors/service-redefinition-forbidden-error");

const Radford = function (definitions) {
    this.container = {};

    if (definitions) {
        this.define(definitions);
    }
};

Object.assign(Radford, {
    errors: {
        CircularDependencyError:           require("./errors/circular-dependency-error"),
        InvalidCacheKeyError:              require("./errors/invalid-cache-key-error"),
        InvalidCachePropertyError:         require("./errors/invalid-cache-property-error"),
        InvalidCreatePropertyError:        require("./errors/invalid-create-property-error"),
        InvalidDependencyDefinitionError:  require("./errors/invalid-dependency-definition-error"),
        InvalidInvocationsError:           require("./errors/invalid-invocations-error"),
        InvalidServiceNameError:           require("./errors/invalid-service-name-error"),
        ServiceRedefinitionForbiddenError: require("./errors/service-redefinition-forbidden-error"),
        UnknownServiceError:               require("./errors/unknown-service-error"),
    },
});

Radford.prototype = Object.create(null);
Object.assign(Radford.prototype, {
    define: function (definitions) {
        for (let name of Object.keys(definitions)) {
            if (this.container[name]) {
                throw new ServiceRedefinitionForbiddenError(name);
            }

            this.container[name] = cleanDefinition(name, definitions[name]);
        }
    },
    require: function (invocations) {
        return getServicesFromContainerInvocations(this.container, invocations);
    },
});

module.exports = Radford;
