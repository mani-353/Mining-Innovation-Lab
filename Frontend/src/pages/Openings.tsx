
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Clock, MapPin, Mail } from 'lucide-react';

const Openings = () => {
  const currentOpenings = [
    {
      title: "PhD Research Scholar",
      category: "PhD Program",
      duration: "3-5 years",
      stipend: "₹31,000/month + HRA",
      requirements: [
        "M.Tech in Mining Engineering or related field",
        "GATE/NET qualification",
        "Interest in AI/ML applications in mining",
        "Strong analytical and programming skills"
      ],
      description: "Work on cutting-edge research in mining safety and AI-based prediction models.",
      deadline: "Rolling admissions",
      type: "phd"
    },
    {
      title: "M.Tech Research Assistant",
      category: "M.Tech Program",
      duration: "2 years",
      stipend: "₹12,400/month",
      requirements: [
        "B.Tech in Mining/Civil/Mechanical Engineering",
        "GATE qualification preferred",
        "Basic programming knowledge",
        "Interest in IoT and sensor technologies"
      ],
      description: "Assist in IoT-based monitoring system development and deployment.",
      deadline: "March 31, 2024",
      type: "mtech"
    },
    {
      title: "Summer Research Intern",
      category: "Internship",
      duration: "2-3 months",
      stipend: "₹8,000/month",
      requirements: [
        "B.Tech 3rd/4th year students",
        "Engineering background (any discipline)",
        "Programming skills (Python/JavaScript)",
        "Enthusiasm for research and innovation"
      ],
      description: "Work on web development and data analysis projects for mining applications.",
      deadline: "April 15, 2024",
      type: "intern"
    },
    {
      title: "Project Assistant",
      category: "Project Position",
      duration: "1 year (extendable)",
      stipend: "₹25,000/month",
      requirements: [
        "M.Tech/ME in relevant field",
        "2+ years of experience",
        "Strong technical writing skills",
        "Experience with research publications"
      ],
      description: "Support ongoing research projects and publication activities.",
      deadline: "February 28, 2024",
      type: "project"
    }
  ];

  const getCategoryColor = (type: string) => {
    switch(type) {
      case 'phd': return 'bg-purple-100 text-purple-800';
      case 'mtech': return 'bg-blue-100 text-blue-800';
      case 'intern': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Career Opportunities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our dynamic research team and contribute to groundbreaking innovations in mining technology. 
            We offer exciting opportunities for students and researchers at various levels.
          </p>
        </div>

        {/* Current Openings */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Current Openings</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {currentOpenings.map((opening, index) => (
              <Card key={index} className="lab-card">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-xl text-blue-800">{opening.title}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(opening.type)}`}>
                      {opening.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{opening.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{opening.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{opening.stipend}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {opening.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm text-gray-500">
                      <strong>Deadline:</strong> {opening.deadline}
                    </span>
                    <Button className="lab-button text-white">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit Application</h3>
              <p className="text-gray-600 text-sm">
                Send your resume, cover letter, and required documents to our email.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Initial Review</h3>
              <p className="text-gray-600 text-sm">
                Our team will review your application and shortlist candidates.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Interview & Selection</h3>
              <p className="text-gray-600 text-sm">
                Selected candidates will be invited for an interview and final selection.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Join Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Research Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Access to cutting-edge research facilities</li>
                <li>• Collaboration with industry partners</li>
                <li>• Publication opportunities</li>
                <li>• Conference participation support</li>
                <li>• Mentorship from experienced faculty</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Career Development</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Skill development workshops</li>
                <li>• Industry exposure and networking</li>
                <li>• Technical training programs</li>
                <li>• Career guidance and placement support</li>
                <li>• Alumni network access</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="text-center bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ready to Apply?</h2>
          <p className="text-gray-600 mb-6">
            For more information about any of these positions or to submit your application, please contact us.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-2" />
              <span>charan@nitrkl.ac.in</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Mining Innovation Lab, NIT Rourkela</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="lab-button text-white mr-4">
              Send Application
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">
              Contact Us
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Openings;
