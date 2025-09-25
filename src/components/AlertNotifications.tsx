import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Clock, MapPin, Tag } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'success' | 'info';
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  station?: string;
  category?: string;
}

interface AlertNotificationsProps {
  alerts: Alert[];
  showCategory?: boolean;
}

export default function AlertNotifications({ alerts, showCategory = false }: AlertNotificationsProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50/50';
      default: return 'border-l-blue-500 bg-blue-50/50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Operations': return 'bg-purple-100 text-purple-700';
      case 'System': return 'bg-indigo-100 text-indigo-700';
      case 'Performance': return 'bg-green-100 text-green-700';
      case 'Maintenance': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      <AnimatePresence>
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            className={`p-4 rounded-xl border-l-4 backdrop-blur-sm ${getPriorityColor(alert.priority)} hover:shadow-md transition-all duration-200`}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start space-x-3">
              {/* Alert Icon with Animation */}
              <motion.div
                animate={alert.priority === 'high' ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: alert.priority === 'high' ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {getAlertIcon(alert.type)}
              </motion.div>

              <div className="flex-1 min-w-0">
                {/* Header with Priority and Category */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(alert.priority)}`}>
                      {alert.priority.toUpperCase()}
                    </span>
                    {showCategory && alert.category && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(alert.category)}`}>
                        <Tag className="w-3 h-3 inline mr-1" />
                        {alert.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>

                {/* Alert Message */}
                <p className="text-sm font-medium text-gray-900 mb-2 leading-relaxed">
                  {alert.message}
                </p>

                {/* Station Info */}
                {alert.station && (
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>Station: {alert.station}</span>
                  </div>
                )}

                {/* Action Buttons for High Priority */}
                {alert.priority === 'high' && (
                  <div className="flex items-center space-x-2 mt-3">
                    <motion.button
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Acknowledge
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Priority Indicator */}
              {alert.priority === 'high' && (
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty State */}
      {alerts.length === 0 && (
        <motion.div
          className="text-center py-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <p className="text-sm font-medium">All systems running smoothly</p>
          <p className="text-xs">No active alerts</p>
        </motion.div>
      )}
    </div>
  );
}