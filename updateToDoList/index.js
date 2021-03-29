const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = async (event, context) => {
    /*const description = JSON.parse(event.body).todo.description
     return {
            statusCode: 200,
            headers:{ 'Access-Control-Allow-Origin' : '*', 'Content-type': 'application/json' },
            body: description
        };*/
    var itemId =  JSON.parse(event.body).toDoList.itemToPatchIndex
    var params = {
       
        TableName: "MyNodes",
        Key: {//id: "t1"
            id: event['pathParameters']['id']
            
        },
       
        UpdateExpression: "set description = :descr, #items["+itemId+"] = :item",
        ExpressionAttributeValues: {
            //':descr':event.toDoList.description,
            //':descr':JSON.parse(event.body).description,
            //':descr':'new descr',
            ':descr': JSON.parse(event.body).toDoList.description,
            ':item': JSON.parse(event.body).toDoList.items[itemId]
        },
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