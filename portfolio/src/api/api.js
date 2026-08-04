const API_BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const TOKEN_KEY = "portfolioToken";

function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setAuthToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function removeAuthToken() {
    localStorage.removeItem(TOKEN_KEY);
}

async function apiRequest(endpoint, options = {}) {
    const token = getAuthToken();

    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: headers
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
        throw new Error(result.message || "The API request failed.");
    }

    return result;
}

export {
    API_BASE_URL,
    apiRequest,
    getAuthToken,
    setAuthToken,
    removeAuthToken
};