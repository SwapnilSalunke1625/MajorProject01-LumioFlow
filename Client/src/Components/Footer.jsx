import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { ChevronUp, Mail, Phone, MapPin,Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Products', path: '/products' },
      { name: 'Energy Management', path: '/energy-management' },
      { name: 'Resources', path: '/resources' }
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ]
  };

  const contactInfo = [
    { icon: '✉️', text: 'contact@lumioflow.com' },
    { icon: '📞', text: '+1 (555) 123-4567' },
    { icon: '📍', text: '123 Energy Street, Tech City' }
  ];

  const socialLinks = [
    { name: 'Facebook', Icon: FaFacebook, url: '#' },
    { name: 'Twitter', Icon: FaTwitter, url: '#' },
    { name: 'LinkedIn', Icon: FaLinkedin, url: '#' },
    { name: 'Instagram', Icon: FaInstagram, url: '#' }
  ];

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"
             style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="group">
            <
              div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center mr-3">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <Link to="/" className="text-xl font-sembold text-white">
              Lumio<span className="text-green-500 font-semibold">Flow</span>
            </Link>
          </div>
              <p className="text-gray-300 leading-relaxed">
                Empowering sustainable energy management through innovative technology solutions.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white/5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10 hover:border-green-400/30"
                  title={social.name}
                  aria-label={social.name}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index} className="group">
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-3 group-hover:translate-x-2 py-1"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
              Support
            </h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link, index) => (
                <li key={index} className="group">
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-3 group-hover:translate-x-2 py-1"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                Contact Us
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 cursor-pointer py-1"
                  >
                    <span className="text-green-400 text-lg">{contact.icon}</span>
                    <span className="text-sm">{contact.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold mb-3 text-white">Stay Updated</h4>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 text-sm font-medium"
                >
                  {isSubscribed ? '✨ Subscribed!' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} LumioFlow. All rights reserved. Made with 💚 for a sustainable future.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      
    </footer>
  );
};

export default Footer;