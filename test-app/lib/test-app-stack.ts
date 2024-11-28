import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");

export class TestAppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const layer = new lambda.LayerVersion(this, "LambdaLayer", {
            code: lambda.Code.fromAsset(
                path.join(__dirname, "../lambda/layer")
            ),
            description: "A layer that includes a template.xlsx file",
        });

        const testFunction = new nodejs.NodejsFunction(this, "Lambda", {
            functionName: "test-lambda",
            runtime: lambda.Runtime.NODEJS_22_X,
            entry: "lambda/src/index.ts",
            layers: [layer],
            timeout: cdk.Duration.seconds(3),
            environment: {
                NODE_ENV: "production",
            },
        });

        testFunction.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
            invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
        });
    }
}
