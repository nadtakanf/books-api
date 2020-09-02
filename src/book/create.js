'use strict';

const uuid = require("uuid");
const { success, failure } = require("../../helper/response-lib");

module.exports.handler = async event => {
	const data = JSON.parse(event.body);

	// creating params to pass to dynamodb
  const params = {
    TableName: process.env.booksTableName,
    Item: {
      ISBN: uuid.v1(),
      title: data.title,
			authors: data.authors,
			publisher: data.publisher,
			publicationYear: data.publicationYear,
			description: data.description,
      createdAt: Date.now()
    }
  };

  try {
		// putting record to dynamodb
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
};
