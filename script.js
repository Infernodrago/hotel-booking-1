// var region ="us-east-1"
// var accessKeyId = "";
// var secretAccessKey="";

// AWS.config.update({
//     region:region,
//     Credentials:AWS.Credentials(accessKeyId,secretAccessKey)
// })
// var s3=new AWS.S3()

const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const PORT = 3000;

// Configure AWS SDK with your credentials and specify the region
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_KEY',
    region: 'us-east-1', // Change this to your desired region
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
    // Construct the absolute path to the HTML file
    const htmlFilePath = path.join(__dirname, 'index.html');
    
    // Send the HTML file as the response
    res.sendFile(htmlFilePath);
});

app.post('/submit-booking', (req, res) => {
    const bookingData = req.body;

    // Validate the data (you can add more validation logic here)
    if (!validateBookingData(bookingData)) {
        return res.status(400).send('Invalid data');
    }

    // Store the booking data in DynamoDB
    storeBookingData(bookingData)
        .then(() => res.status(200).send('Booking submitted successfully!'))
        .catch(error => {
            console.error('Error storing data:', error);
            res.status(500).send('Internal Server Error');
        });
});

function storeBookingData(data) {
    const params = {
        TableName: 'YourDynamoDBTableName', // Replace with your DynamoDB table name
        Item: data,
    };

    return dynamoDB.put(params).promise();
}

function validateBookingData(data) {
    // Add your validation logic here
    // For simplicity, this example checks if required fields are not empty
    if (!data.fullName || !data.email || !data.phone || !data.checkInDate || !data.checkOutDate || !data.numberOfGuests) {
        return false;
    }

    if (new Date(data.checkOutDate) <= new Date(data.checkInDate)) {
        return false;
    }

    return true;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

