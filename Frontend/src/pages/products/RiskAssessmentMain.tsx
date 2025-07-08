
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, Target, BarChart3, Info, ArrowRight } from 'lucide-react';

const RiskAssessmentMain = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            DGMS Risk Assessment Methods
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Choose your preferred risk assessment methodology for underground coal mine safety analysis.
            Both methods comply with DGMS guidelines and Coal Mines Regulations 2017.
          </p>
        </div>

        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Assessment Methods:</strong> Select between traditional DGMS Risk Score methodology 
            or advanced TRAM (Fuzzy Logic with AHP) for comprehensive multi-criteria decision making.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* DGMS Method Card */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">DGMS Risk Score Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                Traditional DGMS methodology using the formula: 
                <strong className="block mt-2 text-blue-700">Risk = Consequence × Exposure × Probability</strong>
              </p>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span>172+ predefined mining hazards across 8 categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span>Precise numerical scales (0.0001 to 10)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-green-600" />
                  <span>DGMS Circular 13/2002 compliant</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Hazard search and custom addition</li>
                  <li>• Parameter dropdowns with descriptions</li>
                  <li>• Results grouped by categories</li>
                  <li>• PDF export functionality</li>
                </ul>
              </div>

              <Link to="/products/risk-assessment/dgms">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Use DGMS Method
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* TRAM Method Card */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">TRAM with Fuzzy Logic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                Advanced methodology integrating fuzzy logic, linguistic variables, 
                and AHP for comprehensive multi-criteria analysis.
              </p>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span>Linguistic variable processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span>Triangular fuzzy numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-purple-600" />
                  <span>AHP pairwise comparisons</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Advanced Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Membership function visualization</li>
                  <li>• VIKOR ranking methodology</li>
                  <li>• Consistency ratio calculations</li>
                  <li>• Weight distribution analysis</li>
                </ul>
              </div>

              <Link to="/products/risk-assessment/tram">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Use TRAM Method
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Compliance & Standards</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
                <div>
                  <h4 className="font-semibold mb-2">DGMS Guidelines:</h4>
                  <ul className="space-y-1">
                    <li>• DGMS Circular 13 of 2002</li>
                    <li>• Coal Mines Regulations 2017</li>
                    <li>• Safety compliance standards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Research Based:</h4>
                  <ul className="space-y-1">
                    <li>• Peer-reviewed methodologies</li>
                    <li>• Industry best practices</li>
                    <li>• Academic research integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RiskAssessmentMain;
