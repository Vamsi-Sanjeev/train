import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StationData {
  name: string;
  passengers: number;
  capacity: number;
  trend: 'up' | 'down' | 'stable';
  intensity: 'low' | 'medium' | 'high' | 'critical';
}

const STATION_DATA: StationData[] = [
  { name: 'Aluva', passengers: 450, capacity: 600, trend: 'up', intensity: 'high' },
  { name: 'Pulinchodu', passengers: 180, capacity: 400, trend: 'stable', intensity: 'low' },
  { name: 'Companypady', passengers: 220, capacity: 400, trend: 'down', intensity: 'medium' },
  { name: 'Ambattukavu', passengers: 160, capacity: 350, trend: 'stable', intensity: 'low' },
  { name: 'Muttom', passengers: 280, capacity: 450, trend: 'up', intensity: 'medium' },
  { name: 'Kalamassery', passengers: 520, capacity: 650, trend: 'up', intensity: 'high' },
  { name: 'Cusat', passengers: 340, capacity: 500, trend: 'stable', intensity: 'medium' },
  { name: 'Pathadipalam', passengers: 190, capacity: 400, trend: 'down', intensity: 'low' },
  { name: 'Edapally', passengers: 680, capacity: 750, trend: 'up', intensity: 'critical' },
  { name: 'Changampuzha Park', passengers: 320, capacity: 500, trend: 'stable', intensity: 'medium' },
  { name: 'Palarivattom', passengers: 590, capacity: 700, trend: 'up', intensity: 'high' },
  { name: 'JLN Stadium', passengers: 420, capacity: 600, trend: 'down', intensity: 'medium' },
  { name: 'Kaloor', passengers: 750, capacity: 800, trend: 'up', intensity: 'critical' },
  { name: 'Town Hall', passengers: 650, capacity: 750, trend: 'stable', intensity: 'high' },
  { name: 'MG Road', passengers: 820, capacity: 900, trend: 'up', intensity: 'critical' },
  { name: 'Maharajas', passengers: 480, capacity: 650, trend: 'down', intensity: 'medium' },
  { name: 'Ernakulam South', passengers: 720, capacity: 800, trend: 'up', intensity: 'critical' },
  { name: 'Kadavanthra', passengers: 380, capacity: 550, trend: 'stable', intensity: 'medium' },
  { name: 'Elamkulam', passengers: 290, capacity: 450, trend: 'down', intensity: 'medium' },
  { name: 'Vyttila', passengers: 560, capacity: 700, trend: 'up', intensity: 'high' },
  { name: 'Thaikoodam', passengers: 340, capacity: 500, trend: 'stable', intensity: 'medium' },
  { name: 'Pettah', passengers: 480, capacity: 600, trend: 'up', intensity: 'high' },
];

export default function PassengerHeatmap() {
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getIntensityTextColor = (intensity: string) => {
    switch (intensity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      default: return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getLoadPercentage = (passengers: number, capacity: number) => {
    return Math.round((passengers / capacity) * 100);
  };

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {STATION_DATA.map((station, index) => (
        <motion.div
          key={station.name}
          className="flex items-center justify-between p-3 bg-white/40 rounded-lg border border-white/30 hover:bg-white/60 transition-all duration-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Intensity Indicator */}
            <div className="relative">
              <motion.div 
                className={`w-3 h-3 rounded-full ${getIntensityColor(station.intensity)}`}
                animate={{
                  scale: station.intensity === 'critical' ? [1, 1.3, 1] : [1],
                  opacity: station.intensity === 'critical' ? [1, 0.7, 1] : [1],
                }}
                transition={{
                  duration: 2,
                  repeat: station.intensity === 'critical' ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
              {station.intensity === 'critical' && (
                <motion.div 
                  className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 opacity-30"
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>

            {/* Station Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {station.name}
                  </span>
                  {getTrendIcon(station.trend)}
                </div>
                <span className={`text-xs font-semibold ${getIntensityTextColor(station.intensity)}`}>
                  {getLoadPercentage(station.passengers, station.capacity)}%
                </span>
              </div>

              {/* Load Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <motion.div 
                  className={`h-1.5 rounded-full ${getIntensityColor(station.intensity)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${getLoadPercentage(station.passengers, station.capacity)}%` }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                />
              </div>

              {/* Passenger Count */}
              <div className="flex items-center justify-between mt-1 text-xs text-gray-600">
                <span>{station.passengers} passengers</span>
                <span>Cap: {station.capacity}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="mt-4 p-3 bg-white/30 rounded-lg border border-white/20">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Intensity Legend</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Low (0-50%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Medium (51-70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600">High (71-85%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">Critical (85%+)</span>
          </div>
        </div>
      </div>
    </div>
  );
}