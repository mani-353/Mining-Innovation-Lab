
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle, Book, Download, Video } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const helpSections = [
    {
      title: "Getting Started",
      icon: Book,
      items: [
        {
          question: "How to use the Mining Accident Dashboard?",
          answer: "Navigate to the Dashboard page, select your filters (mine type, years, states, causes), and click 'Fetch Data' to load the information. The dashboard will display various charts and statistics based on your selections."
        },
        {
          question: "What data is available in the system?",
          answer: "The system contains mining accident data from 2001 to 2013, covering both coal and non-coal mining operations across India. Data includes accident details, fatalities, injuries, causes, and mine information."
        },
        {
          question: "How to filter data effectively?",
          answer: "Use the multi-select filters to narrow down your search. You can select multiple years, states, and causes simultaneously. Always select a mine type first, then apply additional filters as needed."
        }
      ]
    },
    {
      title: "Data and Statistics",
      icon: HelpCircle,
      items: [
        {
          question: "What types of mining accidents are covered?",
          answer: "The database includes various accident types such as falls of roof/sides, machinery accidents, explosions, electrical accidents, transportation incidents, and many more specific categories."
        },
        {
          question: "How accurate is the data?",
          answer: "The data is sourced from official records and government databases. However, users should note that this is historical data from 2001-2013 and should be used for analytical and research purposes."
        },
        {
          question: "Can I download the data?",
          answer: "Currently, the system provides visualization and analysis tools. For data download requests, please contact the mining department through the contact page."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: Download,
      items: [
        {
          question: "The dashboard is not loading data",
          answer: "Ensure you have selected at least the mine type, then click 'Fetch Data'. Check your internet connection and try refreshing the page. If issues persist, contact technical support."
        },
        {
          question: "Browser compatibility issues",
          answer: "The system works best with modern browsers like Chrome, Firefox, Safari, and Edge. Ensure JavaScript is enabled and your browser is up to date."
        },
        {
          question: "How to reset filters?",
          answer: "Use the 'Reset Filters' button to clear all selections and start fresh. This will remove all applied filters and return to the initial state."
        }
      ]
    }
  ];

  const filteredSections = helpSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              Help & Support
            </h1>
            <p className="text-gray-600">
              Find answers to common questions and get help using the Mining Accident Information System
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Book className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <CardTitle>User Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Complete guide on how to use all features of the system
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Video className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Watch step-by-step video tutorials for common tasks
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Download className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <CardTitle>Download Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Download user manuals and technical documentation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-6">
            {filteredSections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className="w-5 h-5 text-blue-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {section.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${sectionIndex}-${itemIndex}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSections.length === 0 && searchTerm && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No help topics found matching "{searchTerm}"</p>
                <p className="text-sm text-gray-400 mt-2">Try different keywords or browse all topics</p>
              </CardContent>
            </Card>
          )}

          {/* Contact Support */}
          <Card className="mt-8 bg-blue-50">
            <CardContent className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Contact our support team
              </p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Email:</strong> support.nmais@nitrkl.ac.in</p>
                <p className="text-sm"><strong>Phone:</strong> +91-661-246-2000</p>
                <p className="text-sm"><strong>Hours:</strong> Monday to Friday, 9 AM - 5 PM IST</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Help;
