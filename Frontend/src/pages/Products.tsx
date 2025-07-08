
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Shield, Wifi, Mountain, ArrowRight } from 'lucide-react';

const Products = () => {
  const products = [
    {
      title: "Mining Accident Analysis",
      description: "Comprehensive database and analytics platform for mining accident data from 2001-2013. Provides interactive visualizations and trend analysis.",
      icon: BarChart3,
      path: "/products/mining-accident-analysis",
      status: "Active",
      features: ["Interactive Dashboard", "Data Filtering", "Trend Analysis", "Export Capabilities"]
    },
    {
      title: "DGMS Risk Assessment Tool",
      description: "Advanced risk assessment system designed in collaboration with Directorate General of Mines Safety for predictive safety analysis.",
      icon: Shield,
      path: "/products/risk-assessment",
      status: "In Development",
      features: ["Risk Prediction", "Safety Metrics", "Compliance Tracking", "Automated Reports"]
    },
    {
      title: "IoT Air Monitoring System",
      description: "Real-time air quality monitoring solution using IoT sensors for continuous environmental surveillance in mining operations.",
      icon: Wifi,
      path: "/products/air-monitoring",
      status: "Deployed",
      features: ["Real-time Monitoring", "Alert Systems", "Data Logging", "Remote Access"]
    },
    {
      title: "Landslide Detection System",
      description: "AI-powered landslide detection and early warning system specifically designed for opencast mining operations.",
      icon: Mountain,
      path: "/products/landslide-detection",
      status: "Research Phase",
      features: ["AI Detection", "Early Warning", "Geological Analysis", "Prevention Strategies"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Deployed': return 'bg-blue-100 text-blue-800';
      case 'In Development': return 'bg-yellow-100 text-yellow-800';
      case 'Research Phase': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Products & Tools</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Innovative solutions and cutting-edge tools developed by our research team to advance 
            mining safety, efficiency, and environmental sustainability.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {products.map((product, index) => (
            <Card key={index} className="lab-card group">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {product.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{product.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Button asChild className="lab-button text-white group-hover:shadow-lg transition-all">
                    <Link to={product.path}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Research & Development Section */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Research & Development</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Current Projects</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <span>Machine Learning models for accident prediction</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <span>Blockchain-based safety compliance tracking</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <span>Augmented Reality for mining equipment training</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <span>Drone-based mine site surveying</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Collaboration Opportunities</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                  <span>Industry partnership for tool deployment</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                  <span>Academic research collaboration</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                  <span>Government agency data integration</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></div>
                  <span>International research exchange programs</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Interested in collaborating or learning more about our research?
            </p>
            <Button asChild className="lab-button text-white">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
