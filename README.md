# nestjs-lambda-starter

![CI status](https://github.com/twihike/nestjs-lambda-starter/workflows/ci/badge.svg)

[NestJS](https://github.com/nestjs/nest) framework starter with AWS Lambda.

## Related projects

- [nest-starter](https://github.com/twihike/nestjs-starter)

## How to use with Amplify

Add API and Function.

```shell
cd <amplify-project>
amplify add api
```

```text
? Please select from one of the below mentioned services: REST
? Provide a friendly name for your resource to be used as a label for this category in the project: apixxxxxxxx
? Provide a path (e.g., /book/{isbn}): /api
? Choose a Lambda source Create a new Lambda function
? Provide a friendly name for your resource to be used as a label for this category in the project: examplexxxxx
? Provide the AWS Lambda function name: examplexxxxx
? Choose the function runtime that you want to use: NodeJS
? Choose the function template that you want to use: Serverless ExpressJS function (Integration with API Gateway)
? Do you want to access other resources created in this project from your Lambda function? No
? Do you want to invoke this function on a recurring schedule? No
? Do you want to edit the local lambda function now? Yes
Succesfully added the Lambda function locally
? Restrict API access Yes
? Who should have access? Authenticated users only
? What kind of access do you want for Authenticated users? create, read, update, delete
? Do you want to add another path? No
Successfully added resource apifefce8b8 locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```

Configure lambda handler and environment variables.

```shell
cd <amplify-project>/amplify/backend/function/<function-name>
vi <function-name>-cloudformation-template.json
```

```diff
diff --git a/<function-name>-cloudformation-template.json b/<function-name>-cloudformation-template.json
--- a/<function-name>-cloudformation-template.json
+++ b/<function-name>-cloudformation-template.json
@@ -30,7 +30,7 @@
             "aws:asset:property": "Code"
           },
           "Properties": {
-            "Handler": "index.handler",
+            "Handler": "dist/index.handler",
             "FunctionName": {
                 "Fn::If": [
                     "ShouldNotCreateEnvResources",
@@ -53,11 +53,16 @@
             "Environment": {
                 "Variables" : {
                     "ENV": {
                         "Ref": "env"
                     },
                     "REGION": { 
                         "Ref": "AWS::Region"
-                    }
+                    },
+                    "NODE_ENV": "production",
+                    "TYPEORM_HOST": "your db host",
+                    "TYPEORM_USERNAME": "your username",
+                    "TYPEORM_PASSWORD": "your password",
+                    "TYPEORM_DATABASE": "your db name",

                 }
             },
```

Clone starter repository.

```shell
cd <amplify-project>/amplify/backend/function/<function-name>
rm -rf src
git clone https://github.com/twihike/nestjs-lambda-starter.git src
cd src
rm -rf .git
yarn install
```

Run `amplify-push.sh` to do the following:

- Compile to JavaScript.
- Install only the production packages used by lambda.
- Run `amplify push`.

```shell
# requires jq and docker
cd <amplify-project>/amplify/backend/function/<function-name>/src
./scripts/amplify-push.sh
```

## Running the app

```shell
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```shell
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## DB migration

```shell
# generate
yarn run migration:generate <name>

# show all migrations
yarn run migration:show

# run
yarn run migration:run

# dry run
yarn run schema:log

# revert
yarn run migration:revert
```

## Documentation

```shell
yarn run doc
```
