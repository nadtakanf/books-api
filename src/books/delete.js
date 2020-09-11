"use strict";

const { success, failure } = require("../../helper/response-lib");
const libs = require("../../helper/dynamodb-lib")

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
    await libs.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
};
