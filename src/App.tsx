import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import OperationsDashboard from './components/OperationsDashboard';
import AdminDashboard from './components/AdminDashboard';
import { User, AuthState } from './types/auth';

function App() {
  // Authentication state
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  // Handle login with smooth transition
  const handleLogin = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true
    });
  };

  // Handle logout with smooth transition
  const handleLogout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!authState.isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <LoginPage onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.1 }}
          >
            {authState.user?.role === 'admin' ? (
              <AdminDashboard user={authState.user} onLogout={handleLogout} />
            ) : (
              <OperationsDashboard user={authState.user!} onLogout={handleLogout} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;