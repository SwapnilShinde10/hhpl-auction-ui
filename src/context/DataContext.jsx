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

  function deletePlayer(id) {
    setPlayers((p) => p.filter((pl) => pl.id !== id));
  }

  function deductPoints(teamId, points) {
    setTeams((t) => t.map((team) => (team.id === teamId ? { ...team, remainingPoints: Math.max(0, team.remainingPoints - points) } : team)));
  }

  const value = {
    teams,
    players,
    deletePlayer,
    deductPoints,
    setPlayers,
    setTeams,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContext;
