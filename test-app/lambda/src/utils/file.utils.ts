import { writeFileSync } from "fs";
import { Readable } from "stream";

export const save = async (dest: string, file: File) => {
    const reader = file.stream().getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        writeFileSync(dest, value);
    }
};

export const readableStreamFrom = (readable: Readable) => {
    return new ReadableStream({
        start(controller) {
            readable.on("data", (chunk) => {
                controller.enqueue(chunk);
            });
            readable.on("end", () => {
                controller.close();
            });
            readable.on("error", (err) => {
                controller.error(err);
            });
        },
        cancel() {
            readable.destroy();
        },
    });
};
