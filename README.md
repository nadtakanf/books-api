# Books API

<img src="/diagram/diagram.png"/>

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Books API created with Node.js, Serverless Framework, Lambda Function, API Gateway.
	
## Technologies
Project is created with:
* [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
* [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
* [Lambda Function](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
* [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* [UUID](https://www.npmjs.com/package/uuid)
* [Jest](https://jestjs.io/)
* [Prettier](https://prettier.io/)
	
## Setup
1. Install npm package run,

```
$ npm install
```

## Deployment
1. To deploy AWS cognito run,
```
$ npm run deploy:cognito <region>
```

2. To deploy Dynamodb run,
```
$ npm run deploy:dynamodb <region>
```

Todos:
* Grouping duplicate code to helper folder
* Creating integration & acceptance test [Example](https://github.com/nadtakanf/big-mouth)
* Set up prettier to [Git hooks](https://prettier.io/docs/en/install.html)
* Creating CRUD functionality for Authors table and has relationship back with books table
* Using Global Secondary Indexes in DynamoDB to support filter by publication or author
* Config route53 and API gateway 
* Adding SQS to yml file

## Get access token from Cognito User Pool
After deploy cognito, we have to create a user account and steps are below.
* Creating an account in Cognito
* ``` aws cognito-idp sign-up --region us-east-1 --client-id 7aqsqmf8v93bli7iduivba7iee --username nadtakan.jones@gmail.com --password Password123! ```
* And confirm your account by runing command below
* ``` aws cognito-idp admin-confirm-sign-up --profile nadtakan --region us-east-1 --user-pool-id us-east-1_JrhuNai6v --username nadtakan.jones@gmail.com ```
* After confirm your account, we are going to use aws cli command to get idToken from cognito
* Replacing values inside user.json(UserPoolId, ClientId, Username, Password)
* Run ``` aws cognito-idp admin-initiate-auth --region {your-aws-region} --cli-input-json file://auth.json```
* Copy idToken and pause that inside postman
<img src="/images/postman.png"/>
* Then passing json object and hit send button
<img src="/images/complete.png"/>


## Resources
* [Use jest-dynamodb](https://jestjs.io/docs/en/dynamodb)
* [Javascript Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/readme.md#section-5%EF%B8%8F%E2%83%A3-ci-and-other-quality-measures)
* [Serverless Pseudo Parameters](https://www.serverless.com/plugins/serverless-pseudo-parameters)
* [Serverless Stack](https://serverless-stack.com/)
* [Using Global Secondary Indexes in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html)
* https://stackoverflow.com/questions/49063292/how-to-generate-access-token-for-an-aws-cognito-user
https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html
