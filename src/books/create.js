"use strict";

const uuid = require("uuid");
const { success, failure } = require("../../helper/response-lib");
const libs = require("../../helper/dynamodb-lib")

module.exports.handler = async (event) => {

	console.log(event);

	const data = event.body;
	
	if(!data) {
		throw new Error('Missing event body');
	}

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
      createdAt: Date.now(),
    },
	};
	
	console.log(params);

  try {
    // putting record to dynamodb
    await libs.call("put", params);
    return success(params.Item);
  } catch (e) {
		console.log(e);
    return failure({ status: false });
  }
};
