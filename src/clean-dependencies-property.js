import cleanInvocations from "./clean-invocations";
import InvalidDependencyDefinitionError from "./errors/invalid-dependency-definition-error";
import InvalidInvocationsError from "./errors/invalid-invocations-error";

export default function cleanDependenciesProperty (name, dependencies) {
    if (typeof(dependencies) === "function") {
        return function (args) {
            try {
                return cleanInvocations(dependencies(args));
            } catch (e) {
                if (e instanceof InvalidInvocationsError) {
                    throw new InvalidDependencyDefinitionError(name);
                } else {
                    throw e;
                }
            }
        };

    } else if (Array.isArray(dependencies)) {
        try {
            const cleanedList = cleanInvocations(dependencies);
            return function () {
                return cleanedList;
            };
        } catch (e) {
            if (e instanceof InvalidInvocationsError) {
                throw new InvalidDependencyDefinitionError(name);
            } else {
                throw e;
            }
        }
    } else if (0
        || dependencies === false
        || dependencies == null
    ) {
        return function () {
            return [];
        };
    }

    throw new InvalidDependencyDefinitionError(name);
}
