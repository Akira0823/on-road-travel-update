import { useState, useEffect } from 'react';
import { customerAPI, contactAPI, bookingAPI, healthAPI } from '../services/api';

const ApiTest = () => {
  const [status, setStatus] = useState('Testing API connection...');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setLoading(true);
      const response = await healthAPI.check();
      if (response.data.success) {
        setStatus('✅ Backend connection successful!');
      } else {
        setStatus('❌ Backend connection failed');
      }
    } catch (error) {
      setStatus('❌ Cannot connect to backend: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testSubscription = async () => {
    try {
      setLoading(true);
      setStatus('Testing newsletter subscription...');
      
      const testData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        phone: '9876543210',
        interest: 'Adventure Travel',
        message: 'This is a test subscription'
      };
      
      const response = await customerAPI.subscribe(testData);
      if (response.data.success) {
        setStatus('✅ Newsletter subscription successful!');
      }
    } catch (error) {
      setStatus('❌ Subscription failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const testContact = async () => {
    try {
      setLoading(true);
      setStatus('Testing contact form...');
      
      const testData = {
        name: 'Test Contact',
        email: `contact${Date.now()}@example.com`,
        phone: '9876543210',
        subject: 'Test Message',
        message: 'This is a test contact message'
      };
      
      const response = await contactAPI.sendMessage(testData);
      if (response.data.success) {
        setStatus('✅ Contact form submission successful!');
      }
    } catch (error) {
      setStatus('❌ Contact form failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const testBooking = async () => {
    try {
      setLoading(true);
      setStatus('Testing booking request...');
      
      const testData = {
        customerName: 'Test Traveler',
        customerEmail: `traveler${Date.now()}@example.com`,
        customerPhone: '9876543210',
        destination: 'Goa',
        packageName: 'Beach Paradise Package',
        travelDate: '2024-12-25',
        travelers: 2,
        budget: 50000,
        specialRequests: 'Vegetarian meals preferred'
      };
      
      const response = await bookingAPI.createBooking(testData);
      if (response.data.success) {
        setStatus('✅ Booking request successful!');
      }
    } catch (error) {
      setStatus('❌ Booking failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      margin: '20px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ color: '#d97706' }}>🚀 On Road Travel API Integration Test</h2>
      <p><strong>Status:</strong> <span style={{ 
        color: status.includes('✅') ? 'green' : status.includes('❌') ? 'red' : 'orange'
      }}>{status}</span></p>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={testConnection} 
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          🔄 Test Connection
        </button>
        
        <button 
          onClick={testSubscription} 
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          📧 Test Newsletter
        </button>
        
        <button 
          onClick={testContact} 
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          💬 Test Contact
        </button>
        
        <button 
          onClick={testBooking} 
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          🎫 Test Booking
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Available Endpoints:</strong></p>
        <ul>
          <li>✅ GET /api/health - Health check</li>
          <li>✅ POST /api/subscribe - Newsletter subscription</li>
          <li>✅ POST /api/contact - Contact form</li>
          <li>✅ POST /api/booking - Booking request</li>
          <li>✅ GET /api/admin/dashboard - Admin dashboard</li>
          <li>✅ GET /api/admin/customers - Customer list</li>
          <li>✅ GET /api/admin/messages - Contact messages</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTest;