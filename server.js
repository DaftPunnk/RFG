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
  const { mealType, date, time, guests, name, phone, email, note } = req.body;

  const formattedDate = moment(date).format('YYYY-MM-DD');
  const query = `
    INSERT INTO reservations (meal_type, date, time, guests, name, phone, email, note) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [mealType, formattedDate, time, guests, name, phone, email, note], (err, result) => {
    if (err) {
      console.error('Error saving reservation:', err);
      res.status(500).send({ message: 'Error saving reservation' });
      return;
    }
    res.status(200).send({ message: 'Reservation saved successfully' });
  });
});

app.put('/api/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  const { mealType, date, time, guests, name, phone, email, note } = req.body;

  const formattedDate = moment(date).format('YYYY-MM-DD');
  const query = `
    UPDATE reservations
    SET meal_type = ?, date = ?, time = ?, guests = ?, name = ?, phone = ?, email = ?, note = ?
    WHERE id = ?
  `;

  db.query(query, [mealType, formattedDate, time, guests, name, phone, email, note, reservationId], (err, result) => {
    if (err) {
      console.error('Error updating reservation:', err);
      res.status(500).send({ message: 'Error updating reservation' });
      return;
    }
    res.status(200).send({ message: 'Reservation updated successfully' });
  });
});

app.delete('/api/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  const query = 'DELETE FROM reservations WHERE id = ?';

  db.query(query, [reservationId], (err, result) => {
    if (err) {
      console.error('Error deleting reservation:', err);
      res.status(500).send({ message: 'Error deleting reservation' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message: 'Reservation not found' });
      return;
    }
    res.status(200).send({ message: 'Reservation deleted successfully' });
  });
});

app.get('/api/reservations', (req, res) => {
  const query = `SELECT * FROM reservations`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      res.status(500).send({ message: 'Error fetching reservations' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});









