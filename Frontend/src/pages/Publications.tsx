
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Users, ExternalLink } from 'lucide-react';

const Publications = () => {
  const publications = [
    {
      title: "AI-Based Accident Prediction Models for Mining Safety Enhancement",
      authors: ["Charan Kumar Ala", "Rajesh Kumar Singh", "Priya Sharma"],
      journal: "International Journal of Mining Science and Technology",
      year: "2024",
      type: "Journal Article",
      abstract: "This paper presents a comprehensive study on the application of artificial intelligence in predicting mining accidents using historical data analysis and machine learning algorithms.",
      doi: "10.1016/j.ijmst.2024.01.001",
      status: "Published"
    },
    {
      title: "IoT-Based Real-Time Air Quality Monitoring in Underground Mines",
      authors: ["Charan Kumar Ala", "Amit Patel", "Neha Gupta"],
      journal: "Mining Technology",
      year: "2023",
      type: "Journal Article",
      abstract: "Implementation of Internet of Things (IoT) sensors for continuous monitoring of air quality parameters in underground mining environments.",
      doi: "10.1080/25726668.2023.001",
      status: "Published"
    },
    {
      title: "Risk Assessment Framework for DGMS Compliance in Indian Mining",
      authors: ["Charan Kumar Ala", "Sunil Kumar"],
      journal: "Journal of Mining and Environment",
      year: "2023",
      type: "Journal Article",
      abstract: "Development of a comprehensive risk assessment framework aligned with Directorate General of Mines Safety regulations for Indian mining operations.",
      doi: "10.22044/jme.2023.001",
      status: "Published"
    },
    {
      title: "Machine Learning Approaches for Landslide Detection in Opencast Mining",
      authors: ["Rajesh Kumar Singh", "Charan Kumar Ala"],
      journal: "Geotechnical and Geological Engineering",
      year: "2024",
      type: "Conference Paper",
      abstract: "Novel machine learning techniques for early detection and prediction of landslides in opencast mining operations using geological and environmental data.",
      doi: "10.1007/s10706-024-001",
      status: "Under Review"
    },
    {
      title: "Data Analytics in Mining Safety: A Comprehensive Review",
      authors: ["Charan Kumar Ala", "Multiple Contributors"],
      journal: "Safety Science",
      year: "2022",
      type: "Review Article",
      abstract: "A systematic review of data analytics applications in mining safety, covering accident analysis, risk assessment, and predictive modeling techniques.",
      doi: "10.1016/j.ssci.2022.001",
      status: "Published"
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'In Press': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Journal Article': return 'bg-blue-100 text-blue-800';
      case 'Conference Paper': return 'bg-purple-100 text-purple-800';
      case 'Review Article': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Publications</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our research contributions to the field of mining technology, safety, and innovation. 
            Our publications showcase cutting-edge research and practical solutions for the mining industry.
          </p>
        </div>

        {/* Statistics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">25+</div>
              <div className="text-sm text-gray-600">Total Publications</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">2024</div>
              <div className="text-sm text-gray-600">Latest Publication</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">15+</div>
              <div className="text-sm text-gray-600">Co-authors</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <ExternalLink className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">500+</div>
              <div className="text-sm text-gray-600">Citations</div>
            </CardContent>
          </Card>
        </section>

        {/* Publications List */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Recent Publications</h2>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <Card key={index} className="publication-card">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(pub.type)}`}>
                        {pub.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pub.status)}`}>
                        {pub.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{pub.year}</span>
                  </div>
                  <CardTitle className="text-xl text-blue-800 hover:text-blue-600 transition-colors">
                    {pub.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Authors:</strong> {pub.authors.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Journal:</strong> {pub.journal}
                    </p>
                    {pub.doi && (
                      <p className="text-sm text-gray-600">
                        <strong>DOI:</strong> 
                        <a 
                          href={`https://doi.org/${pub.doi}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 ml-1"
                        >
                          {pub.doi}
                        </a>
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Abstract:</strong>
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {pub.abstract}
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <a 
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      View Publication
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Areas */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Research Areas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Mining Safety & Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Research focused on accident prediction, safety protocols, and risk mitigation strategies in mining operations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">IoT & Sensor Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Development of IoT-based monitoring systems for environmental and safety parameter tracking.
                </p>
              </CardContent>
            </Card>
            
            <Card className="lab-card">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">AI & Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Application of artificial intelligence and machine learning in mining data analysis and prediction.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Publications;
