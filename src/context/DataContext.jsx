import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext(null);

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Mumbai Warriors', logo: 'MW', remainingPoints: 8500000, squadSize: 11 },
    { id: 2, name: 'Delhi Kings', logo: 'DK', remainingPoints: 7200000, squadSize: 10 },
    { id: 3, name: 'Bangalore Strikers', logo: 'BS', remainingPoints: 6800000, squadSize: 9 },
    { id: 4, name: 'Kolkata Knights', logo: 'KK', remainingPoints: 7900000, squadSize: 11 },
    { id: 5, name: 'Chennai Titans', logo: 'CT', remainingPoints: 7500000, squadSize: 10 },
    { id: 6, name: 'Rajasthan Royals', logo: 'RR', remainingPoints: 6500000, squadSize: 8 },
  ]);

  const [players, setPlayers] = useState([
    { id: 1, name: 'Virat Kohli', fullName: 'Virat Kohli', dob: '1988-11-05', role: 'Batsman', status: 'Sold', team: 'Mumbai Warriors', points: 120, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '101' },
    { id: 2, name: 'Rohit Sharma', fullName: 'Rohit Sharma', dob: '1987-04-30', role: 'Batsman', status: 'Available', team: '-', points: 0, ageCategory: 'Above 18', flatWing: 'B Wing', flatNumber: '203' },
    { id: 3, name: 'Jasprit Bumrah', fullName: 'Jasprit Bumrah', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' },
    { id: 4, name: 'Swapnil Shinde', fullName: 'Swapnil Shinde', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' },
    { id: 5, name: 'Shubham Shinde', fullName: 'Shubham Shinde', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' },
    { id: 6, name: 'Umesh Murty', fullName: 'Jasprit Bumrah', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' },
    { id: 7, name: 'Jasprit Bumrah', fullName: 'Jasprit Bumrah', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' },
    { id: 8, name: 'Jasprit Bumrah', fullName: 'Jasprit Bumrah', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' },
    { id: 9, name: 'Jasprit Bumrah', fullName: 'Jasprit Bumrah', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' },
    { id: 10, name: 'Jasprit Bumrah', fullName: 'Jasprit Bumrah', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' },
    { id: 11, name: 'Jasprit Bumrah', fullName: 'Jasprit Bumrah', dob: '1993-03-06', role: 'Bowler', status: 'Sold', team: 'Delhi Kings', points: 95, ageCategory: 'Above 18', flatWing: 'A Wing', flatNumber: '110' }

  ]);

  const [matches, setMatches] = useState([
    {
      id: 1,
      matchNumber: 'MATCH 1',
      group: 'GROUP A',
      team1Id: 1,
      team1Name: 'Mumbai Warriors',
      team2Id: 2,
      team2Name: 'Delhi Kings',
      venue: 'Harshail Cricket Ground',
      location: 'Mumbai',
      date: '2026-02-20',
      time: '13:30',
      status: 'scheduled',
      winner: null,
      team1Score: '',
      team2Score: '',
    },
    {
      id: 2,
      matchNumber: 'MATCH 2',
      group: 'GROUP B',
      team1Id: 3,
      team1Name: 'Bangalore Strikers',
      team2Id: 4,
      team2Name: 'Kolkata Knights',
      venue: 'Harshail Cricket Ground',
      location: 'Bangalore',
      date: '2026-02-23',
      time: '13:30',
      status: 'scheduled',
      winner: null,
      team1Score: '',
      team2Score: '',
    },
  ]);

  function deletePlayer(id) {
    setPlayers((p) => p.filter((pl) => pl.id !== id));
  }

  function deleteTeam(id) {
    setTeams((t) => t.filter((team) => team.id !== id));
  }

  function deductPoints(teamId, points) {
    setTeams((t) => t.map((team) => (team.id === teamId ? { ...team, remainingPoints: Math.max(0, team.remainingPoints - points) } : team)));
  }

  function addMatch(match) {
    const newMatch = {
      ...match,
      id: matches.length > 0 ? Math.max(...matches.map(m => m.id)) + 1 : 1,
      status: 'scheduled',
      winner: null,
      team1Score: '',
      team2Score: '',
    };
    setMatches((m) => [...m, newMatch]);
  }

  function updateMatchResult(matchId, winnerId, team1Score, team2Score) {
    setMatches((m) =>
      m.map((match) =>
        match.id === matchId
          ? { ...match, status: 'completed', winner: winnerId, team1Score, team2Score }
          : match
      )
    );
  }

  function deleteMatch(matchId) {
    setMatches((m) => m.filter((match) => match.id !== matchId));
  }

  const value = {
    teams,
    players,
    matches,
    deletePlayer,
    deleteTeam,
    deductPoints,
    addMatch,
    updateMatchResult,
    deleteMatch,
    setPlayers,
    setTeams,
    setMatches,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContext;
