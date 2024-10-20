const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eventmanagement',
    password: '1234',
    port: 5432,
});
//insert in users table
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        const emailCheck = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).send('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO "users" (name, email, password, creation_time, creation_date) VALUES ($1, $2, $3, CURRENT_TIME, CURRENT_DATE) RETURNING *',
            [name, email, hashedPassword]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Server error');
    }
});
// mobile verify
app.patch('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { mobile } = req.body;

  try {
    console.log('User ID:', id);  // Debugging logs
    console.log('Phone Number:', mobile);

    const result = await pool.query(
      'UPDATE users SET mobile = $1 WHERE id = $2 RETURNING *',
      [mobile, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Phone number updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error updating phone number:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//get events for explore
app.get('/events', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "events"');
        res.status(200).json(result.rows); 
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).send('Server error');
    }
});
//get eventdetails for explore
app.get('/api/events/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "events" WHERE id = $1', [eventId]);
        if (result.rows.length === 0) {
            return res.status(404).send('Event not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).send('Server error');
    }
});
//put in database the pending events
app.post('/api/pending_events', async (req, res) => {
  const {
      name, image, about, terms, location, latitude, longitude, date, time, category, price, total_tickets
  } = req.body;

  try {
      // Insert event with total_tickets and remaining_tickets (initially equal to total_tickets)
      const result = await pool.query(
          'INSERT INTO "pending_events" (name, image, about, terms, location, latitude, longitude, date, time, category, price, total_tickets, remaining_tickets) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
          [name, image, about, terms, location, latitude, longitude, date, time, category, price, total_tickets, total_tickets]
      );
      res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
      console.error('Error inserting event:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

   
  //fetch pending events in admin
  app.get('/api/pending_events', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM pending_events WHERE approval_status = $1', [false]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching pending events:', error);
      res.status(500).json({ error: 'Failed to fetch pending events' });
    }
  });
  //approve events
  app.patch('/api/pending_events/:id/approve', async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the event data from pending_events table
        const eventResult = await pool.query('SELECT * FROM pending_events WHERE id = $1', [id]);
        const event = eventResult.rows[0];

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Insert the event into the events table including total_tickets and remaining_tickets
        await pool.query(
            `INSERT INTO events (name, image, about, terms, location, latitude, longitude, date, time, category, price, total_tickets, remaining_tickets)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [event.name, event.image, event.about, event.terms, event.location, event.latitude, event.longitude, event.date, event.time, event.category, event.price, event.total_tickets, event.total_tickets]
        );

        // Update the approval_status in the pending_events table
        await pool.query('UPDATE pending_events SET approval_status = $1 WHERE id = $2', [true, id]);

        res.status(200).json({ message: 'Event approved successfully' });
    } catch (error) {
        console.error('Error approving event:', error);
        res.status(500).json({ error: 'Failed to approve event' });
    }
});


//ticket count
app.post('/api/events/:id/buy', async (req, res) => {
  const { id } = req.params;
  const { ticketsBought } = req.body;

  try {
      // Fetch current remaining_tickets and total_tickets
      const fetchQuery = 'SELECT remaining_tickets, total_tickets FROM "events" WHERE id = $1';
      const fetchResult = await pool.query(fetchQuery, [id]);

      if (fetchResult.rows.length === 0) {
          return res.status(404).json({ message: 'Event not found.' });
      }

      const { remaining_tickets, total_tickets } = fetchResult.rows[0];

      // Calculate the new remaining_tickets
      const updatedRemainingTickets = remaining_tickets - ticketsBought;

      if (updatedRemainingTickets < 0) {
          return res.status(400).json({ message: 'Not enough tickets available.' });
      }

      // Update the remaining_tickets in the database
      const updateQuery = 'UPDATE "events" SET remaining_tickets = $1 WHERE id = $2';
      const updateResult = await pool.query(updateQuery, [updatedRemainingTickets, id]);

      if (updateResult.rowCount === 1) {
          res.status(200).json({ message: 'Tickets purchased successfully.', remaining_tickets: updatedRemainingTickets });
      } else {
          res.status(400).json({ message: 'Failed to update tickets.' });
      }
  } catch (error) {
      console.error('Error purchasing tickets:', error);
      res.status(500).json({ message: 'An error occurred while purchasing tickets.' });
  }
});




  
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
