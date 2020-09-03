module.exports = {
  tables: [
    {
      AttributeDefinitions: [
        {
          AttributeName: "ISBN",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "ISBN",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: "Books",
    },
  ],
};
