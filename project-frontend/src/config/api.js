// Create this file: src/utils/api.js or src/config/api.js

const API_BASE_URL = 'http://localhost:3001';

// API endpoints
export const API_ENDPOINTS = {
  subscribe: `${API_BASE_URL}/api/subscribe`,
  contact: `${API_BASE_URL}/api/contact`,
  booking: `${API_BASE_URL}/api/booking`,
  health: `${API_BASE_URL}/api/health`,
  // Admin endpoints
  dashboard: `${API_BASE_URL}/api/admin/dashboard`,
  customers: `${API_BASE_URL}/api/admin/customers`,
  messages: `${API_BASE_URL}/api/admin/messages`,
};

// Generic API call function
export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Specific API functions
export const subscribeNewsletter = async (formData) => {
  return apiCall(API_ENDPOINTS.subscribe, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const submitContactForm = async (formData) => {
  return apiCall(API_ENDPOINTS.contact, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const submitBookingRequest = async (formData) => {
  return apiCall(API_ENDPOINTS.booking, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export const checkAPIHealth = async () => {
  return apiCall(API_ENDPOINTS.health);
};