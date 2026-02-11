# Backend Points Table API Setup

Add these files to your backend folder: `D:\Backend HHPL\hhpl-auction-backend`

## 1. Create Points Table Controller
**File:** `controllers/pointsTableController.js`

```javascript
const db = require('../config/firebase');

// Get Points Table with team statistics
exports.getPointsTable = async (req, res) => {
  try {
    // Fetch all teams
    const teamsSnapshot = await db.collection('teams').get();
    const teams = [];
    teamsSnapshot.forEach(doc => {
      teams.push({ id: doc.id, ...doc.data() });
    });

    // Fetch all completed matches
    const matchesSnapshot = await db.collection('matches')
      .where('status', '==', 'completed')
      .get();
    
    const matches = [];
    matchesSnapshot.forEach(doc => {
      matches.push({ id: doc.id, ...doc.data() });
    });

    // Calculate statistics for each team
    const pointsTable = teams.map(team => {
      // Find all matches for this team
      const teamMatches = matches.filter(match => {
        const team1Id = match.team1?.id || match.team1Id;
        const team2Id = match.team2?.id || match.team2Id;
        return team1Id === team.id || team2Id === team.id;
      });

      const matchesPlayed = teamMatches.length;
      const wins = teamMatches.filter(match => match.winner === team.id).length;
      const losses = matchesPlayed - wins;
      const points = wins * 2;

      // Get last 5 matches with results (most recent first)
      const last5 = teamMatches
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map(match => ({
          matchId: match.id,
          isWin: match.winner === team.id,
          opponent: match.team1?.id === team.id 
            ? (match.team2?.name || match.team2Name) 
            : (match.team1?.name || match.team1Name),
          date: match.date
        }));

      return {
        id: team.id,
        name: team.name,
        logo: team.logo,
        matchesPlayed,
        wins,
        losses,
        points,
        nrr: '+0.000', // Placeholder - can be calculated based on runs scored/conceded
        last5
      };
    });

    // Sort by points (descending), then by wins (descending)
    pointsTable.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.matchesPlayed - a.matchesPlayed;
    });

    res.status(200).json({
      success: true,
      data: pointsTable
    });
  } catch (error) {
    console.error('Error fetching points table:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch points table',
      error: error.message
    });
  }
};
```

## 2. Create Points Table Routes
**File:** `routes/pointsTableRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const { getPointsTable } = require('../controllers/pointsTableController');

// GET /api/points-table
router.get('/', getPointsTable);

module.exports = router;
```

## 3. Register Routes in server.js
**File:** `server.js` (add this line with other route imports)

```javascript
const pointsTableRoutes = require('./routes/pointsTableRoutes');

// ... other code ...

// Register routes (add this with other route registrations)
app.use('/api/points-table', pointsTableRoutes);
```

## Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "team123",
      "name": "Mumbai Warriors",
      "logo": "data:image/png;base64,...",
      "matchesPlayed": 5,
      "wins": 4,
      "losses": 1,
      "points": 8,
      "nrr": "+0.000",
      "last5": [
        {
          "matchId": "match5",
          "isWin": true,
          "opponent": "RCB",
          "date": "FEB 10, 2026"
        },
        {
          "matchId": "match4",
          "isWin": false,
          "opponent": "CSK",
          "date": "FEB 08, 2026"
        }
      ]
    }
  ]
}
```

## Installation Steps

1. Copy the controller file to `controllers/pointsTableController.js`
2. Copy the routes file to `routes/pointsTableRoutes.js`
3. Add the route registration in `server.js`
4. Restart your backend server
5. Test the endpoint: `GET http://localhost:5000/api/points-table`
