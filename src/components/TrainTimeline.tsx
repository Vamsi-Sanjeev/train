import React from 'react';
import { motion } from 'framer-motion';
import { Train, Clock, Users, Zap } from 'lucide-react';

interface Train {
  id: string;
  route: string;
  departure: string;
  arrival: string;
  status: string;
  passengers: number;
  capacity: number;
  efficiency?: number;
}

interface TrainTimelineProps {
  trains: Train[];
  showEfficiency?: boolean;
}

export default function TrainTimeline({ trains, showEfficiency = false }: TrainTimelineProps) {
  const getStatusColor = (status: string) => {
    if (status.includes('On Time') || status.includes('Early')) return 'bg-green-500';
    if (status.includes('Delayed')) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusTextColor = (status: string) => {
    if (status.includes('On Time') || status.includes('Early')) return 'text-green-600 bg-green-50';
    if (status.includes('Delayed')) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'text-green-600';
    if (efficiency >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      {trains.map((train, index) => (
        <motion.div
          key={train.id}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Timeline Line */}
          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent"></div>
          
          {/* Train Card */}
          <div className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-200 card-hover-subtle">
            {/* Timeline Dot */}
            <div className="relative flex-shrink-0">
              <motion.div 
                className={`w-3 h-3 rounded-full ${getStatusColor(train.status)}`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className={`absolute inset-0 w-3 h-3 rounded-full ${getStatusColor(train.status)} opacity-30`}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Train Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Train className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-gray-900">{train.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusTextColor(train.status)}`}>
                    {train.status}
                  </span>
                </div>
                {showEfficiency && train.efficiency && (
                  <div className="flex items-center space-x-1">
                    <Zap className={`w-4 h-4 ${getEfficiencyColor(train.efficiency)}`} />
                    <span className={`text-sm font-medium ${getEfficiencyColor(train.efficiency)}`}>
                      {train.efficiency.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-700 font-medium mb-2">{train.route}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Dep: {train.departure}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Arr: {train.arrival}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {train.passengers}/{train.capacity}
                  </span>
                </div>
              </div>

              {/* Passenger Load Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Passenger Load</span>
                  <span>{Math.round((train.passengers / train.capacity) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      (train.passengers / train.capacity) > 0.8 
                        ? 'bg-gradient-to-r from-red-400 to-red-500' 
                        : (train.passengers / train.capacity) > 0.6 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                        : 'bg-gradient-to-r from-green-400 to-green-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(train.passengers / train.capacity) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </div>

            {/* Moving Train Animation */}
            <motion.div
              className="absolute -top-1 -right-1 p-1 bg-blue-500 rounded-full"
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Train className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}