// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data.error || error.response.data.message || 'Something went wrong');
  } else if (error.request) {
    // Request made but no response received
    console.error('Network Error:', error.request);
    throw new Error('Network error. Please check if the server is running.');
  } else {
    // Something else happened
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
};

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export default API_BASE_URL;
