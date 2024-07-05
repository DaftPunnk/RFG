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
    const { mealType, date, time, guests, name, phone, email } = req.body;

    const formattedDate = moment(date).format('YYYY-MM-DD');
    const query = `
        INSERT INTO reservations (meal_type, date, time, guests, name, phone, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [mealType, formattedDate, time, guests, name, phone, email], (err, result) => {
        if (err) {
            console.error('Error saving reservation:', err);
            res.status(500).send({ message: 'Error saving reservation' });
            return;
        }
        res.status(200).send({ message: 'Reservation saved successfully' });
    });
});

app.get('/api/seat-availability/:date', (req, res) => {
    const selectedDate = req.params.date;
    console.log(`Fetching seat availability for date: ${selectedDate}`);

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

        const allTimeSlots = ['12:00', '13:00', '18:00', '19:00'];
        const seatAvailability = allTimeSlots.reduce((acc, time) => {
            acc[time] = 8; // Initialize with total seats available
            return acc;
        }, {});

        results.forEach(slot => {
            const timeFormatted = moment(slot.time, 'HH:mm:ss').format('HH:mm');
            if (allTimeSlots.includes(timeFormatted)) {
                seatAvailability[timeFormatted] -= slot.booked_seats; // Subtract booked seats from total seats
            }
        });

        console.log('Seat availability sent to client:', seatAvailability);
        res.send(seatAvailability);
    });
});

// Get all reservations
app.get('/api/reservations', (req, res) => {
    const query = `SELECT * FROM reservations`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching reservations:', err);
            res.status(500).send({ message: 'Error fetching reservations' });
            return;
        }
        res.json(results); // Ensure JSON response
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});







