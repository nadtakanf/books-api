'use strict';

const { success, failure } = require("../../helper/response-lib");

module.exports.handler = async event => {
	const params = {
    TableName: process.env.booksTableName,
    KeyConditionExpression: "ISBN = :ISBN",
    ExpressionAttributeValues: {
      ":ISBN": event.params.ISBN
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
		console.log(e);
    return failure({ status: false });
  }
};
