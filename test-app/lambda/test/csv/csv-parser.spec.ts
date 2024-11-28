import { resolve } from "path";
import { join } from "../../src/conversions/csv/csv-joiner";
import { parse } from "../../src/conversions/csv/csv-perser";

describe("csv-perser", () => {
    it("parse", async () => {
        const path = resolve(__dirname, "data", "sample.csv");
        for await (const record of parse(path, {
            testA: "",
            testB: "",
            testC: "",
        })) {
            expect(record).toEqual({
                testA: "a1",
                testB: "b1",
                testC: "c1",
            });
        }
    });

    it("join", async () => {
        const sampleA = {
            filePath: resolve(__dirname, "data", "sampleA.csv"),
            rule: {
                key: "",
                name: "",
                age: "",
            },
        };
        const sampleB = {
            filePath: resolve(__dirname, "data", "sampleB.csv"),
            rule: {
                key: "",
                address: "",
                hobby: "",
            },
        };
        for await (const record of join(sampleA, sampleB, "key")) {
            console.log(record);
        }
    });
});
