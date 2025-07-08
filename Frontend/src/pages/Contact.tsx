
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with our research team for collaborations, inquiries, or to learn more 
            about our innovative mining technology solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Mining Innovation Lab</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">
                      Department of Mining Engineering<br />
                      National Institute of Technology Rourkela<br />
                      Rourkela, Odisha - 769008, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+91-661-246-2000</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">charan@nitrkl.ac.in</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lab Director */}
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Lab Director</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src="/lovable-uploads/6760d4cf-509b-4b2d-a99c-22595970aa0e.png" 
                      alt="Prof. Charan Kumar Ala"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Prof. Charan Kumar Ala</h3>
                    <p className="text-gray-600">Principal Investigator</p>
                    <p className="text-sm text-blue-600">charan@nitrkl.ac.in</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Research Areas */}
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Research Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We welcome collaborations in the following areas:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Mining Safety & Risk Assessment</li>
                  <li>• IoT & Sensor Technologies</li>
                  <li>• AI/ML in Mining Applications</li>
                  <li>• Environmental Monitoring</li>
                  <li>• Data Analytics & Visualization</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input placeholder="Your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <Input placeholder="Your organization/institution" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input placeholder="Subject of your inquiry" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Please describe your inquiry, collaboration proposal, or any questions you have..."
                      rows={6}
                    />
                  </div>
                  
                  <Button className="w-full lab-button text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card className="lab-card mt-8">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>NIT Rourkela Campus Map</p>
                    <p className="text-sm">Interactive map coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <section className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Visit Our Lab</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Students & Researchers</h3>
              <p className="text-gray-600 text-sm">
                Schedule a visit to explore our research facilities and discuss collaboration opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Industry Partners</h3>
              <p className="text-gray-600 text-sm">
                Learn about our industry-focused projects and potential partnership opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">Media & Press</h3>
              <p className="text-gray-600 text-sm">
                For media inquiries and press releases, please contact our public relations team.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
