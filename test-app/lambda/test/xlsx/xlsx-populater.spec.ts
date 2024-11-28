import { resolve } from "path";
import { populate } from "../../src/conversions/xlsx/xlsx-populater";

describe("xlsx-populater", () => {
    it("populate", async () => {
        const path = resolve(__dirname, "data", "sample.xlsx");
        const output = resolve(__dirname, "data", "result.xlsx");
        await populate(path, output);
    });
});
