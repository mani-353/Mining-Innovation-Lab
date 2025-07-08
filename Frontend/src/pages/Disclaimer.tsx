
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, AlertTriangle, Database, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Info className="w-8 h-8 text-blue-600" />
              Disclaimer
            </h1>
            <p className="text-gray-600">
              Important information about the use of this system and its data
            </p>
          </div>

          {/* Main Disclaimer */}
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important Notice:</strong> This database contains historical mining accident data from 2001 to 2013. 
              The information is provided for research, analytical, and educational purposes only.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            {/* Data Period */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Data Coverage Period
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Time Period:</strong> January 2001 to December 2013</li>
                  <li>• <strong>Coverage:</strong> Coal and Non-Coal mining operations across India</li>
                  <li>• <strong>Data Source:</strong> Official records from Directorate General of Mines Safety (DGMS)</li>
                  <li>• <strong>Last Updated:</strong> Data reflects historical records up to 2013</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  Data Usage and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Permitted Uses:</h4>
                    <ul className="space-y-1 text-gray-700 ml-4">
                      <li>• Academic research and analysis</li>
                      <li>• Educational purposes and training</li>
                      <li>• Policy development and safety planning</li>
                      <li>• Statistical analysis and trend identification</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Limitations:</h4>
                    <ul className="space-y-1 text-gray-700 ml-4">
                      <li>• Data is historical and may not reflect current conditions</li>
                      <li>• Information accuracy depends on original reporting</li>
                      <li>• Not suitable for real-time decision making</li>
                      <li>• Should not be used as the sole basis for safety decisions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accuracy and Reliability */}
            <Card>
              <CardHeader>
                <CardTitle>Data Accuracy and Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p>
                    While every effort has been made to ensure the accuracy and completeness of the data, 
                    the National Mining Accident Information System (NMAIS) and its developers do not 
                    warrant the accuracy, completeness, or reliability of the information contained herein.
                  </p>
                  <p>
                    Users are advised to:
                  </p>
                  <ul>
                    <li>Cross-reference data with original sources when possible</li>
                    <li>Consider the historical context of the data (2001-2013)</li>
                    <li>Use the data as part of comprehensive analysis, not in isolation</li>
                    <li>Consult current safety guidelines and regulations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Liability */}
            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p>
                    The developers, NIT Rourkela, and associated organizations shall not be liable for any:
                  </p>
                  <ul>
                    <li>Direct, indirect, incidental, or consequential damages</li>
                    <li>Loss of data, profits, or business interruption</li>
                    <li>Decisions made based solely on this data</li>
                    <li>Inaccuracies or omissions in the historical data</li>
                  </ul>
                  <p>
                    Users assume full responsibility for the appropriate use of this information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p>
                    The system contains aggregated statistical data only. Personal information 
                    of individuals involved in accidents has been removed or anonymized to protect privacy.
                  </p>
                  <p>
                    For detailed information about our privacy practices, please refer to our 
                    <a href="/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle>Questions or Concerns?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have questions about this disclaimer or the data provided, please contact:
                </p>
                <div className="space-y-2">
                  <p><strong>Department of Mining Engineering</strong></p>
                  <p>National Institute of Technology Rourkela</p>
                  <p>Rourkela, Odisha - 769008, India</p>
                  <p><strong>Email:</strong> mining@nitrkl.ac.in</p>
                  <p><strong>Phone:</strong> +91-661-246-2000</p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-gray-500 pt-4">
              <p>Last updated: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;
