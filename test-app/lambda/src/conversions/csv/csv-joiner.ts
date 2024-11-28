import * as R from "remeda";
import { toMap } from "../../utils/async-generator.utils";
import { parse, ParseRule } from "./csv-perser";

export type JoinCsvFile<T> = {
    filePath: string;
    rule: T;
};

export async function* join<F extends ParseRule, S extends ParseRule>(
    first: JoinCsvFile<F>,
    second: JoinCsvFile<S>,
    key: string
) {
    const ruleSecond = second.rule;
    const keyToData = await R.pipe(
        parse(second.filePath, ruleSecond),
        toMap((x) => x[key])
    );

    const ruleFirst = first.rule;
    for await (const firstData of parse(first.filePath, ruleFirst)) {
        const secoundData = keyToData.get(firstData[key]);
        if (!secoundData) {
            continue;
        }
        yield R.merge(firstData, secoundData);
    }
}
