const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = async event => {
    var params = {
        TableName: "MyNodes",
        KeyConditionExpression: "category = :i",
        ExpressionAttributeValues: {
        ":i":  "todo",
    }
    };

    try {
        const data = await docClient.query(params).promise();
        const response = {
                statusCode: 200,
                body: JSON.stringify(data.Item),
                headers:{ 'Access-Control-Allow-Origin' : '*' }
            };
        return data;
    } catch (err) {
        console.log(err);
        return {
            
            statusCode: 500
        };
    }
};

