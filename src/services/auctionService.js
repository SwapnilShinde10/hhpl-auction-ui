import { apiCall } from './api';

// Auction Service - handles all auction-related API calls

/**
 * Place a bid on a player
 * @param {Object} bidData - Bid data (playerId, teamId, amount)
 * @returns {Promise<Object>} Bid confirmation
 */
export const placeBid = async (bidData) => {
  return await apiCall('/auction/bid', {
    method: 'POST',
    body: JSON.stringify(bidData),
  });
};

/**
 * Get current auction state
 * @returns {Promise<Object>} Current auction data
 */
export const getCurrentAuction = async () => {
  return await apiCall('/auction/current', {
    method: 'GET',
  });
};

/**
 * Mark player as sold
 * @param {Object} soldData - Sold player data (playerId, teamId, soldPrice)
 * @returns {Promise<Object>} Update confirmation
 */
export const markPlayerSold = async (soldData) => {
  return await apiCall('/auction/sold', {
    method: 'POST',
    body: JSON.stringify(soldData),
  });
};

/**
 * Get auction history
 * @returns {Promise<Array>} Auction history records
 */
export const getAuctionHistory = async () => {
  return await apiCall('/auction/history', {
    method: 'GET',
  });
};

/**
 * Sell a player to a team
 * @param {string} playerId - Player ID
 * @param {string} teamId - Team ID
 * @param {number} price - Auction price
 * @returns {Promise<Object>} Updated player and team data
 */
export const sellPlayer = async (playerId, teamId, price) => {
  try {
    const response = await apiCall('/players/sell', {
      method: 'POST',
      body: JSON.stringify({ playerId, teamId, price }),
    });
    return response;
  } catch (error) {
    console.error('Error selling player:', error);
    throw error;
  }
};

/**
 * Mark player as available (unsold)
 * @param {string} playerId - Player ID
 * @returns {Promise<Object>} Updated player data
 */
export const markPlayerAvailable = async (playerId) => {
  try {
    const response = await apiCall('/players/mark-available', {
      method: 'POST',
      body: JSON.stringify({ playerId }),
    });
    return response;
  } catch (error) {
    console.error('Error marking player as available:', error);
    throw error;
  }
};
