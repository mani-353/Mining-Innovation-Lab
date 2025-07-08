
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Lab Information */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">MI</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Mining Innovation Lab</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Advancing mining technology through innovative research, cutting-edge tools, 
              and collaborative solutions for safer and more efficient mining operations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/teams" className="text-gray-300 hover:text-white transition-colors">Teams/People</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products/Tools</Link></li>
              <li><Link to="/publications" className="text-gray-300 hover:text-white transition-colors">Publications</Link></li>
              <li><Link to="/openings" className="text-gray-300 hover:text-white transition-colors">Openings</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies & Support</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/copyright" className="text-gray-300 hover:text-white transition-colors">Copyright Policy</Link></li>
              <li><Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help & FAQ</Link></li>
              <li><Link to="/feedback" className="text-gray-300 hover:text-white transition-colors">Feedback</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="text-sm">
                  <p>Department of Mining Engineering</p>
                  <p>National Institute of Technology Rourkela</p>
                  <p>Rourkela, Odisha - 769008</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">+91-661-246-2000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">mining@nitrkl.ac.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-2 md:mb-0">
              <p>© 2024 Mining Innovation Lab, NIT Rourkela. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>Developed and designed by</span>
              <a 
                href="https://linkedin.com/in/veera-manikanta-nandikolla" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <span>Veera Manikanta Nandikolla</span>
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
