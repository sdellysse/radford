# Radford: a service container and dependency injector for your application

### Installation ###

```javascript
npm install radford
```

### Description ###

Radford is a lightweight service container for managing initialization and
dependencies inside your app. Each service can request other services, and
service can take optional arguments. This allows the components of your
application to stay uncoupled from one another and Radford will build the
service graph for you.

### Usage ###

```javascript
import Radford from "radford";
import { native: pgnative } from "pg";
import wrap from "pg.promised";

const cache = {};
const radford = new Radford({
    definitions: {
        db: {
            dependencies: [
                ["logger", {
                    name: "db",
                }],
            ],

            create: ({ logger }, {}) => {
                if (!cache.db) {
                    cache.db = wrap(pgnative);
                }

                return cache.db;
            },
        },

        logger: {
            create: ({}, { name }) {
                cache.logger = cache.logger || {};

                if (!cache.logger[name]) {
                    cache.logger[name] = function (...messages) {
                        console.log(`[${ name.toUpperCase() }]`, ...messages);
                    };
                }

                return cache.logger[name];
            },
        },
    },
});

const { db } = radford.invoke("db");

db.query() //...
```
