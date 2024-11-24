import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TestAppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const role = new iam.Role(this, "LambdaRole", {
            roleName: "lambda-role",
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName(
                    "service-role/AWSLambdaBasicExecutionRole"
                ),
            ],
        });

        const layer = new lambda.LayerVersion(this, "LambdaLayer", {
            code: lambda.Code.fromAsset(
                path.join(__dirname, "../lambda/layer")
            ), // レイヤーのディレクトリ
            compatibleRuntimes: [lambda.Runtime.NODEJS_22_X], // 使用可能なランタイム
            description: "A layer that includes a template.xlsx file",
        });

        new nodejs.NodejsFunction(this, "Lambda", {
            functionName: "test-lambda",
            runtime: lambda.Runtime.NODEJS_22_X,
            entry: "lambda/src/index.ts",
            layers: [layer],
            timeout: cdk.Duration.seconds(3),
            role,
            bundling: {
                format: nodejs.OutputFormat.ESM,
            },
        });
    }
}
