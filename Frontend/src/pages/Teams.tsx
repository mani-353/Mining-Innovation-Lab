import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Linkedin, GraduationCap, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { db } from '@/integrations/firebase/client';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  institution: string;
  email: string;
  photo: string;
  type: 'faculty' | 'phd' | 'mtech' | 'intern';
  is_current: boolean;
  current_position?: string;
  contribution?: string;
  created_at?: any;
}

const Teams = () => {
  const [currentMembers, setCurrentMembers] = useState([]);
  const [pastMembers, setPastMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);

      // Fetch current members
      const currentQuery = query(
        collection(db, 'team_members'),
        where('is_current', '==', true),
        orderBy('created_at', 'desc')
      );
      const currentSnapshot = await getDocs(currentQuery);
      const currentData = currentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch past members
      const pastQuery = query(
        collection(db, 'team_members'),
        where('is_current', '==', false),
        orderBy('created_at', 'desc')
      );
      const pastSnapshot = await getDocs(pastQuery);
      const pastData = pastSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCurrentMembers(currentData);
      setPastMembers(pastData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const getRoleColor = (type: string) => {
    switch (type) {
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
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading team members...</p>
          </div>
        ) : (
          <>
            {/* Current Members */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Current Team Members</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentMembers.map((member, index) => (
                  <Card key={member.id || index} className="team-card">
                    <CardHeader className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={member.photo || '/charan_kumar_ala.jpg'}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (img.src !== window.location.origin + '/charan_kumar_ala.jpg') {
                              img.src = '/charan_kumar_ala.jpg';
                            }
                          }}
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
                  <Card key={member.id || index} className="publication-card">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        {member.photo && (
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-3">
                            <img
                              src={member.photo || '/charan_kumar_ala.jpg'}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const img = e.currentTarget;
                                if (img.src !== window.location.origin + '/charan_kumar_ala.jpg') {
                                  img.src = '/charan_kumar_ala.jpg';
                                }
                              }}
                            />

                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <span className="text-sm text-gray-600">{member.role}</span>
                        </div>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(member.type)}`}>
                        {member.type}
                      </span>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Specialization:</strong>
                        </p>
                        <p className="text-sm">{member.specialization}</p>
                      </div>

                      {member.contribution && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Key Contribution:</strong>
                          </p>
                          <p className="text-sm">{member.contribution}</p>
                        </div>
                      )}

                      {member.current_position && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Current Position:</strong>
                          </p>
                          <p className="text-sm font-medium text-green-700">{member.current_position}</p>
                        </div>
                      )}

                      <div className="flex justify-center space-x-4 pt-4">
                        <a
                          href={`mailto:${member.email}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Email"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
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
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Teams;
