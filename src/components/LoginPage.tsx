import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, User, Lock, Eye, EyeOff, Building2, Settings, Monitor } from 'lucide-react';
import { User as UserType } from '../types/auth';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

// Updated mock users with email credentials
const MOCK_USERS = [
  { id: '1', username: 'ops@kmrl.com', password: 'ops123', role: 'operations' as const, name: 'Operations Manager' },
  { id: '2', username: 'admin@kmrl.com', password: 'admin123', role: 'admin' as const, name: 'System Administrator' },
];

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'operations' | 'admin' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin({
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      });
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async (role: 'operations' | 'admin') => {
    setSelectedRole(role);
    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      onLogin({
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Metro Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Moving Metro Lines */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 2 }}
          />
          <motion.div
            className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 4 }}
          />
        </div>

        {/* Animated City Lights */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Metro Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {[...Array(144)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-blue-400/20"
                animate={{
                  borderColor: [
                    'rgba(59, 130, 246, 0.1)',
                    'rgba(59, 130, 246, 0.3)',
                    'rgba(59, 130, 246, 0.1)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Login Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div 
            className="glass-dark rounded-3xl p-8 w-full max-w-md border border-white/10 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.5 }}
              >
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-2xl">
                    <Train className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl opacity-20 blur-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  MetroMind AI
                </h1>
                <p className="text-gray-300 text-lg">Kochi Metro Rail Limited</p>
                <p className="text-gray-400 text-sm mt-1">Intelligent Train Scheduling System</p>
              </motion.div>
            </div>

            {/* Role Selection Cards */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.button
                onClick={() => handleDemoLogin('operations')}
                disabled={isLoading}
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  selectedRole === 'operations' 
                    ? 'border-blue-400 bg-blue-500/20' 
                    : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Monitor className="w-8 h-8 text-blue-400" />
                  <span className="text-white font-medium">Operations</span>
                  <span className="text-xs text-gray-400">Daily Monitoring</span>
                </div>
                {selectedRole === 'operations' && isLoading && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-blue-500/20 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                  </motion.div>
                )}
              </motion.button>

              <motion.button
                onClick={() => handleDemoLogin('admin')}
                disabled={isLoading}
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  selectedRole === 'admin' 
                    ? 'border-purple-400 bg-purple-500/20' 
                    : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Settings className="w-8 h-8 text-purple-400" />
                  <span className="text-white font-medium">Admin</span>
                  <span className="text-xs text-gray-400">Full Control</span>
                </div>
                {selectedRole === 'admin' && isLoading && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-purple-500/20 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-6 h-6 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                  </motion.div>
                )}
              </motion.button>
            </motion.div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900/50 text-gray-400">or login manually</span>
              </div>
            </div>

            {/* Manual Login Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div 
                  className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm backdrop-blur-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </motion.form>

            {/* Demo Credentials */}
            <motion.div 
              className="mt-6 pt-6 border-t border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <p className="text-sm text-gray-400 text-center mb-3">Demo Credentials:</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-blue-400">Operations:</span>
                  <span>ops@kmrl.com / ops123</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-400">Admin:</span>
                  <span>admin@kmrl.com / admin123</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}