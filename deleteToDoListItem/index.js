const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = async (event, context) => {
    var itemIndex = event['pathParameters']['item']
    var params = {
         
        TableName: "MyNodes",
        Key: {
            //id: event.pathParameters.id
            // "REMOVE #items["+event.pathParameters.item+"]"
            id: event['pathParameters']['id']
        },
       
        UpdateExpression: "REMOVE #items["+itemIndex+"]",
        ExpressionAttributeNames: {
            "#items": "items"
        }
    };

    try {
        const data = await docClient.update(params).promise();
        const response = {
            statusCode: 200,
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization, User-Agent",
            "Content-Type": "application/json",
        },
            body: JSON.stringify(data.Item),
        };
        console.log(data.item);
        return response;
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            headers:{ 'Access-Control-Allow-Origin' : '*' }
        };
    }
};