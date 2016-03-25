import cleanCreateProperty from "./clean-create-property";
import cleanDependenciesProperty from "./clean-dependencies-property";
import InvalidServiceNameError from "./errors/invalid-service-name-error";

export default function cleanDefinition (name, serviceDefinition) {
    if (typeof(name) !== "string" || name.trim().length === 0) {
        throw new InvalidServiceNameError(name);
    }

    return {
        name,
        dependencies: cleanDependenciesProperty(name, serviceDefinition.dependencies),
        create: cleanCreateProperty(name, serviceDefinition.create),

        _resolving: false,
    };
}
