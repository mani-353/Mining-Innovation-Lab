
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Shield, FileText, Settings, Phone } from 'lucide-react';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isHindi?: boolean;
}

const Navigation = ({ isMenuOpen, setIsMenuOpen, isHindi = false }: NavigationProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: isHindi ? 'होम' : 'Home', icon: Home },
    { path: '/dashboard', label: isHindi ? 'खनन दुर्घटना डैशबोर्ड' : 'Mining Accident Dashboard', icon: BarChart3 },
    { path: '/risk', label: isHindi ? 'जोखिम मूल्यांकन' : 'Risk Assessment', icon: Shield, comingSoon: true },
    { path: '/safety', label: isHindi ? 'सुरक्षा उपाय और नीतियां' : 'Safety Measures & Policies', icon: FileText },
    { path: '/admin', label: isHindi ? 'एडमिन पैनल' : 'Admin Panel', icon: Settings },
    { path: '/about', label: isHindi ? 'संपर्क और FAQs' : 'About/Contact & FAQs', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-blue-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.comingSoon ? '#' : item.path}
              className={`flex items-center space-x-2 py-4 px-2 hover:bg-blue-700 transition-colors relative ${
                isActive(item.path) ? 'bg-blue-700 border-b-2 border-yellow-400' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.comingSoon && (
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full ml-2">
                  {isHindi ? 'जल्द आ रहा है' : 'Coming Soon'}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.comingSoon ? '#' : item.path}
                className={`flex items-center space-x-3 py-3 px-2 hover:bg-blue-700 transition-colors ${
                  isActive(item.path) ? 'bg-blue-700' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.comingSoon && (
                  <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full ml-auto">
                    {isHindi ? 'जल्द आ रहा है' : 'Coming Soon'}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
