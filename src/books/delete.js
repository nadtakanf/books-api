"use strict";

const { success, failure } = require("../../helper/response-lib");

module.exports.handler = async (event) => {
	
	if(event.pathParameters.ISBN) {
		throw new Error('Missing event body');
	}

  const params = {
    TableName: process.env.booksTableName,
    Key: {
      ISBN: event.pathParameters.ISBN,
    },
  };

  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
};
