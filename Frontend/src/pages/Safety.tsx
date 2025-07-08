
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, AlertTriangle, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Safety = () => {
  const safetyGuidelines = [
    {
      title: "Pre-shift Safety Inspection",
      description: "Comprehensive checklist for safety inspection before each shift",
      category: "Daily Operations",
      priority: "High",
      lastUpdated: "2024-01-15"
    },
    {
      title: "Gas Detection Protocols",
      description: "Procedures for detecting and handling hazardous gases in mines",
      category: "Gas Safety",
      priority: "Critical",
      lastUpdated: "2024-01-10"
    },
    {
      title: "Emergency Evacuation Procedures",
      description: "Step-by-step evacuation procedures for different emergency scenarios",
      category: "Emergency Response",
      priority: "Critical",
      lastUpdated: "2024-01-12"
    },
    {
      title: "Equipment Maintenance Standards",
      description: "Maintenance schedules and safety standards for mining equipment",
      category: "Equipment Safety",
      priority: "Medium",
      lastUpdated: "2024-01-08"
    }
  ];

  const regulations = [
    {
      title: "Mines Act, 1952",
      description: "Primary legislation governing mine safety in India",
      type: "Act",
      authority: "Ministry of Labour & Employment"
    },
    {
      title: "Metalliferous Mines Regulations, 1961",
      description: "Specific regulations for metalliferous mines",
      type: "Regulation",
      authority: "DGMS"
    },
    {
      title: "Coal Mines Regulations, 2017",
      description: "Updated regulations for coal mining operations",
      type: "Regulation",
      authority: "DGMS"
    },
    {
      title: "Mines Rescue Rules, 1985",
      description: "Rules governing mine rescue operations and equipment",
      type: "Rules",
      authority: "DGMS"
    }
  ];

  const bestPractices = [
    "Conduct regular safety training for all mining personnel",
    "Implement continuous air quality monitoring systems",
    "Maintain up-to-date emergency response plans",
    "Ensure proper personal protective equipment (PPE) usage",
    "Regular inspection and maintenance of safety equipment",
    "Establish clear communication protocols during operations",
    "Implement lockout/tagout procedures for equipment maintenance",
    "Conduct regular safety audits and risk assessments"
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-medium text-blue-600">Safety Measures & Policies</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Safety Measures & Policies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive safety guidelines, regulations, and best practices for mining operations in India
          </p>
        </div>

        {/* Safety Alert */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Safety Alert</h3>
              <p className="text-red-700 mt-2">
                All mining operations must comply with the latest DGMS regulations. Regular safety audits are mandatory 
                for all mining sites. Report any safety violations immediately to the local DGMS office.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Guidelines Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-600" />
              Safety Guidelines
            </h2>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download All Guidelines</span>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {safetyGuidelines.map((guideline, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{guideline.title}</CardTitle>
                      <CardDescription>{guideline.description}</CardDescription>
                    </div>
                    <Badge className={getPriorityColor(guideline.priority)}>
                      {guideline.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <p><strong>Category:</strong> {guideline.category}</p>
                      <p><strong>Last Updated:</strong> {guideline.lastUpdated}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Regulations Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-green-600" />
            Mining Regulations & Acts
          </h2>

          <div className="grid gap-4">
            {regulations.map((regulation, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{regulation.title}</h3>
                      <p className="text-gray-600 mb-3">{regulation.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">{regulation.type}</Badge>
                        <span><strong>Authority:</strong> {regulation.authority}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Official Source
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            Best Practices
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>Essential Safety Best Practices</CardTitle>
              <CardDescription>
                Industry-standard practices recommended by DGMS and international mining safety organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {bestPractices.map((practice, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{practice}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Contacts Section */}
        <section className="mb-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">DGMS Emergency Hotline</h4>
                  <p className="text-blue-700">1800-XXX-XXXX</p>
                  <p className="text-sm text-blue-600">24/7 Emergency Response</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Mine Rescue Services</h4>
                  <p className="text-blue-700">1800-XXX-XXXX</p>
                  <p className="text-sm text-blue-600">Immediate Rescue Operations</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Medical Emergency</h4>
                  <p className="text-blue-700">108 / 102</p>
                  <p className="text-sm text-blue-600">Ambulance & Medical Aid</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Safety;
