
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Thermometer, Wind, Activity, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ref, onValue } from "firebase/database";
import { db } from '@/integrations/firebase/database';
import { useState, useEffect } from 'react';

// Define interface for sensor data
interface SensorDataItem {
  co2?: number;
  so2?: number;
  pm10?: number;
  pm25?: number;
  receivedAt?: string | number;
  time?: string | number;
}

const AirMonitoring = () => {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [environmentalData, setEnvironmentalData] = useState<any>(null);

  useEffect(() => {
    const sensorRef = ref(db, "airMonitoring");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert Firebase object to sorted array (latest 30 items)
        const parsed = Object.values(data as Record<string, SensorDataItem>)
          .map((item) => ({
            time: new Date(item.receivedAt || item.time).toLocaleTimeString(),
            co2: item.co2 || 0,
            so2: item.so2 || 0,
            pm10: item.pm10 || 0,
            pm25: item.pm25 || 0,
            receivedAt: item.receivedAt
          }))
          .filter((item) => item.receivedAt !== null && item.receivedAt !== undefined) // filter bad data
          .sort((a, b) =>
            new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
          )
          .slice(-30);

        setSensorData(parsed);

        // Set the latest data
        const latest = parsed[parsed.length - 1];
        setEnvironmentalData(latest);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">IoT Air Monitoring System</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time air quality monitoring solution using IoT sensors for continuous environmental
            surveillance in mining operations, ensuring worker safety and environmental compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="lab-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">IoT Connectivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Wireless sensor networks deployed across mining sites for seamless data transmission
                and real-time monitoring capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="lab-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <Thermometer className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Environmental Sensors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Multi-parameter sensors measuring temperature, humidity, dust particles,
                gas concentrations, and other critical environmental factors.
              </p>
            </CardContent>
          </Card>

          <Card className="lab-card">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Real-time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Live data processing and analysis with instant alerts for hazardous conditions
                and automated reporting systems.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Monitoring Parameters</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Wind className="w-4 h-4 text-blue-600 mr-2" />
                  Air Quality Index (AQI)
                </li>
                <li className="flex items-center">
                  <Wind className="w-4 h-4 text-blue-600 mr-2" />
                  Particulate Matter (PM2.5, PM10)
                </li>
                <li className="flex items-center">
                  <Wind className="w-4 h-4 text-blue-600 mr-2" />
                  Gas Concentrations (CO, CO2, CH4)
                </li>
                <li className="flex items-center">
                  <Thermometer className="w-4 h-4 text-blue-600 mr-2" />
                  Temperature & Humidity
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                  Location-based Monitoring
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">System Capabilities</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 24/7 continuous monitoring</li>
                <li>• SMS and email alert system</li>
                <li>• Historical data logging</li>
                <li>• Remote access dashboard</li>
                <li>• Automated compliance reporting</li>
                <li>• Mobile app integration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Air Quality Index Graph */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Air Quality Index</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* CO2 Graph */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">CO2 Concentration Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="time"
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="#666"
                      fontSize={12}
                      label={{ value: 'CO2 (ppm)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} ppm`, 'CO2']}
                    />
                    <Line
                      type="monotone"
                      dataKey="co2"
                      stroke="#ff6b6b"
                      strokeWidth={3}
                      dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#ff6b6b', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SO2 Graph */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">SO2 Concentration Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="time"
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="#666"
                      fontSize={12}
                      label={{ value: 'SO2 (ppm)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} ppm`, 'SO2']}
                    />
                    <Line
                      type="monotone"
                      dataKey="so2"
                      stroke="#4ecdc4"
                      strokeWidth={3}
                      dot={{ fill: '#4ecdc4', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#4ecdc4', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FOURTH MODIFICATION: Replace the PM2.5 and PM10 graph section with this: */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">PM2.5 & PM10 Concentration Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis
                  stroke="#666"
                  fontSize={12}
                  label={{ value: 'Concentration (µg/m³)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [
                    `${value} µg/m³`,
                    name === 'pm25' ? 'PM2.5' : 'PM10'
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pm25"
                  stroke="#ff6b6b"
                  strokeWidth={3}
                  dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#ff6b6b', strokeWidth: 2 }}
                  name="PM2.5"
                />
                <Line
                  type="monotone"
                  dataKey="pm10"
                  stroke="#4ecdc4"
                  strokeWidth={3}
                  dot={{ fill: '#4ecdc4', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#4ecdc4', strokeWidth: 2 }}
                  name="PM10"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">PM2.5 (Fine Particles)</h4>
              <p>Particles with diameter ≤ 2.5 micrometers. Can penetrate deep into lungs and bloodstream.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">PM10 (Coarse Particles)</h4>
              <p>Particles with diameter ≤ 10 micrometers. Can cause respiratory issues and lung irritation.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Deployment Status</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-green-800 font-semibold">Successfully Deployed</span>
            </div>
            <p className="text-gray-700">
              The IoT Air Monitoring System has been successfully deployed across multiple mining
              sites and is actively monitoring environmental conditions. The system has shown
              significant improvements in early hazard detection and environmental compliance.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AirMonitoring;
