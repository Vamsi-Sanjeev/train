import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Leaf, TrendingUp } from 'lucide-react';

interface EnergyGaugeProps {
  value: number; // Energy savings percentage
}

export default function EnergyGauge({ value }: EnergyGaugeProps) {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const getColor = (percentage: number) => {
    if (percentage >= 20) return '#10b981'; // Green
    if (percentage >= 15) return '#f59e0b'; // Yellow
    if (percentage >= 10) return '#ef4444'; // Red
    return '#6b7280'; // Gray
  };

  const getGradientId = (percentage: number) => {
    if (percentage >= 20) return 'greenGradient';
    if (percentage >= 15) return 'yellowGradient';
    if (percentage >= 10) return 'redGradient';
    return 'grayGradient';
  };

  return (
    <div className="flex flex-col items-center">
      {/* Gauge */}
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
            <linearGradient id="grayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          
          {/* Progress Circle */}
          <motion.circle
            stroke={`url(#${getGradientId(value)})`}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Zap className={`w-8 h-8 mb-2`} style={{ color: getColor(value) }} />
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="text-2xl font-bold text-gray-900">{value.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Energy Saved</div>
          </motion.div>
        </div>

        {/* Animated Particles */}
        {value >= 15 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  left: `${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                  top: `${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 w-full">
        <div className="text-center p-3 bg-white/40 rounded-lg border border-white/30">
          <div className="flex items-center justify-center mb-1">
            <Leaf className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-gray-900">CO₂ Reduced</span>
          </div>
          <div className="text-lg font-bold text-green-600">
            {(value * 12.5).toFixed(0)} kg
          </div>
          <div className="text-xs text-gray-600">per day</div>
        </div>

        <div className="text-center p-3 bg-white/40 rounded-lg border border-white/30">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm font-medium text-gray-900">Cost Saved</span>
          </div>
          <div className="text-lg font-bold text-blue-600">
            ₹{(value * 850).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">per month</div>
        </div>
      </div>

      {/* Efficiency Rating */}
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Efficiency Rating</span>
          <span className={`text-sm font-bold`} style={{ color: getColor(value) }}>
            {value >= 20 ? 'Excellent' : value >= 15 ? 'Good' : value >= 10 ? 'Fair' : 'Poor'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="h-2 rounded-full"
            style={{ backgroundColor: getColor(value) }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(value * 4, 100)}%` }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}