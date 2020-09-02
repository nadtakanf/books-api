'use strict';

const { success, failure } = require("../../helper/response-lib");

module.exports.handler = async event => {
	const params = {
    TableName: process.env.booksTableName,
    Key: {
      noteId: event.pathParameters.ISBN
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
};
