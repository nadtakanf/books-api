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

## Resources
* [Use jest-dynamodb](https://jestjs.io/docs/en/dynamodb)
* [Javascript Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/readme.md#section-5%EF%B8%8F%E2%83%A3-ci-and-other-quality-measures)
* [Serverless Pseudo Parameters](https://www.serverless.com/plugins/serverless-pseudo-parameters)
* [Serverless Stack](https://serverless-stack.com/)
* [Using Global Secondary Indexes in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html)
