// services/api.js
const API_BASE_URL = 'http://localhost:3001/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API Functions
export const api = {
  // Health check
  health: () => apiCall('/health'),

  // Newsletter subscription
  subscribe: (userData) => apiCall('/subscribe', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Contact form
  contact: (contactData) => apiCall('/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  }),

  // Booking request
  booking: (bookingData) => apiCall('/booking', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  }),

  // Admin endpoints (if needed)
  admin: {
    dashboard: () => apiCall('/admin/dashboard'),
    customers: () => apiCall('/admin/customers'),
    messages: () => apiCall('/admin/messages'),
    updateMessage: (id, status) => apiCall(`/admin/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  },
};

export default api;