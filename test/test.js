global.Promise = require("bluebird");

const assert = require("assert");
const cleanInvocations = require("../src/clean-invocations");
const Radford = require("../src/index");

describe("cleanInvocations", () => {
    it("should work on strings", () => {
        const expected = [
            {
                name: "db",
                args: {},
            },
        ];
        const actual = cleanInvocations([
            "db"
        ]);

        assert.deepStrictEqual(actual, expected);
    });
    it("should work on shorthand notation", () => {
        const expected = [
            {
                name: "db",
                args: {
                    connString: "blah",
                },
            },
        ];
        const actual = cleanInvocations([
            ["db", {
                connString: "blah",
            }],
        ]);
        assert.deepStrictEqual(actual, expected);
    });

    it("should work on full invocations", () => {
        const expected = [
            {
                name: "db",
                args: {
                    connString: "blah",
                },
            },
        ];
        const actual = cleanInvocations([
            {
                name: "db",
                args: {
                    connString: "blah",
                },
            },
        ]);
        assert.deepStrictEqual(actual, expected);
    });
});

describe("Radford", () => {
    const log = [];
    const radford = new Radford({
        db: {
            cache: true,
            dependencies: [
                ["logger", {
                    name: "db",
                }],
            ],
            create: (services) => {
                return (sql) => {
                    services.logger(sql);
                };
            },
        },
        logger: {
            cache: (args) => {
                return args.name;
            },
            create: function (services, args) {
                return function (message) {
                    log.push(args.name, message);
                };
            },
        },
    });

    it("should return a cached item each time", (done) => {
        Promise.all([
            radford.require([ "db" ]),
            radford.require([ "db" ]),
        ])
        .then(results => {
            const db1 = results[0].db;
            const db2 = results[1].db;

            assert.strictEqual(db1, db2);
            done();
        })
        .catch(done)
        ;
    });

    it("should have passed name to logger from db", (done) => {
        radford.require([ "db" ])
        .then(services => {
            services.db("SELECT *");
            assert.deepStrictEqual(log, ["db", "SELECT *"]);
            done();
        })
        .catch(done)
        ;
    });
});
