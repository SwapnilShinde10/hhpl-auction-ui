import { apiCall } from './api';

// Get Points Table
export const getPointsTable = async () => {
  try {
    const response = await apiCall('/points-table', {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching points table:', error);
    throw error;
  }
};
