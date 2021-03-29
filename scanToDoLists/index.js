const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = async event => {
        var params = {
            TableName: "MyNodes",
            FilterExpression: 'category = :cat AND #user = :user',
            ExpressionAttributeValues: {
                ":cat": "todo",
                ":user": event['pathParameters']['id']
            },
            ExpressionAttributeNames: {
            "#user": "user"
        }
        };

     try {
        //await to satisfy the promise
        const data = await docClient.scan(params).promise();
        //the response is now a JSON object with a status code of 200 and a body of JSON data
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
        // Return the JSON response
        return response;
        //if there is an error we won't return any body, but just a status code of 500 to indicate a failed attempt
        } catch (e) {
        return {
            statusCode: 500
        };
    }
};