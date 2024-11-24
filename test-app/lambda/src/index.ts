import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

// serve(app);

export const handler = handle(app);