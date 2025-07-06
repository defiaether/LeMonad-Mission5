const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/lemonad' });

// Multer setup for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'server/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Helper: Username profanity filter (simple)
const isProfane = (username) => /\b(adult|sex|fuck|shit|porn)\b/i.test(username);

// Helper: Username validation
const isValidUsername = (username) => /^[a-zA-Z0-9_]{1,10}$/.test(username) && !isProfane(username);

// Register
router.post(
  '/signup',
  (req, res, next) => {
    if (
      req.headers['content-type'] &&
      req.headers['content-type'].includes('multipart/form-data')
    ) {
      upload.single('profile_picture')(req, res, next);
    } else {
      next();
    }
  },
  async (req, res) => {
    console.log('Signup request body:', req.body);
    try {
      const { username, email, password } = req.body;
      if (!isValidUsername(username)) {
        console.log('Invalid username:', username);
        return res.status(400).json({ error: 'Invalid or profane username.' });
      }
      if (!email || !password) {
        console.log('Missing email or password:', email, password);
        return res.status(400).json({ error: 'Email and password required.' });
      }
      const hash = await bcrypt.hash(password, 12);
      const profile_picture = req.file ? `/uploads/${req.file.filename}` : null;
      const result = await pool.query(
        'INSERT INTO users (username, email, password, profile_picture) VALUES ($1, $2, $3, $4) RETURNING id, username, email, profile_picture, is_verified',
        [username, email, hash, profile_picture]
      );
      req.session.userId = result.rows[0].id;
      res.json({ user: result.rows[0] });
    } catch (err) {
      console.error('Signup error:', err);
      if (err.code === '23505')
        return res.status(409).json({ error: 'Username or email already exists.' });
      res.status(500).json({ error: 'Server error.' });
    }
  }
);

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required.' });
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });
    req.session.userId = user.id;
    res.json({ user: { id: user.id, username: user.username, email: user.email, profile_picture: user.profile_picture, is_verified: user.is_verified, bio: user.bio } });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// Get current user profile
router.get('/me', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated.' });
  const result = await pool.query('SELECT id, username, email, profile_picture, is_verified, bio FROM users WHERE id = $1', [req.session.userId]);
  res.json({ user: result.rows[0] });
});

// Update profile (username, email, password, profile picture)
router.put('/me', upload.single('profile_picture'), async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated.' });
  const { username, email, password, bio } = req.body;
  console.log('Updating bio:', bio);
  let profile_picture;
  if (req.file) profile_picture = `/uploads/${req.file.filename}`;
  if (username && !isValidUsername(username)) return res.status(400).json({ error: 'Invalid or profane username.' });
  try {
    let query = 'UPDATE users SET ';
    const fields = [];
    const values = [];
    let idx = 1;
    if (username) { fields.push(`username = $${idx++}`); values.push(username); }
    if (email) { fields.push(`email = $${idx++}`); values.push(email); }
    if (password) { fields.push(`password = $${idx++}`); values.push(await bcrypt.hash(password, 12)); }
    if (profile_picture) { fields.push(`profile_picture = $${idx++}`); values.push(profile_picture); }
    if (bio !== undefined) { fields.push(`bio = $${idx++}`); values.push(bio); }
    if (!fields.length) return res.status(400).json({ error: 'No fields to update.' });
    values.push(req.session.userId);
    query += fields.join(', ') + ` WHERE id = $${idx} RETURNING id, username, email, profile_picture, is_verified, bio`;
    const result = await pool.query(query, values);
    res.json({ user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Username or email already exists.' });
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router; 