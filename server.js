const express = require('express');
const bodyParser = require('body-parser');
const { storeBookingData } = require('./dynamodb'); // Adjust the path accordingly

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
