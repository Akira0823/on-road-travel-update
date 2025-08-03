import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Star, Calendar, Users, Camera, ChevronRight, Menu, X, Globe, Shield, Award } from 'lucide-react';
import ContactForm from './components/ContactForm';



const OnRoadTravel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [packageSlide, setPackageSlide] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const destinations = [
    {
      name: 'Kashmir Valley',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '₹25,999',
      duration: '7 Days',
      rating: 4.8,
      description: 'Experience the paradise on earth with stunning valleys and snow-capped mountains'
    },
    {
      name: 'Goa Beaches',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '₹18,999',
      duration: '5 Days',
      rating: 4.7,
      description: 'Relax on pristine beaches with vibrant nightlife and Portuguese heritage'
    },
    {
      name: 'Rajasthan Heritage',
      image: 'https://as2.ftcdn.net/v2/jpg/00/59/66/35/1000_F_59663502_Q0oCrYRXnIO5R07PehAz03duabpJnM23.jpg',
      price: '₹32,999',
      duration: '10 Days',
      rating: 4.9,
      description: 'Explore magnificent palaces, forts and rich cultural heritage of royal Rajasthan'
    },
    {
      name: 'Kerala Backwaters',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '₹22,999',
      duration: '6 Days',
      rating: 4.6,
      description: 'Cruise through serene backwaters and experience the spice gardens of Kerala'
    },
    {
      name: 'Himachal Adventure',
      image: 'https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '₹28,999',
      duration: '8 Days',
      rating: 4.8,
      description: 'Adventure sports and mountain trekking in the beautiful Himachal Pradesh'
    },
    {
      name: 'Golden Triangle',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '₹24,999',
      duration: '6 Days',
      rating: 4.7,
      description: 'Classic India tour covering Delhi, Agra and Jaipur with iconic monuments'
    }
  ];

  const services = [
    {
      icon: <Globe className="w-8 h-8 text-amber-600" />,
      title: 'Custom Itineraries',
      description: 'Personalized travel plans tailored to your preferences and budget'
    },
    {
      icon: <Shield className="w-8 h-8 text-amber-600" />,
      title: 'Safe & Secure',
      description: 'Complete travel insurance and 24/7 customer support during your journey'
    },
    {
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: 'Expert Guides',
      description: 'Professional local guides with deep knowledge of destinations'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const packageTimer = setInterval(() => {
      setPackageSlide((prev) => (prev + 1) % Math.ceil(destinations.length / 3));
    }, 4000);
    return () => clearInterval(packageTimer);
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setIsEmailPopupOpen(true);
    }, 10000);
    return () => clearTimeout(popupTimer);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsEmailPopupOpen(false);
    // Handle email submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                On Road Travel
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors duration-300">Home</a>
              <a href="#destinations" className="text-gray-700 hover:text-amber-600 transition-colors duration-300">Destinations</a>
              <a href="#services" className="text-gray-700 hover:text-amber-600 transition-colors duration-300">Services</a>
              <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors duration-300">About</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors duration-300">Contact</a>
              <button 
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsEmailPopupOpen(true)}
              >
                Book Now
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-amber-600">Home</a>
              <a href="#destinations" className="block text-gray-700 hover:text-amber-600">Destinations</a>
              <a href="#services" className="block text-gray-700 hover:text-amber-600">Services</a>
              <a href="#about" className="block text-gray-700 hover:text-amber-600">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-amber-600">Contact</a>
              <button 
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-full"
                onClick={() => setIsEmailPopupOpen(true)}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Your Next
              <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Create unforgettable memories with our expertly crafted travel experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsEmailPopupOpen(true)}
              >
                Explore Destinations
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore breathtaking destinations carefully selected for their beauty and cultural significance
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${packageSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(destinations.length / 3) }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {destinations.slice(slideIndex * 3, slideIndex * 3 + 3).map((destination, index) => (
                      <div 
                        key={slideIndex * 3 + index}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={destination.image} 
                            alt={destination.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold">{destination.rating}</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-amber-600">{destination.price}</span>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span className="text-sm">{destination.duration}</span>
                            </div>
                          </div>
                          <button 
                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                            onClick={() => setIsEmailPopupOpen(true)}
                          >
                            <span>View Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Package Slide Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(destinations.length / 3) }, (_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === packageSlide ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setPackageSlide(index)}
                />
              ))}
            </div>
            
            {/* Manual Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
              onClick={() => setPackageSlide((prev) => (prev - 1 + Math.ceil(destinations.length / 3)) % Math.ceil(destinations.length / 3))}
            >
              <ChevronRight className="w-6 h-6 rotate-180 text-gray-700" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
              onClick={() => setPackageSlide((prev) => (prev + 1) % Math.ceil(destinations.length / 3))}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* About/Why Choose Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              On Road Travel - Your Premier Holiday Tour Planner
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
             India is not just a destination—it's a world within a country.
              From the towering peaks of the Himalayas to the palm-fringed beaches of the south, from the vibrant streets of cities to the peaceful charm of remote villages,
              India offers a rich tapestry of landscapes, cultures, and experiences. Dive into centuries of history, explore colorful festivals, taste diverse cuisines,
              and find adventure at every step. With every journey, you'll uncover something new, something unforgettable. Let On Road Travel be your guide to discovering the true essence of India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Choose On Road Travel?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">7-8+ Years of Excellence</h4>
                    <p className="text-gray-600">With over three decades of industry experience, we bring you the finest of magnificent India through more than 600 carefully curated tours, backed by our dedicated team of 100+ travel experts.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Diverse Destinations & Themes</h4>
                    <p className="text-gray-600">We offer an extensive range of exciting themes and packages - from family vacations and honeymoon trips to adventure tours - covering popular destinations across India, Nepal, and Bhutan.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Personalized Itineraries</h4>
                    <p className="text-gray-600">We empower you to select or create your own itinerary. Choose from our India tours OR customize existing packages to create a fresh, tailor-made tour perfectly suited to your preferences and needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Travel Encyclopedia</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our platform is your complete guide to exploring India—featuring top destinations, hidden gems,
                festivals, food, culture, hotels, and activities. 
                Discover everything to see, taste, and experience across the country, all in one easy-to-navigate place.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-gray-700">Exhaustive destination information</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-gray-700">Expert recommendations and insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-gray-700">Carefully segmented travel categories</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-gray-700">One-stop solution for all travel needs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Process */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">How to Book Your Dream Holiday?</h3>
              <p className="text-xl text-amber-100">Booking your perfect tour is quick, simple, and effective</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Fill Inquiry Form</h4>
                <p className="text-amber-100">Share your email, phone number, tour preferences, or any questions through our detailed inquiry forms available on most pages.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Expert Consultation</h4>
                <p className="text-amber-100">Our travel experts promptly respond to your inquiry with personalized recommendations and detailed itineraries.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Confirm & Travel</h4>
                <p className="text-amber-100">Within no time, your dream tour to India is booked and you're ready for an unforgettable journey!</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button 
                className="bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsEmailPopupOpen(true)}
              >
                Start Planning Your Trip
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-amber-100 mb-8 leading-relaxed">
            Let our travel experts create the perfect itinerary for your dream vacation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              onClick={() => setIsEmailPopupOpen(true)}
            >
              Get Free Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300">
              Call Us Now
            </button>
          </div>
        </div>
      </section>

     {/* Contact Section */ }
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to plan your perfect trip? Contact our travel experts today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT SIDE - Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+91-8580410699</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@onroadtravel.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">123 Travel Street,Mandi, Himachal Pradesh</p>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT SIDE - Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">On Road Travel</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for unforgettable travel experiences across India and beyond.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#destinations" className="text-gray-400 hover:text-white">Destinations</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Custom Tours</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Group Travel</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Adventure Tours</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Luxury Travel</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">+91-8580410699</li>
                <li className="text-gray-400">info@onroadtravel.com</li>
                <li className="text-gray-400">mandi, Himachal Pradesh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 On Road Travel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Email Popup Modal */}
      {isEmailPopupOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform animate-bounce-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Exclusive Travel Deals!</h3>
              <p className="text-gray-600">Subscribe to our newsletter and get up to 20% off on your next trip</p>
            </div>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
              <input 
                type="Tel" 
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
              <input
              type="Email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />

              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent">
                <option value="">Select Your Interest</option>
                <option value="adventure">Adventure Tours</option>
                <option value="luxury">Luxury Travel</option>
                <option value="family">Family Vacations</option>
                <option value="honeymoon">Honeymoon Packages</option>
                <option value="group">Group Tours</option>
              </select>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={handleEmailSubmit}
                >
                  Get Deals
                </button>
                <button 
                  className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  onClick={() => setIsEmailPopupOpen(false)}
                >
                  Later
                </button>
              </div>
            </div>
            
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              onClick={() => setIsEmailPopupOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default OnRoadTravel;