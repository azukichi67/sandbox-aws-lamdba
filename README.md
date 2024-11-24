# sandbox-aws-lamdba

## CDK

### 準備

```
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
aws configure
aws iam list-users
npm install -g aws-cdk
cdk bootstrap
test-app フォルダ作る
cd test-app
cdk init app --language typescript
npm install aws-lambda @types/aws-lambda esbuild
lambda フォルダ作る
cd lambda
```

- see
  - https://www.cloudbuilders.jp/articles/4642/
  - https://fixel.co.jp/blog/cdk-preparation
  - https://fixel.co.jp/blog/cdk-lambda-typescript

## デプロイ

```
cd test-app
cdk deploy
```

## Hono 

### 準備

```
cd test-app
npm create hono@latest

C:\git\sandbox-aws-lamdba\test-app>npm create hono@latest

> test-app@0.1.0 npx
> create-hono

create-hono version 0.14.2npm
? Target directory lambda
? Which template do you want to use? aws-lambda
? Do you want to install project dependencies? yes
? Which package manager do you want to use? npm
✔ Cloning the template
✔ Installing project dependencies
🎉 Copied project files
Get started with: cd lambda

cd lambda
```

### ローカル起動

```
npm i @hono/node-server
npm install -D tsx

"dev": "tsx watch src/index.local.ts"
npm run dev
```

- see
  - https://zenn.dev/pupepa/articles/cda017645f63d4

## Jest

```
npm i -D jest
npm i -D @types/jest
npm i -D ts-jest
npx ts-jest config:init
```

```
// 常に実行されないように setting.json で設定
"jest.runMode": "on-demand"
```

- see
  - https://typescriptbook.jp/tutorials/jest
  - https://jestjs.io/ja/docs/configuration
  - https://zenn.dev/fuqda/articles/a4d0bd213bf868