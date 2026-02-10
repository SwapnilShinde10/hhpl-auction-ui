import { apiCall } from './api';

// Player Service - handles all player-related API calls

/**
 * Register a new player
 * @param {Object} playerData - Player registration data
 * @returns {Promise<Object>} Registered player data
 */
export const registerPlayer = async (playerData) => {
  return await apiCall('/players/register', {
    method: 'POST',
    body: JSON.stringify(playerData),
  });
};

/**
 * Get all players
 * @returns {Promise<Array>} List of all players
 */
export const getAllPlayers = async () => {
  return await apiCall('/players', {
    method: 'GET',
  });
};

/**
 * Get player by ID
 * @param {string} playerId - Player ID
 * @returns {Promise<Object>} Player data
 */
export const getPlayerById = async (playerId) => {
  return await apiCall(`/players/${playerId}`, {
    method: 'GET',
  });
};

/**
 * Update player information
 * @param {string} playerId - Player ID
 * @param {Object} playerData - Updated player data
 * @returns {Promise<Object>} Updated player data
 */
export const updatePlayer = async (playerId, playerData) => {
  return await apiCall(`/players/${playerId}`, {
    method: 'PUT',
    body: JSON.stringify(playerData),
  });
};

/**
 * Delete a player
 * @param {string} playerId - Player ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deletePlayer = async (playerId) => {
  return await apiCall(`/players/${playerId}`, {
    method: 'DELETE',
  });
};

/**
 * Get players by role
 * @param {string} role - Player role (Batsman, Bowler, All-Rounder, Wicket-Keeper)
 * @returns {Promise<Array>} List of players with specified role
 */
export const getPlayersByRole = async (role) => {
  return await apiCall(`/players/role/${role}`, {
    method: 'GET',
  });
};

/**
 * Update player status
 * @param {string} playerId - Player ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated player data
 */
export const updatePlayerStatus = async (playerId, status) => {
  return await apiCall(`/players/${playerId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};
