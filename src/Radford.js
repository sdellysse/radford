if (typeof Promise === "undefined") {
    throw new Error("Need to have a global Promise constructor.");
}

const Radford = function (options) {
    if (typeof options.services === "undefined") {
        options.services = {};
    }

    this._ = {
        services: {},
    };

    this.define(options.services);
};

Object.assign(Radford.prototype, {
    define: function (name, definition) {
        const services = this._.services;

        // Support passing in a dictionary
        if (typeof name !== "string") {
            const definitions = name;

            for (let name of Object.keys(definitions)) {
                this.define(name, definitions[name]);
            }
            return;
        }

        // Allow user to pass in just the promise creator
        if (typeof definition === "function") {
            return this.define(name, {
                run: definition,
            });
        }

        if (typeof name !== "string") {
            throw new Error("name must be string");
        }

        if (typeof services[name] !== "undefined") {
            throw new Error("cannot redefine service '"+name+"'");
        }

        if (typeof definition.getDependencies === "undefined") {
            let dependencies = [];
            if (typeof definition.dependencies !== "undefined") {
                dependencies = definition.dependencies;
            }
            definition.getDependencies = function () {
                return dependencies;
            }
        }

        const guardedRun = async function (...args) {
            if (services[name].currentlyResolving === true) {
                throw new Error("Service is already resolving. Recursion?");
            }
            services[name].currentlyResolving = true;

            const retval = await definition.run(...args);

            services[name].currentlyResolving = false;
            return retval;
        };

        services[name] = {
            currentlyResolving: false,
            getDependencies: definition.getDependencies,
            name: name,
            run: guardedRun,

        };

        return this;
    },

    require: async function (requests) {
        if (typeof requests === "undefined") {
            throw new Error("Gotta ask for something.");
        }

        const retval = {};
        for (let request of requests) {
            if (typeof request === "string") {
                request = {
                    name: request,
                };
            }

            if (typeof request.options === "undefined") {
                request.options = {};
            }

            const service = this._.services[request.name];

            if (typeof service === "undefined") {
                throw new Error(`bad service name: "${request.name}"`);
            }

            const dependencyRequests = service.getDependencies(request.options);
            const dependencies = await this.require(dependencyRequests);

            retval[service.name] = await service.run({
                ...dependencies,
                options: request.options,
            });
        };
        return retval;
    },
});

module.exports = Radford;
