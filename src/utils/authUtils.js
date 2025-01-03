/* eslint-disable no-unused-vars */
export const validateToken = (token) => {
  if (!token) return false;
  
  try {
    // Basic token validation - check if it's expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export const getAuthHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export function _doRequest(endpoint, method, body, headers) {
  return fetch('http://186.124.246.174:8080/api' + endpoint, {method: method, body: body, headers: headers})
}

export const API_URL = '';