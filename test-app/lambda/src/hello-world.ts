import { Handler } from "aws-lambda";

export const handler: Handler = async (event, context) => {
    console.log("Event:", event);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello, World!" }),
    };
};
