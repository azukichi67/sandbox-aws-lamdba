import { resolve } from "path";
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
});
