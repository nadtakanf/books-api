'use strict';

const { success, failure } = require("../../helper/response-lib");

module.exports.handler = async event => {
	const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.booksTableName,
    Key: {
      noteId: event.pathParameters.ISBN
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
};
