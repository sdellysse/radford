import InvalidInvocationsError from "./errors/invalid-invocations-error";

/**
 * An invocation list can come from either a service's dependency function or
 * from the service getter itself. A list must always be an array. The following
 * variations are supported, in any combination:
 *
 * - [ "logger" ]
 * - [ "logger", {
 *       prefix: "something",
 *   }]
 * - [
 *      {
 *          name: "logger",
 *          args: {
 *              prefix: "something",
 *          },
 *      },
 *  ]
 *
 *  All items in the list will be converted to the last type.
 */
export default function cleanInvocations (invocations) {
    if (!Array.isArray(invocations)) {
        throw new InvalidInvocationsError("must be an array");
    }

    return invocations.map(invocation => {
        if (invocation == null) {
            throw new InvalidInvocationsError(`invocation cannot be nullish`);

        } else if (typeof(invocation) === "string") {
            return {
                name: invocation,
                _as: invocation,
                args: {},
            };

        } else if (1
            && Array.isArray(invocation)
            && invocation.length === 2
            && typeof(invocation[0]) === "string"
        ) {
            return {
                name: invocation[0],
                _as: invocation[0],
                args: invocation[1],
            };

        } else if (1
            && typeof(invocation.name) === "string"
            && typeof(invocation.args) === "object"
        ) {
            if (typeof(invocation._as) === "undefined") {
                invocation._as = invocation.name;
            }

            return invocation;

        } else {
            throw new InvalidInvocationsError(`invocation could be understood`);
        }
    });
}
