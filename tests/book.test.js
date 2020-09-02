const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const isTest = true;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

const ddb = new DocumentClient(config);

// import table name
const table = "Books";

it('should insert item into table', async () => {
	// insert data to database
  await ddb
    .put({
			TableName: table, 
			Item: {
				ISBN: "123445671", 
				title: "Quiet: The Power of Introverts in a World That Can not Stop Talking",
				authors: [{
					name: "Susan Cain",
					birthday: "08/24/1890"
				},{
					name: "Susan Cain",
					birthday: "08/24/1890"
				}],
				publisher: "Crown Publishing Group",
				publicationYear: 1933,
				description: "At least one-third of the people we know are introverts. They are the ones who prefer listening to speaking; who innovate and create but dislike self-promotion; who favor working on their own over working in teams. It is to introverts—Rosa Parks, Chopin, Dr. Seuss, Steve Wozniak—that we owe many"
			}
		}).promise();

  const { Item } = await ddb.get({
		TableName: table, 
		Key: {ISBN: '123445671'}
	}).promise();

  expect(Item).toEqual({
    ISBN: "123445671", 
		title: "Quiet: The Power of Introverts in a World That Can not Stop Talking",
		authors: [{
			name: "Susan Cain",
			birthday: "08/24/1890"
		},{
			name: "Susan Cain",
			birthday: "08/24/1890"
		}],
		publisher: "Crown Publishing Group",
		publicationYear: 1933,
		description: "At least one-third of the people we know are introverts. They are the ones who prefer listening to speaking; who innovate and create but dislike self-promotion; who favor working on their own over working in teams. It is to introverts—Rosa Parks, Chopin, Dr. Seuss, Steve Wozniak—that we owe many"
	});
});

it('should update item into table', async () => {
	// preparing data to update
	const data = {
		publicationYear: 1995
	}

	// update begin
	const result = await ddb.update({
		TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'ISBN': Book ID
    Key: {
      ISBN: "123445671"
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET title = :title, publisher = :publisher, publicationYear = :publicationYear, description =:description",
    ExpressionAttributeValues: {
      ":title": data.title || null,
			":publisher": data.publisher || null,
			":publicationYear": data.publicationYear || null,
			":description": data.description || null
    },
    ReturnValues: "ALL_NEW"
	})

	expect(result).toBeTruthy();
})

it('should delete item in table', async () => {
	// delete begin
	const result = await ddb.delete({
		TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'ISBN': Book ID
    Key: {
      ISBN: "123445671"
    }
	})

	expect(result).toBeTruthy();
})

it('should get item in table', async () => {
	const { Item } = await ddb.get({
		TableName: table, 
		Key: {ISBN: '123445671'}
	}).promise();
})