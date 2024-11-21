import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
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

        new nodejs.NodejsFunction(this, "Lambda", {
            functionName: "test-lambda",
            runtime: lambda.Runtime.NODEJS_22_X,
            entry: "lambda/src/hello-world.ts",
            timeout: cdk.Duration.seconds(3),
            role,
            bundling: {
                externalModules: ["*"],
                format: nodejs.OutputFormat.ESM,
            },
        });
    }
}
