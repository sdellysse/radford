import cleanDefinition from "./clean-definition";
import clone from "clone";
import ServiceRedefinitionForbiddenError from "./errors/service-redefinition-forbidden-error";

export default function createContainer (definitions, cloneFrom) {
    const retval = {};
    if (typeof(cloneFrom) !== "undefined") {
        for (let name of Object.keys(cloneFrom)) {
            retval[name] = clone(cloneFrom[name], false);
        }
    }

    for (let name of Object.keys(definitions)) {
        if (typeof(retval[name]) !== "undefined") {
            throw new ServiceRedefinitionForbiddenError(name);
        }

        retval[name] = cleanDefinition(name, definitions[name]);
    }

    return retval;
}
