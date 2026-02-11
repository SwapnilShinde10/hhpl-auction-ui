import { apiCall } from './api';

// Get all matches
export const getAllMatches = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/matches?${queryString}` : '/matches';
    const response = await apiCall(endpoint, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

// Get match by ID
export const getMatchById = async (id) => {
  try {
    const response = await apiCall(`/matches/${id}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching match:', error);
    throw error;
  }
};

// Create a new match
export const createMatch = async (matchData) => {
  try {
    const response = await apiCall('/matches', {
      method: 'POST',
      body: JSON.stringify(matchData),
    });
    return response;
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
};

// Update match
export const updateMatch = async (id, matchData) => {
  try {
    const response = await apiCall(`/matches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(matchData),
    });
    return response;
  } catch (error) {
    console.error('Error updating match:', error);
    throw error;
  }
};

// Update match result
export const updateMatchResult = async (id, resultData) => {
  try {
    const response = await apiCall(`/matches/${id}/result`, {
      method: 'PATCH',
      body: JSON.stringify(resultData),
    });
    return response;
  } catch (error) {
    console.error('Error updating match result:', error);
    throw error;
  }
};

// Delete match
export const deleteMatch = async (id) => {
  try {
    const response = await apiCall(`/matches/${id}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Error deleting match:', error);
    throw error;
  }
};
