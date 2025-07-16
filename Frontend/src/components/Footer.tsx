import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Lab Information */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/charan_kumar_ala.jpg"
                alt="Dr. Charan Kumar Ala"
                className="w-12 h-12 rounded-full object-cover"
              />
              <h3 className="text-xl font-bold">Dr. Charan Kumar Ala</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Assistant Professor at the Department of Mining Engineering,
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              National Institute of Technology, Rourkela, Odisha.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">About Us</Link>
              <Link to="/teams" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Teams</Link>
              <Link to="/products" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Products</Link>
              <Link to="/publications" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Publications</Link>
              <Link to="/openings" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">Openings</Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Department of Mining Engineering</p>
                  <p>NIT Rourkela, Odisha - 769008</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">+91-661-246-2019</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">mininginnovationlab@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 py-4 border-t border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 Dr. Charan Kumar Ala, NIT Rourkela. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Developed by{' '}
              <a
                href="https://linkedin.com/in/veera-manikanta-nandikolla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Veera Manikanta Nandikolla
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;