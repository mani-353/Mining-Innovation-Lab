import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Lightbulb, BarChart, Calendar, Microscope, Building, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/drone.gif',
      title: 'Advanced Mining Research',
    },
    {
      image: '/drone2.gif',
      title: 'Drone Technology in Mining',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with GIF Carousel */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="mb-8">
                <img
                  src="/charan_kumar_ala.jpg"
                  alt="Prof.Charan Kumar Ala"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
                Dr. Charan Kumar Ala
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Assistant Professor at National Institute of Technology (NIT) Rourkela
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/products">
                    Explore Research Tools
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white text-blue-700 hover:bg-gray-100">
                  <Link to="/publications">Publications</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>


      {/* About Institute & Department */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* About Institute */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="/NIT1.webp"
                  alt="NIT Rourkela Campus"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">About NIT Rourkela</h3>
                </div>

                <div className="space-y-4 text-slate-600">
                  <p className="leading-relaxed">
                    NIT, Rourkela is one of the premier national level institutions of repute for technical education in the country and is funded by the Government of India. It is passionately committed to making our country a world leader in technology and science and to inculcate this commitment among all its students.
                  </p>
                  <p className="leading-relaxed">
                    It is a residential campus offering accommodation to faculty, staff and students. The campus has all the amenities for developing personal, social and academic skills of the student community.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="font-bold text-blue-600">601-800</div>
                      <div className="text-xs text-slate-600">World Ranking (Engineering)</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="font-bold text-orange-600">19th</div>
                      <div className="text-xs text-slate-600">NIRF Ranking 2024</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Department */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="/MN.jpg"
                  alt="Mining Department"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Department of Mining Engineering</h3>
                </div>

                <div className="space-y-4 text-slate-600">
                  <p className="leading-relaxed">
                    Established in 1979, the Department of Mining Engineering has grown over the years as one of the pioneer mining education centres in the country. It has played a pivotal role in introducing the modern mining engineering curriculum in India.
                  </p>
                  <p className="leading-relaxed">
                    The Department offers undergraduate, postgraduate and doctoral programs in Mining Engineering. The Department is actively involved in research activities in the areas of mine safety and reliability, spontaneous heating of coal and mine fire, underground and surface environment, coalbed methane, mine closure planning and computer applications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Research Journey</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Explore opportunities to collaborate with us, access our tools, or become part of our innovative research team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link to="/openings">View Research Opportunities</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;