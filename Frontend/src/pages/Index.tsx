
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Lightbulb, BarChart, Calendar, Microscope } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const stats = [
    { label: 'Research Projects', value: '15+', icon: Microscope, color: 'text-blue-600' },
    { label: 'Publications', value: '25+', icon: BarChart, color: 'text-purple-600' },
    { label: 'Team Members', value: '12', icon: Users, color: 'text-green-600' },
    { label: 'Years of Research', value: '8+', icon: Calendar, color: 'text-orange-600' },
  ];

  const keyEvents = [
    {
      title: 'AI-Powered Mining Safety System Launch',
      date: '2024',
      description: 'Successfully deployed machine learning models for accident prediction and prevention.',
    },
    {
      title: 'IoT Monitoring System Implementation',
      date: '2023',
      description: 'Real-time air quality monitoring system installed in 5+ mining sites.',
    },
    {
      title: 'DGMS Collaboration Project',
      date: '2022',
      description: 'Partnership with Directorate General of Mines Safety for risk assessment tools.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Carousel Effect */}
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mining Innovation Lab
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Pioneering the future of mining technology through cutting-edge research, 
              innovative solutions, and collaborative excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="lab-button text-white border-white hover:bg-white hover:text-blue-700">
                <Link to="/products">
                  Explore Our Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Vision, Mission, Objectives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Foundation</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Driving innovation in mining technology through research excellence and practical solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="lab-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To be a leading research center in mining technology innovation, creating solutions 
                  that ensure safer, more efficient, and environmentally sustainable mining operations globally.
                </p>
              </CardContent>
            </Card>
            
            <Card className="lab-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To conduct cutting-edge research in mining engineering, develop innovative technological 
                  solutions, and foster collaboration between academia and industry for societal benefit.
                </p>
              </CardContent>
            </Card>
            
            <Card className="lab-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 text-left space-y-2">
                  <li>• Develop AI-powered mining safety systems</li>
                  <li>• Create IoT-based monitoring solutions</li>
                  <li>• Advance sustainable mining practices</li>
                  <li>• Foster industry-academia collaboration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="lab-card text-center">
                <CardHeader className="pb-3">
                  <stat.icon className={`w-12 h-12 mx-auto ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</CardTitle>
                  <CardDescription className="text-gray-600">{stat.label}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Events Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Milestones</h2>
          <div className="max-w-4xl mx-auto">
            {keyEvents.map((event, index) => (
              <div key={index} className="flex items-start mb-8 animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="flex-shrink-0 w-24 text-right pr-4">
                  <span className="text-lg font-bold text-blue-600">{event.date}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 relative">
                  <div className="absolute top-4 left-1/2 w-0.5 h-16 bg-blue-200 transform -translate-x-1/2"></div>
                </div>
                <div className="flex-grow pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Research Journey</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Explore opportunities to collaborate with us, access our tools, or become part of our innovative research team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link to="/openings">View Openings</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
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
