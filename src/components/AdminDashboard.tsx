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
  Settings,
  BarChart3,
  Activity,
  LogOut,
  Brain,
  Sparkles,
  UserPlus,
  Edit3,
  Shield,
  Database,
  Cpu,
  Network
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { User } from '../types/auth';
import { generateSimulationData, generateFestivalData } from '../data/simulationData';
import TrainTimeline from './TrainTimeline';
import PassengerHeatmap from './PassengerHeatmap';
import EnergyGauge from './EnergyGauge';
import AlertNotifications from './AlertNotifications';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

// Admin-focused comprehensive data
const ADMIN_PASSENGER_DATA = [
  { time: '5 AM', passengers: 120, predicted: 130, capacity: 200, efficiency: 60 },
  { time: '6 AM', passengers: 200, predicted: 210, capacity: 300, efficiency: 67 },
  { time: '7 AM', passengers: 350, predicted: 340, capacity: 400, efficiency: 88 },
  { time: '8 AM', passengers: 600, predicted: 580, capacity: 700, efficiency: 86 },
  { time: '9 AM', passengers: 450, predicted: 470, capacity: 500, efficiency: 90 },
  { time: '10 AM', passengers: 280, predicted: 290, capacity: 350, efficiency: 80 },
  { time: '11 AM', passengers: 220, predicted: 230, capacity: 300, efficiency: 73 },
  { time: '12 PM', passengers: 380, predicted: 370, capacity: 450, efficiency: 84 },
  { time: '1 PM', passengers: 320, predicted: 330, capacity: 400, efficiency: 80 },
  { time: '2 PM', passengers: 290, predicted: 300, capacity: 350, efficiency: 83 },
  { time: '3 PM', passengers: 340, predicted: 350, capacity: 400, efficiency: 85 },
  { time: '4 PM', passengers: 420, predicted: 410, capacity: 500, efficiency: 84 },
  { time: '5 PM', passengers: 550, predicted: 540, capacity: 650, efficiency: 85 },
  { time: '6 PM', passengers: 680, predicted: 670, capacity: 750, efficiency: 91 },
  { time: '7 PM', passengers: 520, predicted: 530, capacity: 600, efficiency: 87 },
  { time: '8 PM', passengers: 380, predicted: 390, capacity: 450, efficiency: 84 },
  { time: '9 PM', passengers: 250, predicted: 260, capacity: 300, efficiency: 83 },
  { time: '10 PM', passengers: 180, predicted: 190, capacity: 250, efficiency: 72 },
];

const ADMIN_ENERGY_DATA = [
  { name: 'Energy Saved', value: 18, color: '#10b981' },
  { name: 'Standard Usage', value: 82, color: '#e5e7eb' }
];

const ADMIN_COST_DATA = [
  { month: 'Jan', traditional: 2400, optimized: 1800, savings: 600 },
  { month: 'Feb', traditional: 2200, optimized: 1600, savings: 600 },
  { month: 'Mar', traditional: 2600, optimized: 1900, savings: 700 },
  { month: 'Apr', traditional: 2300, optimized: 1700, savings: 600 },
  { month: 'May', traditional: 2500, optimized: 1850, savings: 650 },
  { month: 'Jun', traditional: 2700, optimized: 2000, savings: 700 }
];

const ADMIN_SYSTEM_METRICS = [
  { name: 'CPU Usage', value: 68, color: '#3b82f6' },
  { name: 'Memory', value: 45, color: '#10b981' },
  { name: 'Network', value: 72, color: '#f59e0b' },
  { name: 'Storage', value: 34, color: '#8b5cf6' }
];

const ADMIN_TRAIN_SCHEDULE = [
  { id: 'T001', route: 'Aluva → Pettah', departure: '06:15', arrival: '06:45', status: 'On Time', passengers: 245, capacity: 300, efficiency: 82 },
  { id: 'T002', route: 'Pettah → Aluva', departure: '06:20', arrival: '06:50', status: 'On Time', passengers: 180, capacity: 300, efficiency: 60 },
  { id: 'T003', route: 'Aluva → Pettah', departure: '06:25', arrival: '06:55', status: 'Delayed 3min', passengers: 220, capacity: 300, efficiency: 73 },
  { id: 'T004', route: 'Pettah → Aluva', departure: '06:30', arrival: '07:00', status: 'On Time', passengers: 195, capacity: 300, efficiency: 65 },
  { id: 'T005', route: 'Aluva → Pettah', departure: '06:35', arrival: '07:05', status: 'On Time', passengers: 160, capacity: 300, efficiency: 53 },
];

