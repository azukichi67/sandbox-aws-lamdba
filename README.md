# sandbox-aws-lamdba

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