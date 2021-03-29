const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = async event => {
    const params = {
        TableName: "MyNodes",
        Item: {
            id: event.newListObject.id,
            category: "links",
            description: event.newListObject.description,
            items: event.newListObject.items
        }
    };

    try {
        const data = await docClient.put(params).promise();
        const response = {
            statusCode: 200
        };
        return response;
    } catch (err) {
        return {
            statusCode: 500,
        };
    }
};