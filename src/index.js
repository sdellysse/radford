var ServiceContainer;

ServiceContainer = function () {
    this.services = {};
};

defineOne = function (name, args) {
    if (typeof name !== "string") {
        throw new Error("name must be string");
    }
    if (typeof this.services[name] !== "undefined") {
        throw new Error("cannot redefine service");
    }
    if (typeof args === "function") {
        args = {
            definition: args,
        };
    }

    if (typeof args.dependencies === "undefined") {
        args.dependencies = [];
    }

    this.services[name] = {
        name: name,
        dependencies: args.dependencies,
        definition: args.definition,

        cache: {},
        currentlyResolving: false,
    };
};

defineMany = function (defines) {
    for (let name in defines) {
        const define = defines[name];

        this.defineOne(name, define);
    }
};

ServiceContainer.prototype.define = function () {
    if (typeof arguments[0] === "string") {
        return defineOne.call(this, arguments[0], arguments[1]);
    } else {
        return defineMany.call(this, arguments[0]);
    }
};


ServiceContainer.prototype.require = function (requests, cb) {
    if (typeof cb !== "function") {
        throw new Error("cb must be a function");
    }

    if (requests.length === 0) {
        cb({});
        return;
    }

    requests = requests.map(request => {
        if (typeof request === "string") {
            request = {
                service: request,
            };
        }

        if (typeof this.services[request.service] === "undefined") {
            throw new Error("bad service name: '"+request.service+"'");
        }

        return request;
    });


    let finishedServiceCount = 0;
    const totalServiceCount = requests.length;

    const cbval = {};
    for (let request of requests) {
        const service = this.services[request.service];
        if (service.currentlyResolving) {
            throw new Error("trying to resolve service '"+service.name+"' multiple times. circular dependency detected.");
        }
        service.currentlyResolving = true;

        const collectServiceObject = function (serviceObject) {
            if (typeof serviceObject === "undefined") {
                throw new Error("serviceObject sent to requestCb is undef");
            }

            service.currentlyResolving = false;

            cbval[service.name] = serviceObject;
            finishedServiceCount += 1;

            if (finishedServiceCount === totalServiceCount) {
                cb(cbval);
            }
        };

        this.require(service.dependencies, function (dependencies) {
            service.definition(collectServiceObject, request, service.cache, dependencies);
        });
    }
};

module.exports = ServiceContainer;
