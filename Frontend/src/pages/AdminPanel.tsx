
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lock, Plus, Search, CheckCircle, X, Eye, Edit, Trash } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('news');

  // Sample news data
  const [newsData, setNewsData] = useState([
    {
      id: 1,
      title: "Coal mine accident in Jharkhand leaves 3 workers injured",
      source: "Times of India",
      date: "2024-01-15",
      verified: false,
      summary: "Three workers were injured in a coal mine accident at Ranchi..."
    },
    {
      id: 2,
      title: "Safety audit reveals violations at iron ore mine in Odisha",
      source: "Economic Times",
      date: "2024-01-14",
      verified: true,
      summary: "A comprehensive safety audit conducted at an iron ore mine..."
    }
  ]);

  const [manualRecord, setManualRecord] = useState({
    date: '',
    location: '',
    mineType: '',
    cause: '',
    severity: '',
    fatalities: '',
    injuries: '',
    description: ''
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex items-center justify-center min-h-[70vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Lock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Admin Login Required</CardTitle>
              <CardDescription>Please authenticate to access the admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Enter username" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>
              <Button 
                onClick={() => setIsAuthenticated(true)} 
                className="w-full"
              >
                Login
              </Button>
              <p className="text-sm text-center text-gray-600">
                This would be protected by Supabase Auth in production
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-medium text-blue-600">Admin Panel</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage mining accident data and news verification</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-2"
          >
            <Lock className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('news')}
            className={`pb-2 px-1 border-b-2 font-medium ${
              activeTab === 'news' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            News Verification
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-2 px-1 border-b-2 font-medium ${
              activeTab === 'manual' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-2 px-1 border-b-2 font-medium ${
              activeTab === 'manage' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manage Records
          </button>
        </div>

        {/* News Verification Tab */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {/* Fetch News Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Fetch Recent Mining News</span>
                </CardTitle>
                <CardDescription>
                  Search for recent mining accident news from various sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input placeholder="Search keywords (e.g., mining accident, coal mine)" className="flex-1" />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Fetch News
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* News Results */}
            <div className="grid gap-4">
              {newsData.map((news) => (
                <Card key={news.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {news.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>{news.source}</span>
                          <span>{news.date}</span>
                          {news.verified ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Pending Verification
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-700">{news.summary}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {!news.verified && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verify
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Manual Entry Tab */}
        {activeTab === 'manual' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add New Accident Record</span>
              </CardTitle>
              <CardDescription>
                Manually enter mining accident data into the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date of Accident</Label>
                  <Input
                    id="date"
                    type="date"
                    value={manualRecord.date}
                    onChange={(e) => setManualRecord({...manualRecord, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Ranchi, Jharkhand"
                    value={manualRecord.location}
                    onChange={(e) => setManualRecord({...manualRecord, location: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="mineType">Mine Type</Label>
                  <Select value={manualRecord.mineType} onValueChange={(value) => setManualRecord({...manualRecord, mineType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coal">Coal Mine</SelectItem>
                      <SelectItem value="iron">Iron Ore Mine</SelectItem>
                      <SelectItem value="limestone">Limestone Mine</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cause">Primary Cause</Label>
                  <Select value={manualRecord.cause} onValueChange={(value) => setManualRecord({...manualRecord, cause: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cause" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gas">Gas Explosion</SelectItem>
                      <SelectItem value="roof">Roof Fall</SelectItem>
                      <SelectItem value="equipment">Equipment Failure</SelectItem>
                      <SelectItem value="human">Human Error</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select value={manualRecord.severity} onValueChange={(value) => setManualRecord({...manualRecord, severity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fatal">Fatal</SelectItem>
                      <SelectItem value="serious">Serious Injury</SelectItem>
                      <SelectItem value="minor">Minor Injury</SelectItem>
                      <SelectItem value="damage">Property Damage Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fatalities">Number of Fatalities</Label>
                  <Input
                    id="fatalities"
                    type="number"
                    min="0"
                    value={manualRecord.fatalities}
                    onChange={(e) => setManualRecord({...manualRecord, fatalities: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="injuries">Number of Injuries</Label>
                <Input
                  id="injuries"
                  type="number"
                  min="0"
                  value={manualRecord.injuries}
                  onChange={(e) => setManualRecord({...manualRecord, injuries: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the accident..."
                  value={manualRecord.description}
                  onChange={(e) => setManualRecord({...manualRecord, description: e.target.value})}
                  rows={4}
                />
              </div>

              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Manage Records Tab */}
        {activeTab === 'manage' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Records</CardTitle>
                <CardDescription>View, edit, or delete existing accident records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((record) => (
                    <div key={record} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Coal Mine Accident - Ranchi, Jharkhand</h4>
                        <p className="text-sm text-gray-600">Date: 2024-01-15 | Severity: Serious | Injuries: 3</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminPanel;
