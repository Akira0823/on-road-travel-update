// EmailForm.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Plane } from 'lucide-react';

const EmailForm = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessage(null);

    emailjs.sendForm(
      'service_fu9tovd', // Replace with your EmailJS service ID
      'template_y7ya9h2', // Replace with your EmailJS template ID
      form.current,
      'usytrncPbkslH0psA' // Replace with your EmailJS public key
    )
    .then((result) => {
      setMessage({ text: 'Message sent successfully!', type: 'success' });
      form.current.reset();
    }, (error) => {
      setMessage({ text: 'Failed to send message. Please try again.', type: 'error' });
    })
    .finally(() => {
      setIsSending(false);
    });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl ${
          message.type === 'success' 
            ? 'bg-green-500/20 text-green-300' 
            : 'bg-red-500/20 text-red-300'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            required
          />
        </div>
      </div>
      
      <div>
        <select
          name="travel_type"
          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
          required
        >
          <option value="">What type of travel are you interested in?</option>
          <option value="family">Family Vacation</option>
          <option value="adventure">Adventure Trip</option>
          <option value="honeymoon">Honeymoon</option>
          <option value="business">Business Travel</option>
        </select>
      </div>
      
      <div>
        <textarea
          name="message"
          placeholder="Your travel plans and questions..."
          rows="5"
          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSending}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSending ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          <>
            <Plane className="h-5 w-5" />
            Send Travel Inquiry
          </>
        )}
      </button>
    </form>
  );
};

export default EmailForm;