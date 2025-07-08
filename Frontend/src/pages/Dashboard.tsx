import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { RefreshCw, Info } from 'lucide-react';
import { useOptimizedMiningData } from '@/hooks/useOptimizedMiningData';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MultiSelect from '@/components/MultiSelect';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Dashboard = () => {
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [mineType, setMineType] = useState<string>('coal');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const {
    coalData,
    nonCoalData,
    loading,
    error,
    filterOptions,
    refetch
  } = useOptimizedMiningData();

  const currentData = mineType === 'coal' ? coalData : nonCoalData;

  // Fix type conversion handlers
  const handleYearChange = (selected: (string | number)[]) => {
    const yearNumbers = selected.map(item =>
      typeof item === 'string' ? parseInt(item) : item
    ).filter(item => !isNaN(item));
    setSelectedYears(yearNumbers);
  };

  const handleStateChange = (selected: (string | number)[]) => {
    const stateStrings = selected.map(item => String(item));
    setSelectedStates(stateStrings);
  };

  const handleCauseChange = (selected: (string | number)[]) => {
    const causeStrings = selected.map(item => String(item));
    setSelectedCauses(causeStrings);
  };

  const handleFetchData = async () => {
    console.log('🔄 Fetch Data button clicked');
    console.log('📊 Current filters:', {
      mineType,
      years: selectedYears,
      states: selectedStates,
      causes: selectedCauses
    });

    setIsDataFetched(false);

    const filters = {
      years: selectedYears.length > 0 ? selectedYears : undefined,
      states: selectedStates.length > 0 ? selectedStates : undefined,
      causes: selectedCauses.length > 0 ? selectedCauses : undefined
    };

    console.log('🎯 Processed filters for API:', filters);

    try {
      await refetch(filters, mineType);
      setIsDataFetched(true);

      toast({
        title: "Data Loaded Successfully",
        description: `Fetched ${mineType} mining accident data with applied filters.`,
      });

      console.log('✅ Data fetch successful');
    } catch (err) {
      console.error('❌ Data fetch error:', err);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    console.log('🔄 Retry button clicked');
    handleFetchData();
  };

  const processYearlyData = () => {
    const yearlyStats: { [key: string]: { year: string; accidents: number; fatalities: number } } = {};

    currentData.forEach((accident) => {
      const year = accident.Year?.toString() || 'Unknown';
      if (!yearlyStats[year]) {
        yearlyStats[year] = { year, accidents: 0, fatalities: 0 };
      }
      yearlyStats[year].accidents += 1;

      const killed = typeof accident.Killed === 'string'
        ? parseInt(accident.Killed) || 0
        : (accident.Killed as number) || 0;
      yearlyStats[year].fatalities += killed;
    });

    return Object.values(yearlyStats).sort((a, b) => parseInt(a.year) - parseInt(b.year));
  };

  const processCauseData = () => {
    const causeStats: { [key: string]: number } = {};

    currentData.forEach((accident) => {
      const cause = accident['Brief Cause'] || 'Unknown';
      causeStats[cause] = (causeStats[cause] || 0) + 1;
    });

    return Object.entries(causeStats)
      .map(([name, value]) => ({ name: name.length > 25 ? name.substring(0, 25) + '...' : name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  const processStateData = () => {
    const stateStats: { [key: string]: number } = {};

    currentData.forEach((accident) => {
      const state = accident.State || 'Unknown';
      stateStats[state] = (stateStats[state] || 0) + 1;
    });

    return Object.entries(stateStats)
      .filter(([name, value]) => name && name !== 'Unknown' && !isNaN(value) && value > 0)
      .map(([name, value], index) => ({
        name: name.length > 12 ? name.substring(0, 12) + '...' : name,
        fullName: name,
        value: Number(value),
        id: `state-${name.replace(/\s+/g, '-')}-${index}` // Remove spaces for unique keys
      }))
      .sort((a, b) => b.value - a.value);
  };


  const processOwnerData = () => {
    const ownerStats: { [key: string]: number } = {};

    currentData.forEach((accident) => {
      const owner = accident.Owner || 'Unknown';
      ownerStats[owner] = (ownerStats[owner] || 0) + 1;
    });

    return Object.entries(ownerStats)
      .filter(([name, value]) => name && name !== 'Unknown' && !isNaN(value) && value > 0)
      .map(([name, value], index) => ({
        name: name.length > 20 ? name.substring(0, 20) + '...' : name,
        fullName: name,
        value: Number(value),
        id: `owner-${name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}-${index}` // Clean special chars
      }))
      .sort((a, b) => b.value - a.value);
  };

  const yearlyData = processYearlyData();
  const causeData = processCauseData();
  const stateData = processStateData();
  const ownerData = processOwnerData();
  console.log("stateData", stateData);
  console.log("ownerData", ownerData);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const totalAccidents = currentData.length;
  const totalFatalities = currentData.reduce((sum, accident) => {
    const killed = typeof accident.Killed === 'string'
      ? parseInt(accident.Killed) || 0
      : (accident.Killed as number) || 0;
    return sum + killed;
  }, 0);

  const totalSeriousInjuries = currentData.reduce((sum, accident) => {
    const injured = accident['Serious Inj.'] || accident['S/Inj.'] || '0';
    const injuredCount = typeof injured === 'string' ? parseInt(injured) || 0 : injured || 0;
    return sum + injuredCount;
  }, 0);

  console.log('📈 Dashboard render - Data summary:', {
    totalAccidents,
    totalFatalities,
    totalSeriousInjuries,
    currentDataLength: currentData.length,
    isDataFetched
  });

  // Custom tooltip component for full names
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{data.fullName || label}</p>
          <p className="text-blue-600">Accidents: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {showDisclaimer && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <Info className="h-4 w-4" />
            <AlertDescription className="flex justify-between items-center">
              <span>
                <strong>Data Disclaimer:</strong> This database contains mining accident data from 2001 to 2013.
                The information is provided for research and analytical purposes.
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDisclaimer(false)}
                className="ml-4"
              >
                ×
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mining Accident Dashboard</h1>
          <p className="text-gray-600">
            Comprehensive analysis of mining accidents data from {mineType} mining operations (2001-2013)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mine Type *</label>
            <Select value={mineType} onValueChange={setMineType}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select mine type" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                <SelectItem value="coal">Coal Mining</SelectItem>
                <SelectItem value="non-coal">Non-Coal Mining</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years</label>
            <MultiSelect
              options={filterOptions.years}
              selected={selectedYears}
              onChange={handleYearChange}
              placeholder="Select years"
              className="h-10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">States</label>
            <MultiSelect
              options={filterOptions.states}
              selected={selectedStates}
              onChange={handleStateChange}
              placeholder="Select states"
              className="h-10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Causes</label>
            <MultiSelect
              options={filterOptions.causes}
              selected={selectedCauses}
              onChange={handleCauseChange}
              placeholder="Select causes"
              className="h-10"
            />
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleFetchData}
              className="w-full bg-blue-600 hover:bg-blue-700 h-10"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Fetching...
                </>
              ) : (
                'Fetch Data'
              )}
            </Button>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => {
                setSelectedYears([]);
                setSelectedStates([]);
                setSelectedCauses([]);
                setIsDataFetched(false);
              }}
              variant="outline"
              className="w-full h-10"
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}

        {loading ? (
          <LoadingSpinner message="Fetching mining accident data..." />
        ) : !isDataFetched ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Mining Accident Dashboard</h3>
              <p className="text-gray-600 mb-4">Select your filters and click "Fetch Data" to load mining accident information</p>
              <div className="text-sm text-gray-500">
                Choose mine type, years, states, and causes to get started
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Accidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{totalAccidents.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Complete dataset results</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Fatalities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{totalFatalities.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Lives lost in accidents</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Serious Injuries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{totalSeriousInjuries.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">People seriously injured</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Most Affected State</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-green-600">
                    {stateData.length > 0 ? stateData[0].fullName : 'N/A'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stateData.length > 0 ? `${stateData[0].value} accidents` : 'No data'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts - Updated with improved labeling */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Year-wise Accident Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="accidents" stroke="#8884d8" name="Accidents" />
                      <Line type="monotone" dataKey="fatalities" stroke="#82ca9d" name="Fatalities" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Accident Causes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={causeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {causeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Fixed States Chart */}
              {/* Vertical States Chart - Full Width */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>All States by Accident Count ({stateData.length} total)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={600}>
                    <BarChart
                      data={stateData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 10 }}
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        name="Accidents"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Fixed Owners Chart */}
              {/* Horizontal Owners Chart - Full Width */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Mine Owners by Accident Count (Top 15)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                      data={ownerData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 10 }}
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        name="Accidents"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
