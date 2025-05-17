const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Logging

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If using SSL (e.g., for production on Heroku)
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected at:', res.rows[0].now);
  }
});

// Authentication routes
const authRouter = express.Router();

// Register a new user
authRouter.post('/register', async (req, res) => {
  try {
    const { email, password, full_name, role } = req.body;
    
    // Validate AUI email domain
    if (!email.endsWith('@aui.ma')) {
      return res.status(400).json({ message: 'Email must be from the AUI domain (@aui.ma)' });
    }
    
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Insert into users table
      const userResult = await client.query(
        'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING user_id',
        [email, hashedPassword, role]
      );
      
      const userId = userResult.rows[0].user_id;
      
      // Insert into user_profiles table
      await client.query(
        'INSERT INTO user_profiles (user_id, full_name) VALUES ($1, $2)',
        [userId, full_name]
      );
      
      await client.query('COMMIT');
      
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          user_id: userId,
          email,
          role,
          full_name
        }
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// Login a user
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user
    const userResult = await pool.query(
      'SELECT u.*, p.full_name FROM users u JOIN user_profiles p ON u.user_id = p.user_id WHERE u.email = $1',
      [email]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = userResult.rows[0];
    
    // Check if user is active
    if (!user.is_active) {
      return res.status(403).json({ message: 'Account is deactivated. Please contact an administrator.' });
    }
    
    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const tokenSecret = process.env.JWT_SECRET || 'your-secret-key-here';
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        role: user.role
      },
      tokenSecret,
      { expiresIn: '1d' }
    );
    
    // Return user info and token
    res.json({
      user: {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// Attach auth router to app
app.use('/api/auth', authRouter);

// Root route for API health check
app.get('/api', (req, res) => {
  res.json({ message: 'SkillSphere API is running' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;