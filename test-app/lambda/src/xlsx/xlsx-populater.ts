const XlsxPopulate = require("xlsx-populate");

export const populate = async (input: string, output: string) => {
    const workbook = await XlsxPopulate.fromFileAsync(input);
    // const sheet = workbook.sheet("シート1");
    // const sheet = workbook.sheets()[0];
    // sheet.cell("B6").value([3, 6]);
    workbook
        .sheet(0)
        .cell("B6")
        .value([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
    await workbook.toFileAsync(output);
};
