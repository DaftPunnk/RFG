const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '137280czk',
    database: 'bookingdb',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to database');
});

app.post('/api/reservations', (req, res) => {
    // ... reservation submission endpoint as before ...
});

// Enhanced Endpoint to fetch the seat availability for a specific date 
app.get('/api/seat-availability/:date', (req, res) => {
    const selectedDate = req.params.date;
    console.log(`Fetching seat availability for date: ${selectedDate}`);

    // Make sure this query matches the date and time format in the database
    const availabilityQuery = `
        SELECT time, SUM(guests) AS booked_seats
        FROM reservations
        WHERE date = ?
        GROUP BY time;
    `;

    db.query(availabilityQuery, [selectedDate], (err, results) => {
        if (err) {
            console.error('Error fetching seat availability', err);
            res.status(500).send({ message: 'Error fetching seat availability' });
            return;
        }
        console.log('Results from database:', results);

        // Initialize seat availability with all time slots defaulted to max seats
        const allTimeSlots = ['12:00', '13:00', '18:00', '19:00'];
        const seatAvailability = allTimeSlots.reduce((acc, time) => {
            acc[time] = 8; // Default to max seats
            return acc;
        }, {});

        // Update the seat availability based on the query results
        results.forEach(slot => {
            // Format the time from the database to match the time slots
            const timeFormatted = moment(slot.time, 'HH:mm:ss').format('HH:mm');
            // Make sure to check if the formatted time is within the allTimeSlots
            if (allTimeSlots.includes(timeFormatted)) {
                seatAvailability[timeFormatted] = Math.max(0, 8 - slot.booked_seats);
            }
        });

        console.log('Seat availability sent to client:', seatAvailability);
        res.send(seatAvailability);
    });
});


// ... Rest of your code for other endpoints ...

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
