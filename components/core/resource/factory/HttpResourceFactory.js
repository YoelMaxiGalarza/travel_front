import { useRouter } from "next/navigation";

export class HttpResourceFactory {
  /**
   * Initializes the HttpResourceFactory with a base URL and default headers.
   * @param {string} baseUrl - The base URL for API requests (default: http://localhost:8080/api).
   */
  constructor(baseUrl = "http://localhost:8080/api") {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  /**
   * Executes an HTTP request to the specified endpoint.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {string} method - The HTTP method (e.g., GET, POST).
   * @param {object|null} body - The request payload (optional).
   * @param {string|null} authKey - The Base64-encoded authorization key (optional).
   * @returns {Promise<object>} - The response data in JSON format.
   * @throws Will throw an error if the HTTP response is not successful.
   */
  async _doRequest(endpoint, method, body = null, authKey = null) {
    const headers = {
      ...this.defaultHeaders,
      ...(authKey && { Authorization: `Basic ${authKey}` }),
    };

    const requestOptions = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, requestOptions);
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`HTTP error ${response.status}: ${errorDetails.message || response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }

  /**
   * Executes a GET request to the specified endpoint.
   * Optionally includes an authorization key in the headers.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {string|null} authKey - The Base64-encoded authorization key (optional).
   * @returns {Promise<object>} - The response data in JSON format.
   */
  async get(endpoint, authKey = null) {
    return this._doRequest(endpoint, "GET", null, authKey);
  }

  /**
   * Executes a POST request to the specified endpoint with a request body.
   * Optionally includes an authorization key in the headers.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {object} body - The request payload.
   * @param {string|null} authKey - The Base64-encoded authorization key (optional).
   * @returns {Promise<object>} - The response data in JSON format.
   */
  async post(endpoint, body, authKey = null) {
    return this._doRequest(endpoint, "POST", body, authKey);
  }

  /**
   * Authenticates a user by sending their credentials as a Base64-encoded string.
   * Stores the authentication key and username in localStorage upon success.
   * @param {string} username - The username for authentication.
   * @param {string} password - The password for authentication.
   * @returns {Promise<object>} - The authentication response data.
   * @throws Will throw an error if authentication fails or data is missing.
   */
  async authenticate(username, password) {
    const authKey = btoa(`${username}:${password}`);
    const response = await this._doRequest("/authenticate", "POST", null, authKey);

    if (response.username && response.base64EncodedAuthenticationKey) {
      localStorage.setItem("Authorization", `Basic ${response.base64EncodedAuthenticationKey}`);
      localStorage.setItem("username", response.username);
      return response;
    } else {
      throw new Error("Authentication failed: Invalid credentials or missing data.");
    }
  }

  /**
   * Executes a GET request to the specified endpoint without including authorization headers.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @returns {Promise<object>} - The response data in JSON format.
   */
  async getWithNoAuth(endpoint) {
    return this.get(endpoint);
  }
}
