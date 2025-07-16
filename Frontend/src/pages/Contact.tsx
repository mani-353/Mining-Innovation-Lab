import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = `Mining Innovation Lab Feedback`;
      const body = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Organization: ${formData.organization}
Subject: ${formData.subject}

Message:
${formData.message}
      `;

      const mailtoLink = `mailto:mininginnovationlab@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
      });

      alert('Email client opened! Please send the email to complete your feedback submission.');
    } catch (error) {
      console.error('Error:', error);
      alert('Error opening email client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    <p className="text-gray-600">+91-661-246-2019</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">alacharan@nitrkl.ac.in</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lab In Charge */}
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Lab In Charge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src='/charan_kumar_ala.jpg'
                      alt="Prof. Charan Kumar Ala"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Prof. Charan Kumar Ala</h3>
                    <p className="text-gray-600">Principal Investigator</p>
                    <p className="text-sm text-blue-600">alacharan@nitrkl.ac.in</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.8!2d84.90127!3d22.25204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201d4b40a8f2b7%3A0x4c8f9b8e9c4e8d0a!2sMining%20Department%2C%20NIT%20Rourkela!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mining Department - NIT Rourkela Location"
                    className="hover:saturate-0 transition-all duration-300"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Form */}
          <div>
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Send us Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <Input
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="Your organization/institution"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject of your feedback"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please share your feedback, suggestions, or any questions you have..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full lab-button text-white"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Feedback'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Contact;