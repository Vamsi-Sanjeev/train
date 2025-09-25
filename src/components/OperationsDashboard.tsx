import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Train, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Battery, 
  Zap,
  RefreshCw,
  Calendar,
  MapPin,
  Activity,
  LogOut,
  Monitor,
  BarChart3,
  Eye
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { User } from '../types/auth';
import TrainTimeline from './TrainTimeline';
import PassengerHeatmap from './PassengerHeatmap';
import EnergyGauge from './EnergyGauge';
import AlertNotifications from './AlertNotifications';

interface OperationsDashboardProps {
  user: User;
  onLogout: () => void;
}

// Operations-focused static data
const OPERATIONS_PASSENGER_DATA = [
  { time: '5 AM', passengers: 120, predicted: 130, capacity: 200 },
  { time: '6 AM', passengers: 200, predicted: 210, capacity: 300 },
  { time: '7 AM', passengers: 350, predicted: 340, capacity: 400 },
  { time: '8 AM', passengers: 600, predicted: 580, capacity: 700 },
  { time: '9 AM', passengers: 450, predicted: 470, capacity: 500 },
  { time: '10 AM', passengers: 280, predicted: 290, capacity: 350 },
  { time: '11 AM', passengers: 220, predicted: 230, capacity: 300 },
  { time: '12 PM', passengers: 380, predicted: 370, capacity: 450 },
  { time: '1 PM', passengers: 320, predicted: 330, capacity: 400 },
  { time: '2 PM', passengers: 290, predicted: 300, capacity: 350 },
  { time: '3 PM', passengers: 340, predicted: 350, capacity: 400 },
  { time: '4 PM', passengers: 420, predicted: 410, capacity: 500 },
  { time: '5 PM', passengers: 550, predicted: 540, capacity: 650 },
  { time: '6 PM', passengers: 680, predicted: 670, capacity: 750 },
  { time: '7 PM', passengers: 520, predicted: 530, capacity: 600 },
  { time: '8 PM', passengers: 380, predicted: 390, capacity: 450 },
  { time: '9 PM', passengers: 250, predicted: 260, capacity: 300 },
  { time: '10 PM', passengers: 180, predicted: 190, capacity: 250 },
];

const OPERATIONS_TRAIN_SCHEDULE = [
  { id: 'T001', route: 'Aluva → Pettah', departure: '06:15', arrival: '06:45', status: 'On Time', passengers: 245, capacity: 300, delay: 0 },
  { id: 'T002', route: 'Pettah → Aluva', departure: '06:20', arrival: '06:50', status: 'On Time', passengers: 180, capacity: 300, delay: 0 },
  { id: 'T003', route: 'Aluva → Pettah', departure: '06:25', arrival: '06:55', status: 'Delayed 3min', passengers: 220, capacity: 300, delay: 3 },
  { id: 'T004', route: 'Pettah → Aluva', departure: '06:30', arrival: '07:00', status: 'On Time', passengers: 195, capacity: 300, delay: 0 },
  { id: 'T005', route: 'Aluva → Pettah', departure: '06:35', arrival: '07:05', status: 'On Time', passengers: 160, capacity: 300, delay: 0 },
];

const OPERATIONS_ALERTS = [
  { id: 1, type: 'warning', message: 'Peak load expected at Ernakulam South at 6 PM', time: '2 min ago', priority: 'high', station: 'Ernakulam South' },
  { id: 2, type: 'info', message: 'Train T003 delayed by 3 minutes due to passenger boarding', time: '5 min ago', priority: 'medium', station: 'Kaloor' },
  { id: 3, type: 'success', message: 'All trains running smoothly on Blue Line', time: '10 min ago', priority: 'low', station: 'System Wide' },
  { id: 4, type: 'warning', message: 'High passenger density at MG Road station', time: '15 min ago', priority: 'high', station: 'MG Road' }
];

const OPERATIONS_METRICS = {
  activeTrains: 18,
  onTimePerformance: 94.2,
  currentPassengers: 2840,
  energyEfficiency: 87.5,
  averageDelay: 2.3,
  systemStatus: 'Operational'
};

