# Radford: an asynchronous service container for your application

```javascript
var Radford = require("radford");
var services = new Radford();

// Define a few services.
services.define({
    // Use the cache to keep from creating a new service every time it is required.
    log: function (resolveTo, options, cache) {
        if (typeof cache.logger === "undefined") {
            cache.logger = function (message) {
                console.log((new Date()) + " " + message);
            };
        }

        resolveTo(cache.logger);
    },

    // Services don't need to be functions. They can be any value other than undefined.
    name: function (resolveTo) {
        resolveTo("world");
    },

    // This is the long-form service declaration. A service can depend on other services.
    proclaim: {
        requires: ["log", "name"],
        definition: function (resolveTo, options, cache, services) {
            var log = services.log;
            var name = services.name;

            var proclaimer = function () {
                log("Hello " + name + "!");
            };

            resolveTo(proclaimer);
        },
    },
});

// Use the services
services.require(["proclaim"], function (services) {
    services.proclaim();
});
```
