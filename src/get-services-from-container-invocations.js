"use strict";

const CircularDependencyError = require("./errors/circular-dependency-error");
const cleanInvocations = require("./clean-invocations");
const UnknownServiceError = require("./errors/unknown-service-error");

const invokeContainer = function (container, invocation) {
    const serviceDefinition = container[invocation.name];

    if (serviceDefinition._resolving) {
        return Promise.reject(new CircularDependencyError());
    }
    serviceDefinition._resolving = true;

    return Promise.resolve()
    .then(() => {
        const dependencyInvocations = serviceDefinition.dependencies(invocations.args);
        return getServicesFromContainerInvocations(container, dependencyInvocations);
    })
    .then(dependencies => serviceDefinition.create(dependencies, invocation.args))
    .then(serviceObject => {
        serviceDefinition._resolving = false;

        return {
            name: serviceDefinition.name,
            serviceObject,
        };
    })
    ;
};

const getServicesFromContainerInvocations = function (container, invocations) {
    return Promise.resolve()
    .then(() => cleanInvocations(invocations))
    .then(invocations => Promise.all(invocations.map(invocation => {
        const serviceDefinition = container.serviceDefinitions[invocation.name];
        if (typeof(serviceDefinition) === "undefined") {
            return Promise.reject(new UnknownServiceError(invocation.name));
        }

        const cacheKey = serviceDefinition.cache(invocation.args);

        if (cacheKey === false) {
            return invokeContainer(container, invocation);
        } else {
            if (!serviceDefinition._cache[cacheKey]) {
                serviceDefinition._cache[cacheKey] = invokeContainer(container, invocation);
            }
            return serviceDefinition._cache[cacheKey];
        }
    })))
    .then(serviceList => {
        const retval = {};
        for (let service of serviceList) {
            retval[service.name] = service.serviceObject;
        }
        return retval;
    })
    ;
};

module.exports = getServicesFromContainer;
