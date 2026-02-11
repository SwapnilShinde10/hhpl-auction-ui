# Backend Authentication API Documentation

## Overview
This document describes the authentication API endpoints required for owner and admin login functionality.

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Owner Login
**Endpoint:** `POST /auth/owner/login`

**Description:** Authenticates a team owner using their registered email and password.

**Request Body:**
```json
{
  "email": "owner@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "owner": {
    "id": "owner_id_123",
    "email": "owner@example.com",
    "teamName": "Team Tigers",
    "ownerName": "John Doe",
    "phoneNumber": "1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

- **400 Bad Request:**
```json
{
  "success": false,
  "error": "Email and password are required"
}
```

- **401 Unauthorized:**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "error": "Owner not found. Please register your team first."
}
```

---

### 2. Admin Login
**Endpoint:** `POST /auth/admin/login`

**Description:** Authenticates an admin user.

**Request Body:**
```json
{
  "email": "admin1997@gmail.com",
  "password": "C@d1ng1997"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "admin_id",
    "email": "admin1997@gmail.com",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

- **401 Unauthorized:**
```json
{
  "success": false,
  "error": "Invalid admin credentials"
}
```

---

### 3. Verify Token
**Endpoint:** `GET /auth/verify`

**Description:** Verifies if a JWT token is valid and returns user data.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "owner",
    "teamName": "Team Tigers"
  }
}
```

**Error Responses:**

- **401 Unauthorized:**
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

- **403 Forbidden:**
```json
{
  "success": false,
  "error": "No token provided"
}
```

---

## Implementation Notes

### Backend Implementation Requirements:

1. **Database Schema:**
   - Teams collection should include: email, password (hashed), teamName, ownerName, phoneNumber, etc.
   - Password should be hashed using bcrypt with salt rounds of 10+

2. **JWT Token:**
   - Use JWT (jsonwebtoken library) for token generation
   - Token should expire after 7 days (or as per requirements)
   - Include user ID, email, and role in token payload

3. **Middleware:**
   - Create authentication middleware to verify JWT tokens
   - Use for protected routes

4. **Security:**
   - Always hash passwords before storing in database
   - Use bcrypt.compare() to verify passwords during login
   - Never return password in API responses
   - Use environment variables for JWT secret

### Example Backend Code Structure:

```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Team = require('../models/Team');

// Owner Login
router.post('/owner/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }

    // Find team by email
    const team = await Team.findOne({ email });
    if (!team) {
      return res.status(404).json({ 
        success: false, 
        error: 'Owner not found. Please register your team first.' 
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
      { id: team._id, email: team.email, role: 'owner' },
      process.env.JWT_SECRET,
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
        teamName: team.teamName,
        ownerName: team.ownerName,
        phoneNumber: team.phoneNumber,
        createdAt: team.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during login' 
    });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const ADMIN_EMAIL = 'admin1997@gmail.com';
    const ADMIN_PASSWORD = 'C@d1ng1997';

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid admin credentials' 
      });
    }

    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
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
    res.status(500).json({ 
      success: false, 
      error: 'Server error during admin login' 
    });
  }
});

// Verify Token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
```

### Middleware Example:

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ 
      success: false, 
      error: 'No token provided' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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

module.exports = { authenticateToken };
```

### Environment Variables:
```
JWT_SECRET=your_very_secure_random_string_here
```

---

## Frontend Integration

The frontend already includes:
- `authService.js` - Service for making auth API calls
- Updated `Login.jsx` - Login form with API integration
- Error handling and loading states
- Token storage in localStorage
- Success/error messages

## Testing

Test the login flow with:
1. Valid owner credentials (registered team email/password)
2. Invalid credentials (should show error)
3. Admin credentials
4. Non-existent email (should show "register first" message)
