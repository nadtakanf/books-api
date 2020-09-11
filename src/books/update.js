"use strict";

const { success, failure } = require("../../helper/response-lib");
const libs = require("../../helper/dynamodb-lib")

module.exports.handler = async (event) => {
	const data = event.body;
	
	// checking if ISBN is empty
	if(!event.pathParameters.ISBN) {
		throw new Error('Missing ISBN');
	}

  const params = {
    TableName: process.env.booksTableName,
    Key: {
      noteId: event.pathParameters.ISBN,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await libs.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
};
