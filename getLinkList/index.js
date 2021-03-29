const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = async (event, context) => {
        var params = {
            TableName: "MyNodes",
            Key: {
                id: event.pathParameters.id
            }
        };

        try {
        const data = await docClient.get(params).promise();
        const response = {
                statusCode: 200,
                body: JSON.stringify(data.Item),
                headers:{ 'Access-Control-Allow-Origin' : '*' }
            };
        return response;
    } catch (err) {
        return {
            statusCode: 500
        };
    }
};