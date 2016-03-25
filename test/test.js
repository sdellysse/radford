import assert from "assert";
import cleanInvocations from "../src/clean-invocations";
import Radford from "../src/index";

describe("cleanInvocations", () => {
    it("should work on strings", () => {
        const expected = [
            {
                name: "db",
                _as: "db",
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
                _as: "db",
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
                _as: "db",
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
    it("should give you the correct value from an invocation", () => {
        const radford = new Radford({
            definitions: {
                db: {
                    create: ({}, { name }) => {
                        return `db::${ name }`;
                    },
                },
            },
        });

        const expected = "db::something";
        const { db } = radford.invoke(["db", { name: "something" }]);

        assert.equal(db, expected);
    });

    it("should give the right deps", () => {
        const radford = new Radford({
            definitions: {
                db: {
                    dependencies: [
                        ["logger", {
                            name: "logger(db)",
                        }],
                    ],

                    create: ({ logger }, {}) => {
                        return { logger };
                    },
                },

                logger: {
                    create: ({}, { name }) => {
                        return { name };
                    },
                },
            },
        });

        const expected = {
            logger: {
                name: "logger(db)",
            },
        };
        const { db } = radford.invoke("db");

        assert.deepStrictEqual(db, expected);
    });
});
