
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
import { 
  Shield, 
  AlertTriangle, 
  Calculator, 
  FileText, 
  Plus, 
  Download, 
  Search,
  Target,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// DGMS-specific hazard groups and scales
const HAZARD_GROUPS = {
  'Ground Movement': [
    'Presence of subsidence cracks and fissures',
    'Geologically disturbed areas or weak old supports',
    'Poor knowledge of approved Systematic Support Rules',
    'Rock Mass Rating not determined properly',
    'Poorly supported or unsupported roof',
    'Delay in supporting freshly exposed roof',
    'Inadequate timber support',
    'Failure to maintain proper working height',
    'Poor ventilation causing roof deterioration',
    'Excessive blasting vibrations',
    'Water seepage weakening roof structure',
    'Improper pillar extraction',
    'Inadequate monitoring of ground movement',
    'Poor communication of geological conditions',
    'Failure to follow approved mining plan',
    'Inadequate emergency evacuation procedures',
    'Insufficient training on ground stability'
  ],
  'Rope Haulage System': [
    'Non-provision of safety appliances',
    'Unexpected movement of tubs',
    'Defective rope or rope splicing',
    'Failure to inspect haulage road',
    'Inadequate maintenance of haulage equipment',
    'Poor visibility on haulage roads',
    'Excessive speed of rope haulage',
    'Improper loading of tubs',
    'Defective signal system',
    'Inadequate lighting on haulage roads',
    'Poor drainage causing slippery conditions',
    'Obstruction on haulage roads',
    'Inadequate training of operators',
    'Failure to follow haulage procedures',
    'Defective braking system'
  ],
  'Belt Conveyor System': [
    'Friction in running belt due to spillage',
    'Operator wearing loose dress',
    'Improper belt condition',
    'Failure of pull cord switches',
    'Inadequate belt guarding',
    'Poor maintenance of conveyor',
    'Excessive belt speed',
    'Improper material loading',
    'Defective emergency stops',
    'Poor lighting around conveyor',
    'Spillage creating slip hazards',
    'Inadequate training of operators',
    'Failure to lockout during maintenance',
    'Defective belt alignment',
    'Poor housekeeping around conveyor',
    'Inadequate fire protection',
    'Defective roller bearings',
    'Poor belt tensioning',
    'Inadequate noise protection',
    'Defective belt cleaning system'
  ],
  'Explosives': [
    'Improper storage of explosives',
    'Inadequate blast design',
    'Poor shot firing practices',
    'Defective detonators',
    'Inadequate blast hole stemming',
    'Poor timing of blast',
    'Inadequate evacuation procedures',
    'Defective explosive materials',
    'Poor blast area security',
    'Inadequate training of shot firers',
    'Improper handling of misfires',
    'Poor blast vibration control',
    'Inadequate blast documentation',
    'Defective blasting equipment',
    'Poor explosive transportation'
  ],
  'Dust, Gas and Other Combustible Material': [
    'Inadequate dust suppression',
    'Poor ventilation system',
    'Accumulation of combustible dust',
    'Defective gas monitoring',
    'Inadequate methane drainage',
    'Poor air circulation',
    'Defective dust monitoring equipment',
    'Inadequate training on gas hazards',
    'Poor maintenance of ventilation equipment',
    'Inadequate emergency response for gas',
    'Defective gas detection alarms',
    'Poor housekeeping causing dust accumulation',
    'Inadequate respiratory protection',
    'Poor control of ignition sources',
    'Inadequate gas testing procedures'
  ],
  'Inundation': [
    'Inadequate water management',
    'Poor drainage system',
    'Defective pumping equipment',
    'Inadequate monitoring of water levels',
    'Poor knowledge of old workings',
    'Inadequate barrier pillars',
    'Defective water detection equipment',
    'Poor emergency response for flooding',
    'Inadequate training on water hazards',
    'Poor maintenance of drainage equipment',
    'Inadequate water quality monitoring',
    'Defective water management plan',
    'Poor control of surface water',
    'Inadequate underground water mapping',
    'Defective flood warning system'
  ],
  'Load Haul Dumper': [
    'Inadequate operator training',
    'Poor maintenance of LHD',
    'Defective braking system',
    'Poor visibility from operator cabin',
    'Inadequate lighting in work area',
    'Defective steering system',
    'Poor road conditions',
    'Inadequate communication system',
    'Defective safety devices',
    'Poor loading procedures',
    'Inadequate fire protection',
    'Defective hydraulic system',
    'Poor operator fatigue management',
    'Inadequate traffic management',
    'Defective backup alarms'
  ],
  'Mine Fire': [
    'Inadequate fire prevention measures',
    'Poor fire detection system',
    'Defective fire suppression equipment',
    'Inadequate evacuation procedures',
    'Poor control of ignition sources',
    'Inadequate training on fire safety',
    'Defective fire fighting equipment',
    'Poor maintenance of electrical equipment',
    'Inadequate fire resistant materials',
    'Poor emergency communication',
    'Inadequate fire barriers',
    'Defective smoke detection',
    'Poor fire investigation procedures',
    'Inadequate fire safety inspections',
    'Defective emergency lighting'
  ]
};

const CONSEQUENCE_LEVELS = [
  { label: 'Small injury', value: 0.0001, description: 'Minor injury requiring first aid' },
  { label: 'One lost time injury', value: 0.001, description: 'Single injury causing work absence' },
  { label: 'Many lost time injuries', value: 0.01, description: 'Multiple injuries with work impact' },
  { label: 'One permanent disability', value: 0.1, description: 'Single permanent impairment' },
  { label: 'Significant chance of fatality', value: 0.3, description: 'High probability of death' },
  { label: 'One death', value: 1, description: 'Single fatality' },
  { label: 'Several dead', value: 5, description: 'Multiple fatalities' }
];

const EXPOSURE_LEVELS = [
  { label: 'Once in 100 years', value: 0.02, description: 'Extremely rare occurrence' },
  { label: 'Once in 10 years', value: 0.5, description: 'Very infrequent event' },
  { label: 'Once in 5 years', value: 1.5, description: 'Infrequent occurrence' },
  { label: 'Occasionally (yearly)', value: 2, description: 'Annual occurrence' },
  { label: 'Unusual (monthly)', value: 2.5, description: 'Monthly frequency' },
  { label: 'Seldom (weekly)', value: 3, description: 'Weekly occurrence' },
  { label: 'Frequent (daily)', value: 5, description: 'Daily exposure' },
  { label: 'Continuous', value: 10, description: 'Constant exposure' }
];

const PROBABILITY_LEVELS = [
  { label: 'Virtually impossible', value: 0.1, description: 'Almost never happens' },
  { label: 'Practically impossible', value: 0.5, description: 'Highly unlikely' },
  { label: 'Conceivable but unlikely', value: 1, description: 'Possible but improbable' },
  { label: 'Only remotely possible', value: 2, description: 'Remote possibility' },
  { label: 'Unusual but possible', value: 3, description: 'Uncommon but feasible' },
  { label: 'Quite possible', value: 7, description: 'Reasonably likely' },
  { label: 'May well be expected', value: 10, description: 'Very likely to occur' }
];

const DGMSRiskAssessment = () => {
  const [selectedHazardGroup, setSelectedHazardGroup] = useState('');
  const [selectedHazard, setSelectedHazard] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomHazardModal, setShowCustomHazardModal] = useState(false);
  const [customHazards, setCustomHazards] = useState<string[]>([]);
  
  // Risk parameters
  const [consequence, setConsequence] = useState('');
  const [exposure, setExposure] = useState('');
  const [probability, setProbability] = useState('');
  
  // Assessment results
  const [assessments, setAssessments] = useState<any[]>([]);
  const [currentRiskScore, setCurrentRiskScore] = useState(0);
  
  // Custom hazard form
  const [customHazard, setCustomHazard] = useState({
    name: '',
    group: ''
  });

  // Calculate risk score
  useEffect(() => {
    const conseq = CONSEQUENCE_LEVELS.find(c => c.label === consequence)?.value || 0;
    const exp = EXPOSURE_LEVELS.find(e => e.label === exposure)?.value || 0;
    const prob = PROBABILITY_LEVELS.find(p => p.label === probability)?.value || 0;
    const score = conseq * exp * prob;
    setCurrentRiskScore(score);
  }, [consequence, exposure, probability]);

  const getRiskLevel = (score: number) => {
    if (score < 0.01) return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-700' };
    if (score < 1) return { level: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
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
      riskScore: currentRiskScore,
      riskLevel: getRiskLevel(currentRiskScore),
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
    
    const newHazardName = customHazard.name;
    setCustomHazards([...customHazards, newHazardName]);
    
    // Add to selected group temporarily
    if (!HAZARD_GROUPS[customHazard.group]) {
      HAZARD_GROUPS[customHazard.group] = [];
    }
    HAZARD_GROUPS[customHazard.group].push(newHazardName);
    
    setCustomHazard({ name: '', group: '' });
    setShowCustomHazardModal(false);
  };

  const exportToPDF = () => {
    // PDF generation logic would go here
    console.log('Exporting DGMS assessment to PDF...', assessments);
    alert('PDF export functionality: DGMS Risk Assessment Report would be generated here');
  };

  // Filter hazards based on search
  const getFilteredHazards = () => {
    if (!selectedHazardGroup) return [];
    
    const hazards = HAZARD_GROUPS[selectedHazardGroup] || [];
    return hazards.filter(hazard => 
      hazard.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Group assessments by hazard group
  const getGroupedAssessments = () => {
    const grouped: { [key: string]: any[] } = {};
    assessments.forEach(assessment => {
      if (!grouped[assessment.group]) {
        grouped[assessment.group] = [];
      }
      grouped[assessment.group].push(assessment);
    });
    return grouped;
  };

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
            <h1 className="text-3xl font-bold text-gray-800">DGMS Risk Assessment</h1>
            <p className="text-gray-600">Traditional DGMS methodology: Risk = Consequence × Exposure × Probability</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Hazard Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Hazard Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Hazard Group</Label>
                  <Select value={selectedHazardGroup} onValueChange={setSelectedHazardGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hazard group..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(HAZARD_GROUPS).map(group => (
                        <SelectItem key={group} value={group}>
                          {group} ({HAZARD_GROUPS[group].length} hazards)
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
                      placeholder="Search specific hazards..."
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
                          <Label>Hazard Group</Label>
                          <Select 
                            value={customHazard.group} 
                            onValueChange={(value) => setCustomHazard({...customHazard, group: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select group..." />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(HAZARD_GROUPS).map(group => (
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
                      <SelectValue placeholder="Select specific hazard..." />
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

          {/* Risk Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Risk Parameters (DGMS Method)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-base font-semibold">Consequence (C)</Label>
                  <Select value={consequence} onValueChange={setConsequence}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consequence..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CONSEQUENCE_LEVELS.map((item, index) => (
                        <SelectItem key={index} value={item.label}>
                          {item.label} – {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {consequence && (
                    <p className="text-sm text-gray-600 mt-1">
                      {CONSEQUENCE_LEVELS.find(c => c.label === consequence)?.description}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-base font-semibold">Exposure (E)</Label>
                  <Select value={exposure} onValueChange={setExposure}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exposure..." />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPOSURE_LEVELS.map((item, index) => (
                        <SelectItem key={index} value={item.label}>
                          {item.label} – {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {exposure && (
                    <p className="text-sm text-gray-600 mt-1">
                      {EXPOSURE_LEVELS.find(e => e.label === exposure)?.description}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-base font-semibold">Probability (P)</Label>
                  <Select value={probability} onValueChange={setProbability}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select probability..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PROBABILITY_LEVELS.map((item, index) => (
                        <SelectItem key={index} value={item.label}>
                          {item.label} – {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {probability && (
                    <p className="text-sm text-gray-600 mt-1">
                      {PROBABILITY_LEVELS.find(p => p.label === probability)?.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Real-time Risk Score Display */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Current Risk Score</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {currentRiskScore.toFixed(4)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Risk Level</div>
                    <Badge className={`${getRiskLevel(currentRiskScore).color} text-white`}>
                      {getRiskLevel(currentRiskScore).level}
                    </Badge>
                  </div>
                </div>
                <Button 
                  onClick={addAssessment} 
                  disabled={!selectedHazard || !consequence || !exposure || !probability}
                  className="mt-4 w-full"
                >
                  Add to Assessment List
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {assessments.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Assessment Results ({assessments.length} hazards)
                </CardTitle>
                <Button onClick={exportToPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF Report
                </Button>
              </CardHeader>
              <CardContent>
                {Object.entries(getGroupedAssessments()).map(([group, groupAssessments]) => (
                  <div key={group} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                      {group} ({groupAssessments.length} hazards)
                    </h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Hazard</TableHead>
                            <TableHead>Consequence</TableHead>
                            <TableHead>Exposure</TableHead>
                            <TableHead>Probability</TableHead>
                            <TableHead>Risk Score</TableHead>
                            <TableHead>Risk Level</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {groupAssessments
                            .sort((a, b) => b.riskScore - a.riskScore)
                            .map((assessment) => (
                            <TableRow key={assessment.id}>
                              <TableCell className="max-w-xs">
                                <div className="truncate" title={assessment.hazard}>
                                  {assessment.hazard}
                                </div>
                              </TableCell>
                              <TableCell>{assessment.consequence}</TableCell>
                              <TableCell>{assessment.exposure}</TableCell>
                              <TableCell>{assessment.probability}</TableCell>
                              <TableCell className="font-mono">
                                {assessment.riskScore.toFixed(4)}
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
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {assessments.length === 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No assessments added yet. Select a hazard and input risk parameters to begin your DGMS risk assessment.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DGMSRiskAssessment;
