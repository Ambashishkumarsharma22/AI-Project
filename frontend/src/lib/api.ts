import axios from 'axios';

// Dynamically determine API base URL based on current location
const getApiBaseUrl = () => {
    const hostname = window.location.hostname;
    const port = 5000;
    
    // If accessed via localhost, use localhost; otherwise use the current hostname
    const baseURL = import.meta.env.VITE_API_BASE_URL || `http://${hostname}:${port}`;
    return baseURL;
};

export const api = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for error handling
api.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);
