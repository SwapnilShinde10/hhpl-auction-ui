import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllPlayers, deletePlayer as apiDeletePlayer, updatePlayer } from '../services/playerService';
import { getAllTeams, deleteTeam as apiDeleteTeam } from '../services/teamService';
import { getAllMatches, deleteMatch as apiDeleteMatch, updateMatchResult as apiUpdateMatchResult } from '../services/matchService';

const DataContext = createContext(null);

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teams from API
  const fetchTeams = async () => {
    try {
      const response = await getAllTeams();
      const teamsData = response.data || response;
      setTeams(teamsData);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.message);
    }
  };

  // Fetch players from API
  const fetchPlayers = async () => {
    try {
      const response = await getAllPlayers();
      const playersData = response.data || response;
      setPlayers(playersData);
    } catch (err) {
      console.error('Error fetching players:', err);
      setError(err.message);
    }
  };

  // Fetch matches from API
  const fetchMatches = async () => {
    try {
      const response = await getAllMatches();
      const matchesData = response.data || response;
      setMatches(matchesData);
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError(err.message);
    }
  };

  // Load initial data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTeams(), fetchPlayers(), fetchMatches()]);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Delete player
  async function deletePlayer(id) {
    try {
      await apiDeletePlayer(id);
      setPlayers((p) => p.filter((pl) => pl.id !== id));
    } catch (err) {
      console.error('Error deleting player:', err);
      throw err;
    }
  }

  // Delete team
  async function deleteTeam(id) {
    try {
      await apiDeleteTeam(id);
      setTeams((t) => t.filter((team) => team.id !== id));
    } catch (err) {
      console.error('Error deleting team:', err);
      throw err;
    }
  }

  function deductPoints(teamId, points) {
    setTeams((t) => t.map((team) => (team.id === teamId ? { ...team, remainingBudget: Math.max(0, team.remainingBudget - points) } : team)));
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

  async function updateMatchResult(matchId, winnerId, team1Score, team2Score) {
    try {
      await apiUpdateMatchResult(matchId, {
        winner: winnerId,
        team1Score: team1Score,
        team2Score: team2Score
      });
      // Refresh matches after update
      await fetchMatches();
    } catch (err) {
      console.error('Error updating match result:', err);
      throw err;
    }
  }

  async function deleteMatch(matchId) {
    try {
      await apiDeleteMatch(matchId);
      setMatches((m) => m.filter((match) => match.id !== matchId));
    } catch (err) {
      console.error('Error deleting match:', err);
      throw err;
    }
  }

  const value = {
    teams,
    players,
    matches,
    loading,
    error,
    deletePlayer,
    deleteTeam,
    deductPoints,
    addMatch,
    updateMatchResult,
    deleteMatch,
    setPlayers,
    setTeams,
    setMatches,
    fetchTeams,
    fetchPlayers,
    fetchMatches,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContext;
