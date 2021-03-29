const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = async (event, context) => {
    var params = {
        TableName: "MyNodes",
        Item: {
            //id: JSON.parse(event.body).toDoList.id,
            //id: event.todo.id,
            //id: "t3",
            id: event.toDoList.id,
            description: "New ToDO List",
            category: "todo",
            user: event.toDoList.user
            
        }
    };

    try {
        const data = await docClient.put(params).promise();
        console.log("scan succeeeded:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.log("unable to read items. Error JSON:", JSON.stringify(err, null, 2));
    }
};