export default function OperationsDashboard({ user, onLogout }: OperationsDashboardProps) {
  const [passengerData, setPassengerData] = useState(OPERATIONS_PASSENGER_DATA);
  const [trainSchedule, setTrainSchedule] = useState(OPERATIONS_TRAIN_SCHEDULE);
  const [alerts, setAlerts] = useState(OPERATIONS_ALERTS);
  const [metrics, setMetrics] = useState(OPERATIONS_METRICS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate slight variations in data
    const newPassengerData = OPERATIONS_PASSENGER_DATA.map(item => ({
      ...item,
      passengers: Math.max(50, item.passengers + Math.floor(Math.random() * 60) - 30),
      predicted: Math.max(50, item.predicted + Math.floor(Math.random() * 60) - 30)
    }));

    const statuses = ['On Time', 'On Time', 'On Time', 'Delayed 2min', 'Delayed 3min', 'Early 1min'];
    const newTrainSchedule = OPERATIONS_TRAIN_SCHEDULE.map(train => ({
      ...train,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      passengers: Math.max(50, train.passengers + Math.floor(Math.random() * 60) - 30),
      delay: train.status.includes('Delayed') ? Math.floor(Math.random() * 5) + 1 : 0
    }));

    const newMetrics = {
      ...OPERATIONS_METRICS,
      currentPassengers: Math.max(2000, OPERATIONS_METRICS.currentPassengers + Math.floor(Math.random() * 400) - 200),
      onTimePerformance: Math.max(85, Math.min(98, OPERATIONS_METRICS.onTimePerformance + Math.random() * 6 - 3)),
      energyEfficiency: Math.max(80, Math.min(95, OPERATIONS_METRICS.energyEfficiency + Math.random() * 6 - 3))
    };

    setPassengerData(newPassengerData);
    setTrainSchedule(newTrainSchedule);
    setMetrics(newMetrics);
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Train className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-primary">MetroMind AI</h1>
                <p className="text-sm text-gray-600">Operations Dashboard</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
              </motion.button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600 flex items-center">
                    <Monitor className="w-3 h-3 mr-1" />
                    Operations
                  </p>
                </div>
                
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics - Operations Focused */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Trains</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.activeTrains}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Train className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Activity className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">All operational</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On-Time Performance</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.onTimePerformance.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">Above target</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Passengers</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.currentPassengers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Eye className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-600 font-medium">Live count</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Energy Efficiency</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.energyEfficiency.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Battery className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-sm text-emerald-600 font-medium">Optimized</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Visual Components */}
          <div className="lg:col-span-2 space-y-8">
            {/* Train Timeline */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live Train Timeline</h3>
                  <p className="text-sm text-gray-600">Real-time train positions and schedules</p>
                </div>
              </div>
              <TrainTimeline trains={trainSchedule} />
            </motion.div>

            {/* Passenger Demand Chart */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Passenger Flow Analysis</h3>
                  <p className="text-sm text-gray-600">Current vs predicted passenger demand</p>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={passengerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="passengers" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      name="Current"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#818cf8" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#818cf8', strokeWidth: 2, r: 3 }}
                      name="Predicted"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="capacity" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      strokeDasharray="10 5"
                      dot={false}
                      name="Capacity"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Monitoring Tools */}
          <div className="space-y-8">
            {/* Energy Efficiency Gauge */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Energy Monitor</h3>
                  <p className="text-sm text-gray-600">Real-time efficiency</p>
                </div>
              </div>
              <EnergyGauge value={metrics.energyEfficiency} />
            </motion.div>

            {/* Passenger Heatmap */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Station Heatmap</h3>
                  <p className="text-sm text-gray-600">Passenger density by station</p>
                </div>
              </div>
              <PassengerHeatmap />
            </motion.div>

            {/* Live Alerts */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live Alerts</h3>
                  <p className="text-sm text-gray-600">System notifications</p>
                </div>
              </div>
              <AlertNotifications alerts={alerts} />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}