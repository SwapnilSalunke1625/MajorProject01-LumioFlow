import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
                LumioFlow
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering sustainable energy management through innovative technology solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:scale-110 transition-transform duration-300 hover:text-green-400"
                  title={social.name}
                  aria-label={social.name}
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-400">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index} className="group">
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-2 group-hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-60 group-hover:opacity-100" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link, index) => (
                <li key={index} className="group">
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-2 group-hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-60 group-hover:opacity-100" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-purple-400">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 cursor-pointer"
                >
                  <span className="text-green-400 text-lg">{contact.icon}</span>
                  <span>{contact.text}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-r-lg transition-colors text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
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

        {/* Back to Top Button */}
        <div className="absolute bottom-4 right-110">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            title="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;