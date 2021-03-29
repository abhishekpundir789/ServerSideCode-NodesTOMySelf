const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = async (event, context) => {
        var params = {
            TableName: "MyNodes",
            Key: {
                //id: event.pathParameters.id
                //id: "t1616738469238"
                id: event.pathParameters.id
            }
        };

      try {
        const data = await docClient.delete(params).promise();
        const response = {
                statusCode: 200,
                body: JSON.stringify(data.Item),
                headers:{ 
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
                    "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept, Authorization, User-Agent",
                    "Content-Type": "application/json",
                }
            };
        return response;
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
             headers:{ 'Access-Control-Allow-Origin' : '*' }
        };
    }
};