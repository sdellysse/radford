"use strict";

const InvalidCacheKeyError = require("./errors/invalid-cache-key-error");
const InvalidCachePropertyError = require("./errors/invalid-cache-property-error");
const InvalidCreatePropertyError = require("./errors/invalid-create-property-error");
const InvalidDependencyDefinitionError = require("./errors/invalid-dependency-definition-error");
const InvalidInvocationsError = require("./errors/invalid-invocations-error");
const InvalidServiceNameError = require("./errors/invalid-service-name-error");

/**
 * The cache property of a service definition should be a function that receives
 * the create arguments and returns either a string by which the output of the
 * definition's `create` property will be cached under or boolean `false` if it
 * shouldn't be cached. For convenience the cache property in the definition
 * itself can also be null, undefined, false, or true. The first three will
 * cause the service to never be cached and the last will cause it to always be
 * cached.
 */
const cleanCacheProperty = function (name, cache) {
    if (typeof(cache) === "function") {
        return function (args) {
            const cacheKey = cache(args);
            if (cacheKey !== false && typeof(cacheKey) !== "string") {
                throw new InvalidCacheKeyError(name, cacheKey);
            }
            return cacheKey;
        };

    } else if (cache == null || cache === false) {
        return (() => false);

    } else if (cache === true) {
        return (() => "cache");
    }

    throw new InvalidCachePropertyError(name);
};


/**
 * The dependencies property of a service definition should be a function that
 * receives the create arguments and returns a dependency list. For convenience,
 * Radford will also accept null, undefined, false, or a static dependency list.
 * The first three will be replaced with an empty dependency list and the last
 * will be cleaned and used for all times `create` is called.
 */
const cleanDependenciesProperty = function (name, dependencies) {
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
        return [];
    }

    throw new InvalidDependencyDefinitionError(name);
};

const cleanCreateProperty = function (name, create) {
    if (typeof(create) === "function") {
        return function (deps, args) {
            try {
                return Promise.resolve(create(deps, args));
            } catch (e) {
                return Promise.reject(e);
            }
        };
    }

    throw new InvalidCreatePropertyError(name);

};

/**
 * Radford is very lenient in what it will allow as service definitions.
 * A definition consists of an object with three keys: cache, dependencies, and
 * create. The first two are optional but the last is required. Descriptions of
 * each:
 *
 * - cache: Can be either a null, undefined, false, true, or a function that
 *   returns either a string or false. Null, undefined, or false values of this
 *   property will be converted into a function that always returns false. True
 *   values will be converted into a function that always returns a constant
 *   string, making every call cached. If it's a function, then it should either
 *   return a string by which the call to `create` will be cached or false to
 *   not cache this call. The function will receive the arguments the service
 *   was requeste with, if any.
 *
 * - dependencies: Can either be null, undefined, an array, or a function. Null
 *   and undefined will be converted to a function that always returns an empty
 *   array. An array will be converted to a function that always returns a
 *   cleaned version of that array. If it's a function, it will be called with
 *   the args given to Radford and it is expected to return an array, which
 *   will be cleaned.
 *
 * - create: This needs to be a function that will be given the dependency
 *   services the definition requests, and the arguments given by the caller.
 *   It can either return its service object directly or return a promise that
 *   will eventually resolve to the service object.
 */
const cleanServiceDefinition = function (name, serviceDefinition) {
    if (typeof(name) !== "string" || name.trim().length === 0) {
        throw new InvalidServiceNameError(name);
    }

    return {
        name,
        dependencies: cleanDependenciesProperty(name, serviceDefinition),
        cache: cleanCacheProperty(name, serviceDefinition),
        create: cleanCreateProperty(name, serviceDefinition),

        _cache: new WeakMap(),
        _resolving: false,
    };
};

module.exports = cleanServiceDefinition;
