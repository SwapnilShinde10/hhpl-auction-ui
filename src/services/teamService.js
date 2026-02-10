import { apiCall } from './api';

// Team Service - handles all team-related API calls

/**
 * Register a new team
 * @param {Object} teamData - Team registration data
 * @returns {Promise<Object>} Registered team data
 */
export const registerTeam = async (teamData) => {
  return await apiCall('/teams/register', {
    method: 'POST',
    body: JSON.stringify(teamData),
  });
};

/**
 * Get all teams
 * @returns {Promise<Array>} List of all teams
 */
export const getAllTeams = async () => {
  return await apiCall('/teams', {
    method: 'GET',
  });
};

/**
 * Get team by ID
 * @param {string} teamId - Team ID
 * @returns {Promise<Object>} Team data
 */
export const getTeamById = async (teamId) => {
  return await apiCall(`/teams/${teamId}`, {
    method: 'GET',
  });
};

/**
 * Update team information
 * @param {string} teamId - Team ID
 * @param {Object} teamData - Updated team data
 * @returns {Promise<Object>} Updated team data
 */
export const updateTeam = async (teamId, teamData) => {
  return await apiCall(`/teams/${teamId}`, {
    method: 'PUT',
    body: JSON.stringify(teamData),
  });
};

/**
 * Delete a team
 * @param {string} teamId - Team ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteTeam = async (teamId) => {
  return await apiCall(`/teams/${teamId}`, {
    method: 'DELETE',
  });
};

/**
 * Get all players in a team
 * @param {string} teamId - Team ID
 * @returns {Promise<Array>} List of team players
 */
export const getTeamPlayers = async (teamId) => {
  return await apiCall(`/teams/${teamId}/players`, {
    method: 'GET',
  });
};
