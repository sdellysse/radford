const cleanDefinition = require("./clean-definition");
const getServicesFromContainerInvocations = require("./get-services-from-container-invocations");
const ServiceRedefinitionForbiddenError = require("./service-redefinition-forbidden-error");

const Radford = function (options) {
    this.container = {};

    if (options.definitions) {
        this.define(definitions);
    }
};

Object.assign(Radford, {
    errors: {
        CircularDependencyError:           require("./circular-dependency-error"),
        InvalidCacheKeyError:              require("./invalid-cache-key-error"),
        InvalidCachePropertyError:         require("./invalid-cache-property-error"),
        InvalidCreatePropertyError:        require("./invalid-create-property-error"),
        InvalidDependencyDefinitionError:  require("./invalid-dependency-definition-error"),
        InvalidInvocationsError:           require("./invalid-invocations-error"),
        InvalidServiceNameError:           require("./invalid-service-name-error"),
        ServiceRedefinitionForbiddenError: require("./service-redefinition-forbidden-error"),
        UnknownServiceError:               require("./unknown-service-error"),
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
