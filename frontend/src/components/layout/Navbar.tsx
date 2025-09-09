import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Moon,
  Sun,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white/95 dark:bg-dark-100/95 backdrop-blur-md border-b border-neutral-200/50 dark:border-dark-300/50 sticky top-0 z-50">
      <div className="px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className="lg:hidden p-2.5 rounded-xl text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900 hover:bg-neutral-100 dark:hover:bg-dark-200 transition-all duration-200"
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
            
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <BookOpen className="text-primary-600 dark:text-primary-400" size={28} />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-secondary-500" size={12} />
                </motion.div>
              </div>
              <div>
                <span className="font-bold text-neutral-900 dark:text-dark-900 text-xl tracking-tight">
                  Momento
                </span>
                <div className="text-xs text-neutral-500 dark:text-dark-500 -mt-1">
                  Premium Journaling
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900 hover:bg-neutral-100 dark:hover:bg-dark-200 transition-all duration-200"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.div 
              className="flex items-center space-x-3 bg-neutral-100 dark:bg-dark-200 rounded-2xl p-1.5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <img
                  src={user?.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                  alt={user?.name || 'User Avatar'}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-dark-100"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 rounded-full border-2 border-white dark:border-dark-100"></div>
              </div>
              <div className="hidden md:block pr-2">
                <p className="text-sm font-semibold text-neutral-900 dark:text-dark-900">{user?.name}</p>
                <p className="text-xs text-neutral-600 dark:text-dark-600">{user?.email}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};