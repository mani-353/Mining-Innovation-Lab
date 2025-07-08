
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mountain, AlertTriangle, Brain, Camera, Zap, Droplets, Thermometer, Gauge, Navigation, MapPin } from 'lucide-react';
import { ref, onValue } from "firebase/database";
import { db } from '@/integrations/firebase/database';

const RadialGauge = ({ value, max, min = 0, label, unit, color = "#3b82f6" }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{Number(value).toFixed(1)}</span>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-xs text-gray-500">{unit}</p>
      </div>
    </div>
  );
};

const StatusIndicator = ({ value, label, icon: Icon, trueColor = "bg-green-500", falseColor = "bg-red-500" }) => (
  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border">
    <div className={`w-4 h-4 rounded-full ${value ? trueColor : falseColor} transition-colors duration-300`}></div>
    <Icon className={`w-5 h-5 ${value ? 'text-green-600' : 'text-red-600'} transition-colors duration-300`} />
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <span className={`text-xs font-semibold ${value ? 'text-green-600' : 'text-red-600'}`}>
      {value ? 'DETECTED' : 'NORMAL'}
    </span>
  </div>
);

const CompassWidget = ({ direction }) => {
  const getDirection = (angle) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-20 h-20 border-2 border-gray-300 rounded-full">
        <div
          className="absolute top-1 left-1/2 w-1 h-6 bg-red-500 origin-bottom transform -translate-x-1/2 transition-transform duration-500"
          style={{ transform: `translateX(-50%) rotate(${direction}deg)` }}
        ></div>
        <div className="absolute inset-2 flex items-center justify-center">
          <Navigation className="w-6 h-6 text-gray-400" />
        </div>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">N</div>
        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-xs font-bold">E</div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">S</div>
        <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-xs font-bold">W</div>
      </div>
      <div className="text-center mt-2">
        <p className="text-sm font-medium">{getDirection(direction)}</p>
        <p className="text-xs text-gray-500">{direction}°</p>
      </div>
    </div>
  );
};

const LandslideDetection = () => {
  const [sensorData, setSensorData] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState(null);

  useEffect(() => {
    const sensorRef = ref(db, "sensorData");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert Firebase object to sorted array (latest 30 items)
        const parsed = Object.values(data)
          .map((item: any) => ({
            ...item,
            time: new Date(item.time || item.receivedAt).toLocaleTimeString(),
          }))
          .filter((item: any) => item.temp !== null && item.temp !== undefined) // filter bad data
          .sort((a: any, b: any) =>
            new Date(a.time).getTime() - new Date(b.time).getTime()
          )
          .slice(-30);

        setSensorData(parsed);

        const latest = parsed[parsed.length - 1];

        if (latest && latest.temp !== null && latest.temp !== undefined) {
          setEnvironmentalData({
            temp: latest.temp ?? 0,
            hum: latest.hum ?? 0,
            atm: latest.atm ?? 1013,
            soil: latest.soil ?? 0,
            vbr1: Boolean(latest.vbr),
            vbr2: false,
            rain: Boolean(latest.rain),
            lat: latest.lat ?? 0,
            long: latest.long ?? 0,
            compass: latest.heading ?? 0,
          });
        } else {
          setEnvironmentalData(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Landslide Detection System</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time monitoring dashboard for landslide detection using advanced sensor networks
            and environmental monitoring systems.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-medium">Live Data Monitoring</span>
          </div>
        </div>

        {/* Acceleration Sensor Data */}
        <Card className="lab-card mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Acceleration Sensor Data (m/s²)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-600 mb-3">X-Axis Acceleration</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="ax" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-green-600 mb-3">Y-Axis Acceleration</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="ay" stroke="#10b981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-purple-600 mb-3">Z-Axis Acceleration</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="az" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gyroscope Sensor Data */}
        <Card className="lab-card mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Gyroscope Sensor Data (°/s)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-orange-600 mb-3">X-Axis Rotation</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="gx" stroke="#ea580c" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-red-600 mb-3">Y-Axis Rotation</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="gy" stroke="#dc2626" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-pink-600 mb-3">Z-Axis Rotation</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="gz" stroke="#ec4899" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {environmentalData && (
          <>
            {/* Environmental Conditions */}
            <Card className="lab-card mb-8">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Thermometer className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Environmental Conditions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <RadialGauge
                    value={environmentalData.temp}
                    max={50}
                    min={0}
                    label="Temperature"
                    unit="°C"
                    color="#ef4444"
                  />
                  <RadialGauge
                    value={environmentalData.hum}
                    max={100}
                    min={0}
                    label="Humidity"
                    unit="%"
                    color="#3b82f6"
                  />
                  <RadialGauge
                    value={environmentalData.atm}
                    max={1050}
                    min={980}
                    label="Atmospheric Pressure"
                    unit="hPa"
                    color="#8b5cf6"
                  />
                  <RadialGauge
                    value={environmentalData.soil}
                    max={100}
                    min={0}
                    label="Soil Moisture"
                    unit="%"
                    color="#10b981"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vibration and Rain Status */}
            <Card className="lab-card mb-8">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Alert Status Monitoring</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <StatusIndicator
                    value={environmentalData.vbr1}
                    label="Vibration Sensor 1"
                    icon={Zap}
                    trueColor="bg-red-500"
                    falseColor="bg-green-500"
                  />
                  <StatusIndicator
                    value={environmentalData.vbr2}
                    label="Vibration Sensor 2"
                    icon={Zap}
                    trueColor="bg-red-500"
                    falseColor="bg-green-500"
                  />
                  <StatusIndicator
                    value={environmentalData.rain}
                    label="Rain Detection"
                    icon={Droplets}
                    trueColor="bg-blue-500"
                    falseColor="bg-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location and Direction */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="lab-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">GPS Location</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-800">Sensor Location</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Latitude: {Number(environmentalData.lat).toFixed(6)}°
                      </p>
                      <p className="text-sm text-gray-600">
                        Longitude: {Number(environmentalData.long).toFixed(6)}°
                      </p>
                      <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full inline-block">
                        <span className="text-xs font-medium">Real-time GPS Tracking</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lab-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-green-600 rounded-lg flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Direction Compass</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center h-64">
                    <CompassWidget direction={environmentalData.compass} />
                  </div>
                </CardContent>
              </Card>
            </div>


            {/* System Status */}
            <Card className="lab-card">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">System Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">System Status</h4>
                    <p className="text-sm text-green-600">All sensors operational</p>
                    <div className="flex items-center mt-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                      <span className="text-xs text-green-600">Online</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Data Update Rate</h4>
                    <p className="text-sm text-blue-600">Every 5 seconds</p>
                    <p className="text-xs text-blue-500 mt-1">Last update: {new Date().toLocaleTimeString()}</p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Alert Level</h4>
                    <p className="text-sm text-purple-600">
                      {environmentalData.vbr1 || environmentalData.vbr2 ? 'MEDIUM RISK' : 'LOW RISK'}
                    </p>
                    <p className="text-xs text-purple-500 mt-1">Monitoring continuous</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LandslideDetection;
