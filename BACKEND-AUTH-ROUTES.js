// ============================================
// Backend Authentication Routes
// Path: D:\Backend HHPL\hhpl-auction-backend\routes\auth.js
// ============================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Team = require('../models/Team'); // Adjust path as needed

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ============================================
// POST /api/auth/owner/login
// Owner Login Endpoint
// ============================================
router.post('/owner/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find team by email
    const team = await Team.findOne({ email: email.toLowerCase() });
    
    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Owner not found. Please register your team first.'
      });
    }

    // Check if password exists in database
    if (!team.password) {
      return res.status(500).json({
        success: false,
        error: 'Account created without password. Please contact admin.'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, team.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: team._id, 
        email: team.email,
        teamName: team.name,
        role: 'owner' 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response (without password)
    res.json({
      success: true,
      message: 'Login successful',
      token,
      owner: {
        id: team._id,
        email: team.email,
        teamName: team.name,
        ownerName: team.ownerName,
        phoneNumber: team.phoneNumber,
        logo: team.logo,
        budget: team.budget,
        createdAt: team.createdAt
      }
    });

  } catch (error) {
    console.error('Owner login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

// ============================================
// POST /api/auth/admin/login
// Admin Login Endpoint
// ============================================
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin credentials from environment variables or hardcoded
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin1997@gmail.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'C@d1ng1997';

    // Validate admin credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin credentials'
      });
    }

    // Generate JWT token for admin
    const token = jwt.sign(
      { 
        email,
        role: 'admin'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: {
        id: 'admin',
        email,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during admin login'
    });
  }
});

// ============================================
// GET /api/auth/verify
// Verify JWT Token
// ============================================
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// ============================================
// Middleware: Authenticate JWT Token
// ============================================
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      error: 'No token provided'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
}

module.exports = router;


// ============================================
// IMPORTANT: UPDATE YOUR TEAM REGISTRATION ROUTE
// ============================================
// In your existing routes/teams.js file, UPDATE the register endpoint:

/*
router.post('/register', async (req, res) => {
  try {
    const { name, ownerName, email, password, budget, logo } = req.body;

    // Validate required fields
    if (!name || !ownerName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Check if team with this email already exists
    const existingTeam = await Team.findOne({ email: email.toLowerCase() });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        error: 'A team with this email already exists'
      });
    }

    // IMPORTANT: Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new team with hashed password
    const team = new Team({
      name,
      ownerName,
      email: email.toLowerCase(),
      password: hashedPassword, // Store hashed password
      budget: budget || 10000,
      logo: logo || '',
      players: [],
      totalSpent: 0,
      remainingBudget: budget || 10000
    });

    await team.save();

    // Return success (without password)
    res.status(201).json({
      success: true,
      message: 'Team registered successfully',
      data: {
        id: team._id,
        name: team.name,
        ownerName: team.ownerName,
        email: team.email,
        budget: team.budget,
        logo: team.logo,
        createdAt: team.createdAt
      }
    });

  } catch (error) {
    console.error('Team registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});
*/


// ============================================
// UPDATE YOUR TEAM MODEL (models/Team.js)
// ============================================
// Make sure your Team model includes the password field:

/*
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  ownerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false  // Don't include password in queries by default
  },
  phoneNumber: {
    type: String
  },
  budget: {
    type: Number,
    default: 10000
  },
  logo: {
    type: String,
    default: ''
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  totalSpent: {
    type: Number,
    default: 0
  },
  remainingBudget: {
    type: Number,
    default: 10000
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);
*/


// ============================================
// SETUP INSTRUCTIONS
// ============================================

/*
1. Install required packages in your backend:
   npm install bcrypt jsonwebtoken

2. Create this file in your backend:
   D:\Backend HHPL\hhpl-auction-backend\routes\auth.js

3. Register this route in your main app.js or server.js:
   const authRoutes = require('./routes/auth');
   app.use('/api/auth', authRoutes);

4. Update your .env file to include:
   JWT_SECRET=hhpl-auction-secret-key-2024-change-this-in-production
   ADMIN_EMAIL=admin1997@gmail.com
   ADMIN_PASSWORD=C@d1ng1997

5. Update your Team model to include password field (see above)

6. Update your team registration route to hash passwords (see above)

7. IMPORTANT: If you have existing teams in database without passwords,
   you need to either:
   - Delete them and re-register
   - OR add a migration script to add default passwords
*/