const ADMIN_ALERTS = [
  { id: 1, type: 'warning', message: 'Peak load expected at Ernakulam South at 6 PM', time: '2 min ago', priority: 'high', category: 'Operations' },
  { id: 2, type: 'info', message: 'System backup completed successfully', time: '15 min ago', priority: 'medium', category: 'System' },
  { id: 3, type: 'success', message: 'Energy efficiency improved by 12% this week', time: '1 hour ago', priority: 'low', category: 'Performance' },
  { id: 4, type: 'warning', message: 'Database maintenance required next week', time: '2 hours ago', priority: 'high', category: 'Maintenance' }
];

const ADMIN_METRICS = {
  totalTrains: 24,
  onTimePerformance: 94.2,
  energySavings: 18.5,
  passengerSatisfaction: 4.6,
  averageDelay: 2.3,
  systemEfficiency: 91.8,
  totalUsers: 156,
  systemUptime: 99.7,
  dataProcessed: 2.4,
  costSavings: 23.5
};

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [passengerData, setPassengerData] = useState(ADMIN_PASSENGER_DATA);
  const [energyData, setEnergyData] = useState(ADMIN_ENERGY_DATA);
  const [costData, setCostData] = useState(ADMIN_COST_DATA);
  const [trainSchedule, setTrainSchedule] = useState(ADMIN_TRAIN_SCHEDULE);
  const [alerts, setAlerts] = useState(ADMIN_ALERTS);
  const [metrics, setMetrics] = useState(ADMIN_METRICS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentMode, setCurrentMode] = useState<'normal' | 'simulation' | 'festival'>('normal');
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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let newData;
    
    if (currentMode === 'simulation') {
      newData = generateSimulationData();
    } else if (currentMode === 'festival') {
      newData = generateFestivalData();
    } else {
      // Generate admin-specific variations
      const newPassengerData = ADMIN_PASSENGER_DATA.map(item => ({
        ...item,
        passengers: Math.max(50, item.passengers + Math.floor(Math.random() * 60) - 30),
        predicted: Math.max(50, item.predicted + Math.floor(Math.random() * 60) - 30),
        efficiency: Math.max(50, Math.min(100, item.efficiency + Math.random() * 20 - 10))
      }));

      const newEnergyPercentage = Math.floor(Math.random() * 10) + 15;
      const newEnergyData = [
        { name: 'Energy Saved', value: newEnergyPercentage, color: '#10b981' },
        { name: 'Standard Usage', value: 100 - newEnergyPercentage, color: '#e5e7eb' }
      ];

      const newCostData = ADMIN_COST_DATA.map(item => ({
        ...item,
        traditional: item.traditional + Math.floor(Math.random() * 400) - 200,
        optimized: item.optimized + Math.floor(Math.random() * 300) - 150,
        savings: item.savings + Math.floor(Math.random() * 200) - 100
      }));

      const statuses = ['On Time', 'On Time', 'On Time', 'Delayed 2min', 'Delayed 3min', 'Early 1min'];
      const newTrainSchedule = ADMIN_TRAIN_SCHEDULE.map(train => ({
        ...train,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        passengers: Math.max(50, train.passengers + Math.floor(Math.random() * 60) - 30),
        efficiency: Math.max(40, Math.min(100, train.efficiency + Math.random() * 20 - 10))
      }));

      const newMetrics = {
        ...ADMIN_METRICS,
        onTimePerformance: Math.max(85, Math.min(98, ADMIN_METRICS.onTimePerformance + Math.random() * 6 - 3)),
        energySavings: Math.max(10, Math.min(25, ADMIN_METRICS.energySavings + Math.random() * 4 - 2)),
        systemEfficiency: Math.max(85, Math.min(95, ADMIN_METRICS.systemEfficiency + Math.random() * 6 - 3)),
        systemUptime: Math.max(95, Math.min(100, ADMIN_METRICS.systemUptime + Math.random() * 2 - 1))
      };

      newData = {
        passengerData: newPassengerData,
        energyData: newEnergyData,
        costData: newCostData,
        trainSchedule: newTrainSchedule,
        alerts: ADMIN_ALERTS,
        metrics: newMetrics
      };
    }
    
    setPassengerData(newData.passengerData);
    setEnergyData(newData.energyData || ADMIN_ENERGY_DATA);
    setCostData(newData.costData || ADMIN_COST_DATA);
    setTrainSchedule(newData.trainSchedule);
    setAlerts(newData.alerts);
    setMetrics(newData.metrics);
    
    setIsRefreshing(false);
  };

  const handleSimulationMode = async () => {
    setIsRefreshing(true);
    setCurrentMode('simulation');
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const simulationData = generateSimulationData();
    setPassengerData(simulationData.passengerData);
    setTrainSchedule(simulationData.trainSchedule);
    setAlerts(simulationData.alerts);
    setMetrics(simulationData.metrics);
    
    setIsRefreshing(false);
  };

  const handleFestivalMode = async () => {
    setIsRefreshing(true);
    setCurrentMode('festival');
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const festivalData = generateFestivalData();
    setPassengerData(festivalData.passengerData);
    setTrainSchedule(festivalData.trainSchedule);
    setAlerts(festivalData.alerts);
    setMetrics(festivalData.metrics);
    
    setIsRefreshing(false);
  };

  const handleNormalMode = () => {
    setCurrentMode('normal');
    setPassengerData(ADMIN_PASSENGER_DATA);
    setEnergyData(ADMIN_ENERGY_DATA);
    setCostData(ADMIN_COST_DATA);
    setTrainSchedule(ADMIN_TRAIN_SCHEDULE);
    setAlerts(ADMIN_ALERTS);
    setMetrics(ADMIN_METRICS);
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
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg glow-effect">
                <Train className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-primary">MetroMind AI</h1>
                <p className="text-sm text-gray-600">Admin Control Panel</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              {/* Mode Indicator */}
              {currentMode !== 'normal' && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
                  {currentMode === 'simulation' ? <Brain className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  <span>{currentMode === 'simulation' ? 'AI Simulation' : 'Festival Mode'}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handleSimulationMode}
                  disabled={isRefreshing}
                  className={`flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-animate ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="AI Simulation Mode"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Simulation</span>
                </motion.button>

                <motion.button
                  onClick={handleFestivalMode}
                  disabled={isRefreshing}
                  className={`flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-animate ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Festival AI Schedule"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Festival</span>
                </motion.button>

                {currentMode !== 'normal' && (
                  <motion.button
                    onClick={handleNormalMode}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-animate"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Normal Mode"
                  >
                    <Activity className="w-4 h-4" />
                    <span className="hidden sm:inline">Normal</span>
                  </motion.button>
                )}
              </div>

              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-animate ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Updating...' : 'Refresh Data'}</span>
              </motion.button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600 flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Administrator
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
        {/* Mode-specific header */}
        {currentMode !== 'normal' && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`glass rounded-2xl p-4 border border-white/20 shadow-lg ${
              currentMode === 'simulation' 
                ? 'bg-gradient-to-r from-purple-50 to-indigo-50' 
                : 'bg-gradient-to-r from-pink-50 to-purple-50'
            }`}>
              <div className="flex items-center space-x-3">
                {currentMode === 'simulation' ? (
                  <>
                    <Brain className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-purple-900">AI Simulation Mode Active</h3>
                      <p className="text-sm text-purple-700">Advanced AI-optimized schedule with predictive analytics</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 text-pink-600" />
                    <div>
                      <h3 className="font-semibold text-pink-900">🎉 Onam Festival Schedule Active</h3>
                      <p className="text-sm text-pink-700">25% more trains, 40% more passengers between 5-10 PM with special routes</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Comprehensive Admin Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Trains</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.totalTrains}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-glow">
                <Train className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">Fleet active</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On-Time %</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.onTimePerformance.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-glow-green">
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
                <p className="text-sm font-medium text-gray-600">Energy Saved</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.energySavings.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-glow-green">
                <Battery className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Zap className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-sm text-emerald-600 font-medium">₹{(metrics.energySavings * 1000).toLocaleString()} saved</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.passengerSatisfaction.toFixed(1)}/5</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">Excellent</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.systemUptime.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                <Cpu className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Activity className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">Stable</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.totalUsers}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Network className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-600 font-medium">Connected</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data/Hour</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.dataProcessed.toFixed(1)}TB</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl">
                <Database className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <BarChart3 className="w-4 h-4 text-teal-500 mr-1" />
              <span className="text-sm text-teal-600 font-medium">Processing</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.costSavings.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-glow-yellow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">₹{(metrics.costSavings * 10000).toLocaleString()}/month</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Advanced Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Advanced Passenger Analytics */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Advanced Passenger Analytics</h3>
                    <p className="text-sm text-gray-600">Real-time vs AI predictions with efficiency metrics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Current</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                    <span className="text-gray-600">Predicted</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Efficiency</span>
                  </div>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={passengerData}>
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
                    <Area 
                      type="monotone" 
                      dataKey="capacity" 
                      stackId="1"
                      stroke="#ef4444" 
                      fill="#fef2f2"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="passengers" 
                      stackId="2"
                      stroke="#3b82f6" 
                      fill="#dbeafe"
                      fillOpacity={0.6}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#818cf8" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#818cf8', strokeWidth: 2, r: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Cost Analysis & ROI */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cost Analysis & ROI</h3>
                    <p className="text-sm text-gray-600">Traditional vs AI-Optimized Operations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">-{metrics.costSavings.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Total Savings</p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
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
                    <Bar dataKey="traditional" fill="#ef4444" radius={[4, 4, 0, 0]} name="Traditional" />
                    <Bar dataKey="optimized" fill="#10b981" radius={[4, 4, 0, 0]} name="AI Optimized" />
                    <Bar dataKey="savings" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Train Timeline */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentMode === 'festival' ? 'Festival Schedule Timeline' : 'Advanced Train Timeline'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentMode === 'festival' ? 'Special event operations' : 'Real-time positions with efficiency metrics'}
                  </p>
                </div>
              </div>
              <TrainTimeline trains={trainSchedule} showEfficiency={true} />
            </motion.div>
          </div>

          {/* Right Column - System Monitoring */}
          <div className="space-y-8">
            {/* System Performance */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">System Performance</h3>
                  <p className="text-sm text-gray-600">Real-time system metrics</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {ADMIN_SYSTEM_METRICS.map((metric, index) => (
                  <div key={metric.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="h-2 rounded-full"
                          style={{ backgroundColor: metric.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-10">{metric.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Energy Efficiency */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Energy Optimization</h3>
                  <p className="text-sm text-gray-600">Current efficiency status</p>
                </div>
              </div>
              <EnergyGauge value={metrics.energySavings} />
            </motion.div>

            {/* Station Heatmap */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Station Analytics</h3>
                  <p className="text-sm text-gray-600">Passenger density heatmap</p>
                </div>
              </div>
              <PassengerHeatmap />
            </motion.div>

            {/* System Alerts */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
                  <p className="text-sm text-gray-600">Critical notifications</p>
                </div>
              </div>
              <AlertNotifications alerts={alerts} showCategory={true} />
            </motion.div>
          </div>
        </div>

        {/* Admin Controls */}
        <motion.div 
          className="mt-8 glass rounded-2xl p-6 border border-white/20 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Administrative Controls</h3>
              <p className="text-sm text-gray-600">System management and configuration</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.button
              className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 card-hover-subtle"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit3 className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Schedule Editor</p>
                <p className="text-sm text-gray-600">Modify train timings</p>
              </div>
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 card-hover-subtle"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">User Management</p>
                <p className="text-sm text-gray-600">Add/remove operators</p>
              </div>
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 card-hover-subtle"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Analytics Hub</p>
                <p className="text-sm text-gray-600">Generate reports</p>
              </div>
            </motion.button>

            <motion.button
              className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 card-hover-subtle"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Database className="w-5 h-5 text-indigo-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">System Config</p>
                <p className="text-sm text-gray-600">Database & settings</p>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}