require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const pg = require('pg');
const userRoutes = require('./routes');
const ipfsRoutes = require('./ipfs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// PostgreSQL pool setup
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/lemonad',
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
}));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/ipfs', ipfsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('LeMonad backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 