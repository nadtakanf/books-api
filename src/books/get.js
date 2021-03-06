"use strict";

const { success, failure } = require("../../helper/response-lib");
const libs = require("../../helper/dynamodb-lib")

module.exports.handler = async (event) => {

	// checking if ISBN is empty
	if(event.pathParameters.ISBN) {
		throw new Error('Missing event body');
	}

  const params = {
    TableName: process.env.booksTableName,
    Key: {
      noteId: event.pathParameters.ISBN,
    },
  };

  try {
    const result = await libs.call("get", params);
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
