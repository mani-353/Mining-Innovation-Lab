
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Thermometer, Wind, Activity, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ref, onValue } from "firebase/database";
import { rdb } from '@/integrations/firebase/client';
import { useState, useEffect } from 'react';

// Define interface for sensor data
interface SensorDataItem {
  co2?: number;
  so2?: number;
  nh3?: number;  // Add this
  pm25?: number;
  receivedAt?: string | number;
  time?: string | number;
}

const AirMonitoring = () => {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [environmentalData, setEnvironmentalData] = useState<any>(null);
  // Add these threshold constants after the state declarations:
  const THRESHOLDS = {
    co2: 2000,    // 5000 ppm (OSHA 8-hour TWA)
    so2: 0.5,       // 5 ppm (OSHA 8-hour TWA)
    nh3: 7,      // 25 ppm (OSHA 8-hour TWA)
    pm25: 50      // 35 μg/m³ (EPA 24-hour standard)
  };

  useEffect(() => {
    const sensorRef = ref(rdb, "airMonitoring");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert Firebase object to sorted array (latest 30 items)
        // Replace the existing map function with:
        const parsed = Object.values(data as Record<string, SensorDataItem>)
          .map((item) => ({
            time: new Date(item.receivedAt || item.time).toLocaleTimeString(),
            co2: item.co2 || 0,
            so2: item.so2 || 0,
            nh3: item.nh3 || 0,  // Add this
            pm25: item.pm25 || 0,
            // Remove pm10 from here
            receivedAt: item.receivedAt
          }))
          .filter((item) => item.receivedAt !== null && item.receivedAt !== undefined)
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
                    <XAxis dataKey="time" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} label={{ value: 'CO2 (ppm)', angle: -90, position: 'insideLeft' }} />
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
                    {/* Add threshold line */}
                    <Line
                      type="monotone"
                      dataKey={() => THRESHOLDS.co2}
                      stroke="#ff0000"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      activeDot={false}
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
                    <XAxis dataKey="time" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} label={{ value: 'SO2 (ppm)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1x solid #ccc',
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
                    {/* Add threshold line */}
                    <Line
                      type="monotone"
                      dataKey={() => THRESHOLDS.so2}
                      stroke="#ff0000"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      activeDot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* NH3 and PM2.5 Graphs */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">NH3 & PM2.5 Monitoring</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* NH3 Graph */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">NH3 Concentration Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} label={{ value: 'NH3 (ppm)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} ppm`, 'NH3']}
                    />
                    <Line
                      type="monotone"
                      dataKey="nh3"
                      stroke="#9c27b0"
                      strokeWidth={3}
                      dot={{ fill: '#9c27b0', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#9c27b0', strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey={() => THRESHOLDS.nh3}
                      stroke="#ff0000"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      activeDot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PM2.5 Graph */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">PM2.5 Concentration Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} label={{ value: 'PM2.5 (µg/m³)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} µg/m³`, 'PM2.5']}
                    />
                    <Line
                      type="monotone"
                      dataKey="pm25"
                      stroke="#ff9800"
                      strokeWidth={3}
                      dot={{ fill: '#ff9800', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#ff9800', strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey={() => THRESHOLDS.pm25}
                      stroke="#ff0000"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      activeDot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AirMonitoring;
