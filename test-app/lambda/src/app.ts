import { createReadStream } from "fs";
import { Hono } from "hono";
import { stream } from "hono/streaming";
import { resolve } from "path";
import { Readable } from "stream";
import { readableStreamFrom } from "./utils/file.utils";

export const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.post("/samples", (c) => {
    const templateDir =
        process.env.NODE_ENV == "production"
            ? "/opt/template"
            : "layer/template";
    const template = resolve(templateDir, "template.xlsx");
    const fileStream: Readable = createReadStream(template);

    c.header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    c.header("Content-Disposition", "attachment; filename=sample.xlsx");
    return stream(c, async (stream) => {
        stream.onAbort(() => {
            console.error("abort streaming");
        });
        await stream.pipe(readableStreamFrom(fileStream));
    });
});
