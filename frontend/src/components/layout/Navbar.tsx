import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Settings,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white/80 dark:bg-dark-100/80 backdrop-blur-md border-b border-neutral-200 dark:border-dark-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg text-neutral-500 dark:text-dark-500 hover:text-neutral-700 dark:hover:text-dark-700 hover:bg-neutral-100 dark:hover:bg-dark-100 transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <BookOpen className="text-primary-600 dark:text-primary-400" size={24} />
              <span className="font-semibold text-neutral-900 dark:text-dark-900 text-lg">Momento</span>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-500 dark:text-dark-500 hover:text-neutral-700 dark:hover:text-dark-700 hover:bg-neutral-100 dark:hover:bg-dark-100 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-800"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-neutral-900 dark:text-dark-900">{user?.name}</p>
                <p className="text-xs text-neutral-500 dark:text-dark-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};