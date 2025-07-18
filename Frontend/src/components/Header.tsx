
import React, { useState } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isRiskAssessmentOpen, setIsRiskAssessmentOpen] = useState(false);
  const navigate = useNavigate();

  const productLinks = [
    { name: 'Mining Accident Analysis', path: '/products/mining-accident-analysis' },
    { name: 'Risk Assessment', path: '/products/risk-assessment' },
    {
      name: 'Notable Projects',
      path: '/products/risk-assessment',
      hasSubMenu: true,
      subItems: [
        { name: 'IoT Air Monitoring System', path: '/products/air-monitoring' },
        { name: 'Landslide Detection', path: '/products/landslide-detection' }
      ]
    },
  ];

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/teams' },
    { name: 'Tools', path: '/products', hasDropdown: true },
    { name: 'Publications', path: '/publications' },
    { name: 'Openings', path: '/openings' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/charan_kumar_ala.jpg"
                alt="Dr. Charan Kumar Ala"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                  Dr. Charan Kumar Ala
                </h1>
                <p className="text-sm text-gray-600">
                  Department of Mining Engineering | NIT Rourkela
                </p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="lab-header text-white">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center space-x-1 py-4 px-2 hover:bg-white/20 transition-colors"
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Link>

                    {isProductsOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-xl py-2 z-50">
                        {productLinks.map((product) => (
                          <div key={product.name} className="relative">
                            {product.hasSubMenu ? (
                              <div
                                className="relative"
                                onMouseEnter={() => setIsRiskAssessmentOpen(true)}
                                onMouseLeave={() => setIsRiskAssessmentOpen(false)}
                              >
                                <Link
                                  to={product.path}
                                  className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                  {product.name}
                                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                </Link>

                                {isRiskAssessmentOpen && (
                                  <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-xl py-2 ml-1 border">
                                    {product.subItems?.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        to={subItem.path}
                                        className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Link
                                to={product.path}
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                              >
                                {product.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center py-4 px-2 hover:bg-white/20 transition-colors"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in-up">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className="block py-3 px-2 hover:bg-white/20 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4">
                      {productLinks.map((product) => (
                        <div key={product.name}>
                          <Link
                            to={product.path}
                            className="block py-2 px-2 text-sm hover:bg-white/20 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {product.name}
                          </Link>
                          {product.hasSubMenu && (
                            <div className="pl-4">
                              {product.subItems?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className="block py-1 px-2 text-xs hover:bg-white/20 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
