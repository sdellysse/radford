import InvalidCreatePropertyError from "./errors/invalid-create-property-error";

export default function cleanCreateProperty (name, create) {
    if (typeof(create) !== "function") {
        throw new InvalidCreatePropertyError(name);
    }

    return create;
}
