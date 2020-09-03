const AWS = require('aws-sdk');
const creds = new AWS.SharedIniFileCredentials({ profile: 'buildcenter' });
AWS.config.update({ region: 'us-west-1', credentials: creds });

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, X-Auth-Token');
  res.header('content-type', 'application/json');
  res.status(200).send('{}');
});

app.get('/:resource', handleReq);
app.get('/:resource/:id', handleReq);
app.post('/:resource', handleReq);
app.post('/:resource/:id', handleReq);
app.put('/:resource/:id', handleReq);
app.put('/:resource/:id/:prop', handleReq);
app.delete('/:resource/:id', handleReq);

app.listen(3000, () => console.log('listening on 3000...'));

function handleReq(req, res) {
  let resource = req.params.resource;
  let handler;
  switch (resource) {
    case 'signUp':
    case 'inviteUser':
    case 'logIn':
    case 'forgotPassword':
    case 'resetPassword':
    case 'resendSignUp':
    case 'deactivateUser':
    case 'reactivateUser':
    case 'acceptInvitation':
    case 'resendInvite':
    case 'refreshToken':
    case 'logOut':
      handler = 'auth';
      break;
    case 'scheduleItemsForWorkerBoard':
    case 'scheduleItemsForWorkerBoardReq':
    case 'scheduleItemsForProjectBoard':
      handler = 'scheduleItems';
      break;
    case 'timeEntriesForSheet':
      handler = 'timeEntries';
      break;
    default:
      handler = resource;
  }
  const lambda = require(`../handlers/${handler}`);
  const idStr = req.params.id ? `/${req.params.id}` : '';
  const prop = req.params.prop ? `/${req.params.prop}` : '';

  const event = {
    resource: `/${resource}/{proxy+}`,
    path: `/${resource}${idStr}${prop}`,
    pathParameters: {
      id: req.params.id
    },
    queryStringParameters: req.query,
    httpMethod: req.method,
    headers: req.headers,
    'body': JSON.stringify(req.body),
  };

  lambda.handler(event, {}, sendRes);

  function sendRes(err, result) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('content-type', 'application/json');
    if (err) {
      res.send(err);
    } else {
      const body = JSON.parse(result.body);
      const status = isNaN(body.status) ? 500 : body.status;
      res.status(status).send(body);
    }
  }
}
