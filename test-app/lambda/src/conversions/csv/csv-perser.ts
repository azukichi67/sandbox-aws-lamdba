import { parse as csvParse, Parser } from "csv-parse";
import { createReadStream } from "fs";
import * as R from "remeda";

export type ParseRule = {
    [header: string]: any;
};

export async function* parse<T extends ParseRule>(
    csvPath: string,
    rule: T
): AsyncGenerator<T, void, unknown> {
    const stream = createReadStream(csvPath);
    const parser: Parser = stream.pipe(
        csvParse({
            columns: true,
        })
    );
    for await (const record of parser) {
        const keys = Object.keys(rule);
        const parsedRecord = R.pipe(
            Object.values(record),
            R.map((x, i) => ({ [keys[i]]: x })),
            R.mergeAll
        );
        yield parsedRecord as T;
    }
}
