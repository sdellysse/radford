import CircularDependencyError from "./errors/circular-dependency-error";
import cleanInvocations from "./clean-invocations";
import UnknownServiceError from "./errors/unknown-service-error";

export default function invokeContainer (container, invocations) {
    invocations = cleanInvocations(invocations);

    const retval = {};
    for (let invocation of invocations) {
        const serviceDefinition = container[invocation.name];
        if (typeof(serviceDefinition) === "undefined") {
            throw new UnknownServiceError(invocation.name);
        }

        if (serviceDefinition._resolving) {
            throw new CircularDependencyError();
        }
        serviceDefinition._resolving = true;

        const dependencyInvocations = serviceDefinition.dependencies(invocation.args);
        const dependencies = invokeContainer(container, dependencyInvocations);
        const serviceObject = serviceDefinition.create(dependencies, invocation.args);
        serviceDefinition._resolving = false;

        retval[invocation.name] = serviceObject;
    }

    return retval;
}
