
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    rating: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We will review it shortly.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      category: '',
      rating: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              Feedback & Suggestions
            </h1>
            <p className="text-gray-600">
              Help us improve the National Mining Accident Information System by sharing your feedback
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="data">Data Quality</SelectItem>
                          <SelectItem value="ui">User Interface</SelectItem>
                          <SelectItem value="general">General Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <Select value={formData.rating} onValueChange={(value) => handleChange('rating', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate our system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                          <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                          <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                          <SelectItem value="2">⭐⭐ Fair</SelectItem>
                          <SelectItem value="1">⭐ Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Department of Mining Engineering</h4>
                    <p className="text-sm text-gray-600">National Institute of Technology Rourkela</p>
                    <p className="text-sm text-gray-600">Rourkela, Odisha - 769008</p>
                  </div>
                  <div>
                    <p className="text-sm"><strong>Phone:</strong> +91-661-246-2000</p>
                    <p className="text-sm"><strong>Email:</strong> mining@nitrkl.ac.in</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Be specific about the issue or suggestion</li>
                    <li>• Include steps to reproduce technical problems</li>
                    <li>• Provide constructive feedback for improvements</li>
                    <li>• All feedback is reviewed by our team</li>
                    <li>• Response time: 3-5 business days</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Feedback;
