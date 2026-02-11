import { apiCall } from './api';

// Auth Service - handles authentication-related API calls

/**
 * Owner login
 * @param {string} email - Owner email
 * @param {string} password - Owner password
 * @returns {Promise<Object>} Login response with token and user data
 */
export const ownerLogin = async (email, password) => {
  return await apiCall('/auth/owner/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

/**
 * Admin login
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise<Object>} Login response with token and admin data
 */
export const adminLogin = async (email, password) => {
  return await apiCall('/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

/**
 * Verify token
 * @param {string} token - JWT token
 * @returns {Promise<Object>} User data if token is valid
 */
export const verifyToken = async (token) => {
  return await apiCall('/auth/verify', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Logout - clear local storage
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userData');
};

/**
 * Store auth data in localStorage
 * @param {string} token - JWT token
 * @param {string} role - User role (owner/admin)
 * @param {Object} userData - User data
 */
export const storeAuthData = (token, role, userData) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userRole', role);
  localStorage.setItem('userData', JSON.stringify(userData));
};

/**
 * Get stored auth token
 * @returns {string|null} Auth token
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Get stored user role
 * @returns {string|null} User role
 */
export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

/**
 * Get stored user data
 * @returns {Object|null} User data
 */
export const getUserData = () => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};
