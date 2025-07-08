
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { 
  BarChart3, 
  AlertTriangle, 
  Calculator, 
  FileText, 
  Plus, 
  Download, 
  Search,
  Target,
  ArrowLeft,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Simplified hazard groups for TRAM method
const TRAM_HAZARD_GROUPS = {
  'Ground Movement': ['Roof fall', 'Pillar failure', 'Side wall collapse'],
  'Equipment Failure': ['Conveyor malfunction', 'Haulage system failure', 'LHD breakdown'],
  'Environmental': ['Gas emission', 'Water inrush', 'Fire hazard'],
  'Human Factors': ['Operator error', 'Safety protocol violation', 'Training inadequacy']
};

// TRAM linguistic variables
const LINGUISTIC_SCALES = {
  consequence: [
    { label: 'Very Low', value: 1, fuzzy: [0, 0, 2] },
    { label: 'Low', value: 2, fuzzy: [1, 2, 3] },
    { label: 'Medium', value: 3, fuzzy: [2, 3, 4] },
    { label: 'High', value: 4, fuzzy: [3, 4, 5] },
    { label: 'Very High', value: 5, fuzzy: [4, 5, 5] }
  ],
  exposure: [
    { label: 'Very Rare', value: 1, fuzzy: [0, 0, 2] },
    { label: 'Rare', value: 2, fuzzy: [1, 2, 3] },
    { label: 'Occasional', value: 3, fuzzy: [2, 3, 4] },
    { label: 'Frequent', value: 4, fuzzy: [3, 4, 5] },
    { label: 'Very Frequent', value: 5, fuzzy: [4, 5, 5] }
  ],
  probability: [
    { label: 'Remote', value: 1, fuzzy: [0, 0, 2] },
    { label: 'Unlikely', value: 2, fuzzy: [1, 2, 3] },
    { label: 'Possible', value: 3, fuzzy: [2, 3, 4] },
    { label: 'Likely', value: 4, fuzzy: [3, 4, 5] },
    { label: 'Very Likely', value: 5, fuzzy: [4, 5, 5] }
  ]
};

// AHP comparison matrix for hazard categories
const AHP_MATRIX = {
  'Ground Movement': { 'Ground Movement': 1, 'Equipment Failure': 3, 'Environmental': 2, 'Human Factors': 4 },
  'Equipment Failure': { 'Ground Movement': 1/3, 'Equipment Failure': 1, 'Environmental': 2, 'Human Factors': 3 },
  'Environmental': { 'Ground Movement': 1/2, 'Equipment Failure': 1/2, 'Environmental': 1, 'Human Factors': 2 },
  'Human Factors': { 'Ground Movement': 1/4, 'Equipment Failure': 1/3, 'Environmental': 1/2, 'Human Factors': 1 }
};

const TRAMRiskAssessment = () => {
  const [selectedHazardGroup, setSelectedHazardGroup] = useState('');
  const [selectedHazard, setSelectedHazard] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomHazardModal, setShowCustomHazardModal] = useState(false);
  const [showMembershipFunction, setShowMembershipFunction] = useState(false);
  
  // TRAM parameters (linguistic)
  const [consequence, setConsequence] = useState('');
  const [exposure, setExposure] = useState('');
  const [probability, setProbability] = useState('');
  
  // AHP weights
  const [categoryWeights, setCategoryWeights] = useState({
    'Ground Movement': 0.4,
    'Equipment Failure': 0.25,
    'Environmental': 0.2,
    'Human Factors': 0.15
  });
  
  const [assessments, setAssessments] = useState<any[]>([]);
  const [currentFuzzyScore, setCurrentFuzzyScore] = useState(0);
  const [currentVikorScore, setCurrentVikorScore] = useState(0);
  
  const [customHazard, setCustomHazard] = useState({
    name: '',
    group: ''
  });

  // Calculate fuzzy risk score using TRAM methodology
  useEffect(() => {
    if (!consequence || !exposure || !probability) {
      setCurrentFuzzyScore(0);
      setCurrentVikorScore(0);
      return;
    }

    const conseq = LINGUISTIC_SCALES.consequence.find(c => c.label === consequence);
    const exp = LINGUISTIC_SCALES.exposure.find(e => e.label === exposure);
    const prob = LINGUISTIC_SCALES.probability.find(p => p.label === probability);

    if (conseq && exp && prob) {
      // Simplified fuzzy calculation (centroid method)
      const fuzzyResult = (conseq.value + exp.value + prob.value) / 3;
      setCurrentFuzzyScore(fuzzyResult);
      
      // VIKOR score calculation (simplified)
      const categoryWeight = categoryWeights[selectedHazardGroup] || 0.25;
      const vikorScore = fuzzyResult * categoryWeight;
      setCurrentVikorScore(vikorScore);
    }
  }, [consequence, exposure, probability, selectedHazardGroup, categoryWeights]);

  const getFuzzyRiskLevel = (score: number) => {
    if (score <= 2) return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-700' };
    if (score <= 3.5) return { level: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { level: 'High', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  const addAssessment = () => {
    if (!selectedHazard || !consequence || !exposure || !probability) return;
    
    const newAssessment = {
      id: Date.now(),
      hazard: selectedHazard,
      group: selectedHazardGroup,
      consequence,
      exposure,
      probability,
      fuzzyScore: currentFuzzyScore,
      vikorScore: currentVikorScore,
      riskLevel: getFuzzyRiskLevel(currentFuzzyScore),
      timestamp: new Date().toLocaleString()
    };
    
    setAssessments([...assessments, newAssessment]);
    
    // Reset form
    setSelectedHazard('');
    setConsequence('');
    setExposure('');
    setProbability('');
  };

  const addCustomHazard = () => {
    if (!customHazard.name || !customHazard.group) return;
    
    if (!TRAM_HAZARD_GROUPS[customHazard.group]) {
      TRAM_HAZARD_GROUPS[customHazard.group] = [];
    }
    TRAM_HAZARD_GROUPS[customHazard.group].push(customHazard.name);
    
    setCustomHazard({ name: '', group: '' });
    setShowCustomHazardModal(false);
  };

  const exportToPDF = () => {
    console.log('Exporting TRAM assessment to PDF...', assessments);
    alert('PDF export functionality: TRAM Fuzzy Risk Assessment Report would be generated here');
  };

  // Generate membership function data for visualization
  const generateMembershipFunction = (parameter: string) => {
    const scale = LINGUISTIC_SCALES[parameter as keyof typeof LINGUISTIC_SCALES];
    const data = [];
    
    for (let x = 0; x <= 5; x += 0.1) {
      const point: any = { x: x.toFixed(1) };
      
      scale.forEach(item => {
        const [a, b, c] = item.fuzzy;
        let membership = 0;
        
        if (x <= a || x >= c) {
          membership = 0;
        } else if (x >= a && x <= b) {
          membership = (x - a) / (b - a);
        } else if (x >= b && x <= c) {
          membership = (c - x) / (c - b);
        }
        
        point[item.label] = membership;
      });
      
      data.push(point);
    }
    
    return data;
  };

  const getFilteredHazards = () => {
    if (!selectedHazardGroup) return [];
    
    const hazards = TRAM_HAZARD_GROUPS[selectedHazardGroup] || [];
    return hazards.filter(hazard => 
      hazard.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Calculate VIKOR rankings
  const getVikorRankings = () => {
    if (assessments.length === 0) return [];
    
    // Sort by VIKOR score (descending for risk)
    return assessments
      .sort((a, b) => b.vikorScore - a.vikorScore)
      .map((assessment, index) => ({
        ...assessment,
        vikorRank: index + 1
      }));
  };

  const membershipData = generateMembershipFunction('consequence');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/products/risk-assessment">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Methods
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">TRAM Risk Assessment</h1>
            <p className="text-gray-600">Advanced methodology with Fuzzy Logic, AHP, and VIKOR ranking</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Method Overview */}
          <Alert className="border-purple-200 bg-purple-50">
            <BarChart3 className="h-4 w-4" />
            <AlertDescription>
              <strong>TRAM Methodology:</strong> Uses linguistic variables converted to triangular fuzzy numbers, 
              AHP for category weighting, and VIKOR for multi-criteria ranking.
            </AlertDescription>
          </Alert>

          {/* AHP Category Weights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                AHP Category Weights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.entries(categoryWeights).map(([category, weight]) => (
                    <div key={category}>
                      <div className="flex justify-between mb-2">
                        <Label>{category}</Label>
                        <span className="text-sm font-mono">{weight.toFixed(2)}</span>
                      </div>
                      <Slider
                        value={[weight]}
                        onValueChange={([value]) => setCategoryWeights({
                          ...categoryWeights,
                          [category]: value
                        })}
                        max={1}
                        min={0.05}
                        step={0.05}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Weight Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(categoryWeights).map(([category, weight]) => (
                      <div key={category} className="flex justify-between">
                        <span className="text-sm">{category}:</span>
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-3 bg-purple-500 rounded"
                            style={{ width: `${weight * 100}px` }}
                          />
                          <span className="text-sm">{(weight * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hazard Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Hazard Selection (TRAM Categories)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Hazard Category</Label>
                  <Select value={selectedHazardGroup} onValueChange={setSelectedHazardGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(TRAM_HAZARD_GROUPS).map(group => (
                        <SelectItem key={group} value={group}>
                          {group} (Weight: {categoryWeights[group]?.toFixed(2)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Search Hazards</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search hazards..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <Dialog open={showCustomHazardModal} onOpenChange={setShowCustomHazardModal}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Custom Hazard
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Custom Hazard</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Hazard Name</Label>
                          <Input
                            value={customHazard.name}
                            onChange={(e) => setCustomHazard({...customHazard, name: e.target.value})}
                            placeholder="Enter hazard name..."
                          />
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Select 
                            value={customHazard.group} 
                            onValueChange={(value) => setCustomHazard({...customHazard, group: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category..." />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(TRAM_HAZARD_GROUPS).map(group => (
                                <SelectItem key={group} value={group}>
                                  {group}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={addCustomHazard} className="w-full">
                          Add Hazard
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {selectedHazardGroup && (
                <div>
                  <Label>Specific Hazard</Label>
                  <Select value={selectedHazard} onValueChange={setSelectedHazard}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hazard..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getFilteredHazards().map((hazard, index) => (
                        <SelectItem key={index} value={hazard}>
                          {hazard}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Linguistic Variables Input */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Linguistic Variables (TRAM Method)
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setShowMembershipFunction(!showMembershipFunction)}
              >
                {showMembershipFunction ? 'Hide' : 'Show'} Membership Functions
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-base font-semibold">Consequence (Linguistic)</Label>
                  <Select value={consequence} onValueChange={setConsequence}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consequence..." />
                    </SelectTrigger>
                    <SelectContent>
                      {LINGUISTIC_SCALES.consequence.map((item, index) => (
                        <SelectItem key={index} value={item.label}>
                          {item.label} (Fuzzy: [{item.fuzzy.join(', ')}])
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold">Exposure (Linguistic)</Label>
                  <Select value={exposure} onValueChange={setExposure}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exposure..." />
                    </SelectTrigger>
                    <SelectContent>
                      {LINGUISTIC_SCALES.exposure.map((item, index) => (
                        <SelectItem key={index} value={item.label}>
                          {item.label} (Fuzzy: [{item.fuzzy.join(', ')}])
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold">Probability (Linguistic)</Label>
                  <Select value={probability} onValueChange={setProbability}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select probability..." />
                    </SelectTrigger>
                    <SelectContent>
                      {LINGUISTIC_SCALES.probability.map((item, index) => (
                        <SelectItem key={index} value={item.label}>
                          {item.label} (Fuzzy: [{item.fuzzy.join(', ')}])
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Membership Function Visualization */}
              {showMembershipFunction && (
                <Card className="bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Triangular Membership Functions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={membershipData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis domain={[0, 1]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="Very Low" stroke="#22c55e" strokeWidth={2} />
                        <Line type="monotone" dataKey="Low" stroke="#84cc16" strokeWidth={2} />
                        <Line type="monotone" dataKey="Medium" stroke="#eab308" strokeWidth={2} />
                        <Line type="monotone" dataKey="High" stroke="#f97316" strokeWidth={2} />
                        <Line type="monotone" dataKey="Very High" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Real-time Fuzzy Score Display */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold">Fuzzy Risk Score</h3>
                    <p className="text-3xl font-bold text-purple-600">
                      {currentFuzzyScore.toFixed(3)}
                    </p>
                    <Badge className={`${getFuzzyRiskLevel(currentFuzzyScore).color} text-white mt-2`}>
                      {getFuzzyRiskLevel(currentFuzzyScore).level}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">VIKOR Score</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {currentVikorScore.toFixed(3)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Weighted by category importance
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={addAssessment} 
                  disabled={!selectedHazard || !consequence || !exposure || !probability}
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
                >
                  Add to TRAM Assessment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* VIKOR Rankings */}
          {assessments.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  VIKOR Rankings ({assessments.length} hazards)
                </CardTitle>
                <Button onClick={exportToPDF} className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export TRAM Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>VIKOR Rank</TableHead>
                        <TableHead>Hazard</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Fuzzy Score</TableHead>
                        <TableHead>VIKOR Score</TableHead>
                        <TableHead>Risk Level</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getVikorRankings().map((assessment) => (
                        <TableRow key={assessment.id}>
                          <TableCell className="font-bold">
                            #{assessment.vikorRank}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate" title={assessment.hazard}>
                              {assessment.hazard}
                            </div>
                          </TableCell>
                          <TableCell>{assessment.group}</TableCell>
                          <TableCell className="font-mono">
                            {assessment.fuzzyScore.toFixed(3)}
                          </TableCell>
                          <TableCell className="font-mono">
                            {assessment.vikorScore.toFixed(3)}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${assessment.riskLevel.color} text-white`}>
                              {assessment.riskLevel.level}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {assessments.length === 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No TRAM assessments added yet. Select a hazard and input linguistic variables to begin your fuzzy risk assessment.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TRAMRiskAssessment;
