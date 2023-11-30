// const AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: 'YOUR_ACCESS_KEY',
//     secretAccessKey: 'YOUR_SECRET_KEY',
//     region: 'us-east-1', // Change this to your desired region
// });

// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// function storeBookingData(data) {
//     const params = {
//         TableName: 'YourDynamoDBTableName', // Replace with your DynamoDB table name
//         Item: {
//             fullName: data.fullName,
//             email: data.email,
//             phone: data.phone,
//             checkInDate: data.checkInDate,
//             checkOutDate: data.checkOutDate,
//             numberOfGuests: parseInt(data.numberOfGuests),
//             lengthOfStay: parseInt(data.lengthOfStay),
//             roomType: data.roomType,
//             specialRequests: data.specialRequests,
//         },
//     };

//     return dynamoDB.put(params).promise();
// }

// module.exports = {
//     storeBookingData,
// };

const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
    region: 'us-east-1', // Change this to your desired region
    credentials: {
        accessKeyId: 'YOUR_ACCESS_KEY',
        secretAccessKey: 'YOUR_SECRET_KEY',
    },
});

async function storeBookingData(data) {
    const params = {
        TableName: 'YourDynamoDBTableName', // Replace with your DynamoDB table name
        Item: {
            fullName: { S: data.fullName },
            email: { S: data.email },
            phone: { S: data.phone },
            checkInDate: { S: data.checkInDate },
            checkOutDate: { S: data.checkOutDate },
            numberOfGuests: { N: data.numberOfGuests },
            lengthOfStay: { N: data.lengthOfStay },
            roomType: { S: data.roomType },
            specialRequests: { S: data.specialRequests },
        },
    };

    try {
        await client.send(new PutItemCommand(params));
        console.log('Successfully stored data in DynamoDB');
    } catch (error) {
        console.error('Error storing data:', error);
        throw error;
    }
}

module.exports = {
    storeBookingData,
};
