import { _doRequest } from '../utils/authUtils';


export const authService = {
  login: async (username, password) => {
    const response = await fetch(`http://186.124.246.174:8080/api/authenticate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }
    await response.json().then(authenticationData => {
      console.log(authenticationData.permissions)
      if (authenticationData.username === undefined || authenticationData.base64EncodedAuthenticationKey === undefined
        || authenticationData.permissions === undefined) {
        console.error("error in authentication data")
        return {};
      }
      localStorage.setItem('Authorization', 'Basic ' + authenticationData.base64EncodedAuthenticationKey)
      localStorage.setItem('username', authenticationData.username)
      localStorage.setItem('role', authenticationData.permissions[0].role)
      return authenticationData;

    });
  },

  logout: () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('username');
    if (!userStr) return null;

    try {
      const user = JSON.parse(userStr);
      //if (user.token && validateToken(user.token)) {
        return user;
      //}
      // Token is invalid or expired, clean up
      //authService.logout();
      //return null;
    } catch {
      return null;
    }
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'ADMIN';
  },


};