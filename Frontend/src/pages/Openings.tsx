
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Clock, MapPin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/integrations/firebase/client';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

interface JobOpening {
  id: string;
  title: string;
  category: string;
  duration: string;
  stipend: string;
  requirements: string[];
  description: string;
  deadline: string;
  type: 'phd' | 'mtech' | 'intern' | 'project';
  is_active: boolean;
  apply_url?: string;  // Add this line
}

const Openings = () => {
  const [currentOpenings, setCurrentOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpenings();
  }, []);

  const fetchOpenings = async () => {
    try {
      const q = query(
        collection(db, 'job_openings'),
        where('is_active', '==', true),
        orderBy('created_at', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const openingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCurrentOpenings(openingsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching openings:', error);
      setLoading(false);
    }
  };

  const getCategoryColor = (type) => {
    switch (type) {
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
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading openings...</p>
          </div>
        ) : currentOpenings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No openings available at the moment.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* existing grid content */}

            {/* Current Openings */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Current Openings</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {currentOpenings.map((opening) => (
                  <Card key={opening.id} className="lab-card">
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
                          {opening.requirements && opening.requirements.map((req, idx) => (
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
                        <Button
                          className="lab-button text-white"
                          onClick={() => window.open(opening.apply_url || '#', '_blank')}
                          disabled={!opening.apply_url}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

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
      </div>

      <Footer />
    </div>
  );
};

export default Openings;
