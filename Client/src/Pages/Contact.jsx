import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Check, X, Send, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
    
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "support@lumioflow.com",
      link: "mailto:support@lumioflow.com",
      description: "Get in touch via email"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Call us during business hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      content: "123 Tech Street, Silicon Valley, CA",
      link: "https://maps.google.com",
      description: "Visit our office"
    }
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, link: "#", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, link: "#", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, link: "#", label: "Twitter" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <br /><br />
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            Get in touch
          </div>
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Contact <span className="font-semibold text-green-600">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about our ESP32 energy monitoring system? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 mb-2">Send us a message</h2>
              <div className="w-16 h-0.5 bg-green-500"></div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    required
                    className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 ${
                      focusedField === 'name' ? 'border-green-500' : 'border-gray-200'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required
                    className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 ${
                      focusedField === 'email' ? 'border-green-500' : 'border-gray-200'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField('')}
                  required
                  className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 ${
                    focusedField === 'subject' ? 'border-green-500' : 'border-gray-200'
                  }`}
                  placeholder="How can we help you?"
                />
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  required
                  rows="5"
                  className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 resize-none ${
                    focusedField === 'message' ? 'border-green-500' : 'border-gray-200'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Form Status Message */}
            {formStatus.submitted && (
              <div className={`mt-6 p-4 rounded-lg border-2 ${
                formStatus.success 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center gap-3">
                  {formStatus.success ? (
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <p className="font-medium">{formStatus.message}</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">Get in touch</h3>
              <div className="w-16 h-0.5 bg-green-500 mb-8"></div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="group block p-6 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-green-100/50 border-2 border-transparent hover:border-green-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{info.title}</h4>
                      <p className="text-gray-600 mb-1">{info.content}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-gray-900">Business Hours</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-600 ml-15">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-gray-800 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-gray-800 font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-green-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto p-8 bg-green-50 rounded-2xl border border-green-100">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are already monitoring their energy consumption with our ESP32 solution.
            </p>
            <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25">
              <Send className="w-4 h-4" />
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;