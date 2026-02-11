// ============================================
// Backend Team Routes - Add this endpoint
// Path: D:\Backend HHPL\hhpl-auction-backend\routes\teams.js
// ============================================

// Add this new endpoint to your existing teams.js routes file:

/**
 * GET /api/teams/owner/:email
 * Get team by owner email (with populated players)
 */
router.get('/owner/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Find team by email and populate players
    const team = await Team.findOne({ email: decodeURIComponent(email).toLowerCase() })
      .populate('players') // This will populate the full player objects
      .select('-password'); // Exclude password field

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
        data: null
      });
    }

    // Return team data with players
    res.json({
      success: true,
      message: 'Team retrieved successfully',
      data: {
        _id: team._id,
        name: team.name,
        ownerName: team.ownerName,
        email: team.email,
        phoneNumber: team.phoneNumber,
        budget: team.budget,
        logo: team.logo,
        players: team.players || [],
        totalSpent: team.totalSpent || 0,
        remainingBudget: team.remainingBudget || team.budget,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching team by owner email:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching team'
    });
  }
});


// ============================================
// IMPORTANT: Route Order Matters!
// ============================================
// Place this route BEFORE any routes with dynamic parameters like /:id
// Otherwise, "owner" might be interpreted as an ID
//
// Correct order:
// 1. GET /api/teams/owner/:email  (specific route)
// 2. GET /api/teams/:id           (dynamic route)
//
// Example:
/*
router.get('/owner/:email', async (req, res) => { ... });
router.get('/:id', async (req, res) => { ... });
*/


// ============================================
// Full Example of Updated routes/teams.js
// ============================================

/*
const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const bcrypt = require('bcrypt');

// Register new team
router.post('/register', async (req, res) => {
  try {
    const { name, ownerName, email, password, budget, logo } = req.body;

    if (!name || !ownerName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    const existingTeam = await Team.findOne({ email: email.toLowerCase() });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        error: 'A team with this email already exists'
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const team = new Team({
      name,
      ownerName,
      email: email.toLowerCase(),
      password: hashedPassword,
      budget: budget || 10000,
      logo: logo || '',
      players: [],
      totalSpent: 0,
      remainingBudget: budget || 10000
    });

    await team.save();

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

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().select('-password').populate('players');
    res.json({
      success: true,
      data: teams
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching teams'
    });
  }
});

// Get team by owner email (NEW ENDPOINT - place before /:id)
router.get('/owner/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const team = await Team.findOne({ email: decodeURIComponent(email).toLowerCase() })
      .populate('players')
      .select('-password');

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Team retrieved successfully',
      data: {
        _id: team._id,
        name: team.name,
        ownerName: team.ownerName,
        email: team.email,
        phoneNumber: team.phoneNumber,
        budget: team.budget,
        logo: team.logo,
        players: team.players || [],
        totalSpent: team.totalSpent || 0,
        remainingBudget: team.remainingBudget || team.budget,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching team by owner email:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching team'
    });
  }
});

// Get team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .select('-password')
      .populate('players');
    
    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Team not found'
      });
    }

    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching team'
    });
  }
});

// Update team
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    
    // Don't allow password updates through this endpoint
    delete updates.password;

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Team not found'
      });
    }

    res.json({
      success: true,
      message: 'Team updated successfully',
      data: team
    });
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating team'
    });
  }
});

// Delete team
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Team not found'
      });
    }

    res.json({
      success: true,
      message: 'Team deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting team'
    });
  }
});

module.exports = router;
*/
