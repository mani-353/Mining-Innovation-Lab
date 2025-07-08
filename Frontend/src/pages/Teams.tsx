
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Linkedin, GraduationCap, User } from 'lucide-react';

const Teams = () => {
  const currentMembers = [
    {
      name: "Prof. Charan Kumar Ala",
      role: "Principal Investigator & Lab Director",
      specialization: "Mining Safety, Risk Assessment, AI in Mining",
      institution: "NIT Rourkela",
      email: "charan@nitrkl.ac.in",
      photo: "/lovable-uploads/6760d4cf-509b-4b2d-a99c-22595970aa0e.png",
      type: "faculty"
    },
    {
      name: "Rajesh Kumar Singh",
      role: "PhD Scholar",
      specialization: "Machine Learning in Mining Safety",
      institution: "NIT Rourkela",
      email: "rajesh.singh@nitrkl.ac.in",
      photo: "/lovable-uploads/6760d4cf-509b-4b2d-a99c-22595970aa0e.png",
      type: "phd"
    },
    {
      name: "Priya Sharma",
      role: "M.Tech Student",
      specialization: "IoT Systems for Mining",
      institution: "NIT Rourkela",
      email: "priya.sharma@nitrkl.ac.in",
      photo: "/lovable-uploads/6760d4cf-509b-4b2d-a99c-22595970aa0e.png",
      type: "mtech"
    },
    {
      name: "Amit Patel",
      role: "Research Intern",
      specialization: "Data Analytics, Web Development",
      institution: "NIT Rourkela",
      email: "amit.patel@nitrkl.ac.in",
      photo: "/lovable-uploads/6760d4cf-509b-4b2d-a99c-22595970aa0e.png",
      type: "intern"
    }
  ];

  const pastMembers = [
    {
      name: "Dr. Sunil Kumar",
      role: "Former PhD Student (2018-2022)",
      contribution: "Developed AI-based accident prediction models",
      currentPosition: "Assistant Professor, IIT Kharagpur"
    },
    {
      name: "Neha Gupta",
      role: "Former M.Tech Student (2020-2022)",
      contribution: "IoT sensor network implementation",
      currentPosition: "Mining Engineer, Coal India Limited"
    },
    {
      name: "Rohit Verma",
      role: "Former Research Intern (2021)",
      contribution: "Web application development",
      currentPosition: "Software Engineer, Microsoft"
    }
  ];

  const getRoleColor = (type: string) => {
    switch(type) {
      case 'faculty': return 'bg-purple-100 text-purple-800';
      case 'phd': return 'bg-blue-100 text-blue-800';
      case 'mtech': return 'bg-green-100 text-green-800';
      case 'intern': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated researchers, students, and collaborators who drive innovation 
            in mining technology and safety at our lab.
          </p>
        </div>

        {/* Current Members */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Current Team Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentMembers.map((member, index) => (
              <Card key={index} className="team-card">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(member.type)}`}>
                    {member.role}
                  </span>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Specialization:</strong>
                    </p>
                    <p className="text-sm">{member.specialization}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Institution:</strong>
                    </p>
                    <p className="text-sm">{member.institution}</p>
                  </div>
                  
                  <div className="flex justify-center space-x-4 pt-4">
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a 
                      href="#"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Members */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Alumni & Past Contributors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastMembers.map((member, index) => (
              <Card key={index} className="publication-card">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                  </div>
                  <span className="text-sm text-gray-600">{member.role}</span>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Key Contribution:</strong>
                    </p>
                    <p className="text-sm">{member.contribution}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Current Position:</strong>
                    </p>
                    <p className="text-sm font-medium text-green-700">{member.currentPosition}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="mt-16 text-center">
          <Card className="lab-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Join Our Research Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We're always looking for passionate researchers and students interested in 
                mining technology innovation. Check out our current openings!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/openings"
                  className="lab-button text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  View Openings
                </a>
                <a 
                  href="/contact"
                  className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-all"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Teams;
