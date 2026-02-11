# Backend Player Auction API Setup

Add these files to your backend folder: `D:\Backend HHPL\hhpl-auction-backend`

## 1. Create Player Auction Controller
**File:** `controllers/playerAuctionController.js`

```javascript
const db = require('../config/firebase');
const admin = require('firebase-admin');

// Sell a player to a team
exports.sellPlayer = async (req, res) => {
  try {
    const { playerId, teamId, price } = req.body;

    // Validation
    if (!playerId || !teamId || !price) {
      return res.status(400).json({
        success: false,
        message: 'Player ID, Team ID, and Price are required'
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be greater than 0'
      });
    }

    // Get player data
    const playerDoc = await db.collection('players').doc(playerId).get();
    if (!playerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    // Get team data
    const teamDoc = await db.collection('teams').doc(teamId).get();
    if (!teamDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    const team = teamDoc.data();
    const remainingBudget = team.remainingBudget || team.totalBudget || 10000000;

    // Check if team has enough budget
    if (remainingBudget < price) {
      return res.status(400).json({
        success: false,
        message: `Insufficient budget. Team has ₹${(remainingBudget / 1000000).toFixed(2)}M remaining, but player costs ₹${(price / 1000000).toFixed(2)}M`
      });
    }

    // Update player document
    await db.collection('players').doc(playerId).update({
      soldTo: teamId,
      soldPrice: price,
      status: 'sold',
      soldAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update team document
    const newRemainingBudget = remainingBudget - price;
    const currentPlayers = team.players || [];
    
    await db.collection('teams').doc(teamId).update({
      remainingBudget: newRemainingBudget,
      players: admin.firestore.FieldValue.arrayUnion(playerId)
    });

    // Get updated player and team data
    const updatedPlayer = await db.collection('players').doc(playerId).get();
    const updatedTeam = await db.collection('teams').doc(teamId).get();

    res.status(200).json({
      success: true,
      message: 'Player sold successfully',
      data: {
        player: { id: updatedPlayer.id, ...updatedPlayer.data() },
        team: { id: updatedTeam.id, ...updatedTeam.data() }
      }
    });
  } catch (error) {
    console.error('Error selling player:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sell player',
      error: error.message
    });
  }
};

// Mark player as available (unsold)
exports.markPlayerAvailable = async (req, res) => {
  try {
    const { playerId } = req.body;

    if (!playerId) {
      return res.status(400).json({
        success: false,
        message: 'Player ID is required'
      });
    }

    // Get player data
    const playerDoc = await db.collection('players').doc(playerId).get();
    if (!playerDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    const player = playerDoc.data();
    const previousTeamId = player.soldTo;
    const previousPrice = player.soldPrice || 0;

    // If player was previously sold, restore team budget
    if (previousTeamId && previousPrice > 0) {
      const teamDoc = await db.collection('teams').doc(previousTeamId).get();
      if (teamDoc.exists) {
        const team = teamDoc.data();
        const newRemainingBudget = (team.remainingBudget || 0) + previousPrice;
        
        await db.collection('teams').doc(previousTeamId).update({
          remainingBudget: newRemainingBudget,
          players: admin.firestore.FieldValue.arrayRemove(playerId)
        });
      }
    }

    // Update player document
    await db.collection('players').doc(playerId).update({
      soldTo: null,
      soldPrice: 0,
      status: 'available',
      soldAt: null
    });

    const updatedPlayer = await db.collection('players').doc(playerId).get();

    res.status(200).json({
      success: true,
      message: 'Player marked as available',
      data: {
        player: { id: updatedPlayer.id, ...updatedPlayer.data() }
      }
    });
  } catch (error) {
    console.error('Error marking player as available:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update player status',
      error: error.message
    });
  }
};
```

## 2. Create Player Auction Routes
**File:** `routes/playerAuctionRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const { sellPlayer, markPlayerAvailable } = require('../controllers/playerAuctionController');

// POST /api/players/sell
router.post('/sell', sellPlayer);

// POST /api/players/mark-available
router.post('/mark-available', markPlayerAvailable);

module.exports = router;
```

## 3. Register Routes in server.js
**File:** `server.js` (add this line with other route imports)

```javascript
const playerAuctionRoutes = require('./routes/playerAuctionRoutes');

// ... other code ...

// Register routes (add this with other route registrations)
app.use('/api/players', playerAuctionRoutes);
```

## API Endpoints

### 1. Sell Player
**POST** `/api/players/sell`

**Request Body:**
```json
{
  "playerId": "player123",
  "teamId": "team456",
  "price": 2500000
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Player sold successfully",
  "data": {
    "player": {
      "id": "player123",
      "name": "Swapnil Shinde",
      "soldTo": "team456",
      "soldPrice": 2500000,
      "status": "sold"
    },
    "team": {
      "id": "team456",
      "name": "Mumbai Warriors",
      "remainingBudget": 7500000,
      "players": ["player123"]
    }
  }
}
```

**Error Response (Insufficient Budget):**
```json
{
  "success": false,
  "message": "Insufficient budget. Team has ₹7.50M remaining, but player costs ₹8.00M"
}
```

### 2. Mark Player as Available
**POST** `/api/players/mark-available`

**Request Body:**
```json
{
  "playerId": "player123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Player marked as available",
  "data": {
    "player": {
      "id": "player123",
      "name": "Swapnil Shinde",
      "soldTo": null,
      "soldPrice": 0,
      "status": "available"
    }
  }
}
```

## Installation Steps

1. Copy the controller file to `controllers/playerAuctionController.js`
2. Copy the routes file to `routes/playerAuctionRoutes.js`
3. Add the route registration in `server.js`
4. Restart your backend server
