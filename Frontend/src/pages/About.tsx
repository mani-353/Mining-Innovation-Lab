
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, User, Award, GraduationCap } from 'lucide-react';

const About = () => {
  const faqs = [
    {
      question: "What is the National Mining Accident Information System?",
      answer: "The National Mining Accident Information System (NMAIS) is a comprehensive database and analytics platform that collects, processes, and visualizes data related to mining accidents across India. It serves as a central repository of information to help improve mining safety standards through data-driven insights."
    },
    {
      question: "What data sources are used for this system?",
      answer: "The system primarily uses official accident reports from the Directorate General of Mines Safety (DGMS), supplemented with data from state mining departments, mining companies, and other relevant governmental agencies. Historical data from 2001-2013 is currently available in the system."
    },
    {
      question: "How can I use the Dashboard?",
      answer: "The Mining Accident Dashboard allows users to explore accident data through interactive visualizations. You can filter data by year, state, cause, and mine type to analyze trends and patterns. The dashboard provides insights into accident frequency, fatality rates, geographical distribution, and common causes."
    },
    {
      question: "How often is the data updated?",
      answer: "The historical data (2001-2013) is already in the system. New accident data is verified and added by administrators as official reports become available, typically within 1-2 weeks of an incident being fully documented."
    },
    {
      question: "Who maintains this system?",
      answer: "The National Mining Accident Information System is maintained by the Department of Mining Engineering at the National Institute of Technology Rourkela, in collaboration with the Directorate General of Mines Safety and the Ministry of Labour & Employment, Government of India."
    },
    {
      question: "How can I report data discrepancies or suggest improvements?",
      answer: "Please use the Contact Us section to report any data discrepancies or to suggest improvements to the system. Our team reviews all feedback and works to maintain the highest standards of data accuracy."
    }
  ];

  const teamMembers = [
    {
      name: "Prof. Dr. B.K. Pal",
      role: "Head of Department",
      department: "Mining Engineering",
      institution: "NIT Rourkela",
      icon: <Award className="h-6 w-6 text-blue-600" />,
      description: "Leading expert in mining safety and accident prevention with over 25 years of experience in the field."
    },
    {
      name: "Prof. Dr. H.B. Sahu",
      role: "Project Guide & Supervisor",
      department: "Mining Engineering", 
      institution: "NIT Rourkela",
      icon: <GraduationCap className="h-6 w-6 text-green-600" />,
      description: "Renowned researcher in mining technology and safety systems with extensive publications in international journals."
    },
    {
      name: "Development Team",
      role: "System Developer",
      department: "Mining Engineering",
      institution: "NIT Rourkela",
      icon: <User className="h-6 w-6 text-purple-600" />,
      description: "Dedicated to creating innovative solutions for mining safety data visualization and analysis."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-medium text-blue-600">About/Contact & FAQs</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* About Section */}
        <section>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">About the National Mining Accident Information System</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                The National Mining Accident Information System (NMAIS) is a comprehensive digital platform designed to monitor, analyze, and manage mining accident data across India. Developed by the Department of Mining Engineering at NIT Rourkela, this system serves as a vital tool for enhancing safety in India's mining sector.
              </p>
              <p className="text-gray-700 mb-4">
                Our platform collects and processes data from various sources, providing stakeholders with valuable insights into accident patterns, risk factors, and safety performance metrics. By leveraging advanced data visualization and analytics, NMAIS contributes to the development of evidence-based safety policies and practices.
              </p>
              <p className="text-gray-700 mb-4">
                The system is designed to support mining companies, regulatory bodies, researchers, and policymakers in their efforts to prevent accidents and improve overall safety standards in mining operations throughout India.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Key Features</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="min-w-[8px] h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Comprehensive database of mining accidents from 2001-2013</span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[8px] h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Interactive data visualization and analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[8px] h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Filtering capabilities by year, state, cause, and mine type</span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[8px] h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Trend analysis and pattern recognition for accident prevention</span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[8px] h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Access to safety guidelines and best practices</span>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[8px] h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Administrative tools for authorized personnel to manage data</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Objective, Vision, Mission */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Objective</h3>
              <p className="text-gray-700">
                To create a comprehensive digital repository of mining accident data that enables evidence-based safety improvements, policy formulation, and risk assessment in India's mining industry through advanced data analytics and visualization.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">Vision</h3>
              <p className="text-gray-700">
                To become the leading platform for mining safety data analysis in India, contributing to zero-accident mining operations through data-driven insights, predictive analytics, and collaborative safety initiatives.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Mission</h3>
              <p className="text-gray-700">
                To systematically collect, analyze, and disseminate mining accident information to stakeholders, facilitating informed decision-making, promoting safety awareness, and supporting the development of effective accident prevention strategies.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Meet the Team */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {member.icon}
                    <div className="ml-3">
                      <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{member.department}</p>
                  <p className="text-sm text-gray-600 mb-3 font-medium">{member.institution}</p>
                  <p className="text-gray-700 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* FAQs Section */}
        <section id="faqs">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-6">
                Have questions, feedback, or need assistance? Please reach out to us using the information below:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">
                      Department of Mining Engineering<br />
                      National Institute of Technology Rourkela<br />
                      Rourkela, Odisha - 769008<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+91-661-246-2000</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">mining@nitrkl.ac.in</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Office Hours</h3>
                <p className="text-gray-600">Monday to Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                <p className="text-gray-600">Closed on Sundays and Government Holidays</p>
              </div>
            </div>
            
            <div className="relative h-[300px] md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.652566655449!2d84.89872267605803!3d22.253478879888264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201f72bbd561c3%3A0xab5c70e76a7b5a!2sNational%20Institute%20of%20Technology%2C%20Rourkela!5e0!3m2!1sen!2sin!4v1716708451746!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full rounded-lg border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
        
        {/* Acknowledgments */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Acknowledgments</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              We extend our sincere gratitude to the following organizations for their support and collaboration in the development and maintenance of the National Mining Accident Information System:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">Directorate General of Mines Safety (DGMS)</h3>
                <p className="text-sm text-gray-600">For providing access to official accident data and technical guidance</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">Ministry of Labour & Employment</h3>
                <p className="text-sm text-gray-600">For their institutional support and policy guidance</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">Coal India Limited</h3>
                <p className="text-sm text-gray-600">For sharing industry insights and operational expertise</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">National Institute of Technology Rourkela</h3>
                <p className="text-sm text-gray-600">For academic leadership and research infrastructure</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">Department of Mining Engineering</h3>
                <p className="text-sm text-gray-600">For technical expertise and dedicated work in developing the system</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">State Mining Departments</h3>
                <p className="text-sm text-gray-600">For their cooperation in data collection and verification</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
