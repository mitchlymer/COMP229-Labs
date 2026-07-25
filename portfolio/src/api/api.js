const API_BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:3000/api";

async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
        throw new Error(result.message || "The API request failed.");
    }

    return result;
}

export { API_BASE_URL, apiRequest };