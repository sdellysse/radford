# Radford: an asynchronous service container for your application #

### Installation ###

```javascript
npm install radford
```

### Description ###

Radford is a lightweight fully asynchronous service container for managing
initialization and dependencies inside your app. Radford fully embraces
ESnext's async/await functionality, making it very pleasant to work with.

### Usage ###

```javascript
const Radford = require("radford");

const cache = {};
const radford = new Radford({
    services: {
        log: {
            run: async function () {
                if (!cache.log) {
                    cache.log = console.log.bind(console, "LOG");
                }

                return coche.log;
            },
        },
    },
});

radford.require([ "log" ])
.then(({ log }) => {
    log("Hello, world") // Outputs: "LOG hello, world"
})
.catch(error => console.trace(error));
```
