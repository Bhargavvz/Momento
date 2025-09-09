import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Edit3, 
  Calendar, 
  User, 
  X,
  Zap,
  Settings
} from 'lucide-react';
import { TodaysProgress } from '../dashboard/TodaysProgress';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-primary-600', path: '/app/dashboard' },
  { id: 'editor', label: 'New Entry', icon: Edit3, color: 'text-accent-600', path: '/app/editor' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'text-secondary-600', path: '/app/calendar' },
  { id: 'profile', label: 'Profile', icon: User, color: 'text-success-600', path: '/app/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'text-neutral-600', path: '/app/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
        className={`
          fixed top-0 left-0 h-screen w-72 bg-white/95 dark:bg-dark-100/95 backdrop-blur-md
          border-r border-neutral-200/50 dark:border-dark-300/50 z-50
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200/50 dark:border-dark-300/50 lg:hidden">
            <div className="flex items-center space-x-2">
              <Zap className="text-primary-600" size={20} />
              <span className="font-semibold text-neutral-900 dark:text-dark-900">Navigation</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-neutral-500 dark:text-dark-500 hover:text-neutral-700 dark:hover:text-dark-700 hover:bg-neutral-100 dark:hover:bg-dark-200 transition-all duration-200"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={item.path} onClick={toggleSidebar}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          w-full flex items-center space-x-4 px-4 py-4 rounded-2xl
                          text-left transition-all duration-300 group
                          ${isActive
                            ? 'bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-700 dark:text-primary-300 shadow-soft border border-primary-200/50 dark:border-primary-700/50'
                            : 'text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900 hover:bg-neutral-50 dark:hover:bg-dark-200/50'
                          }
                        `}
                      >
                        <div className={`
                          p-2 rounded-xl transition-all duration-300
                          ${isActive
                            ? 'bg-white dark:bg-dark-100 shadow-soft'
                            : 'group-hover:bg-white dark:group-hover:bg-dark-100 group-hover:shadow-soft'
                          }
                        `}>
                          <Icon
                            size={20}
                            className={isActive ? item.color : 'text-neutral-500 dark:text-dark-500 group-hover:text-neutral-700 dark:group-hover:text-dark-700'}
                          />
                        </div>
                        <span className="font-medium text-sm">{item.label}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8">
              <TodaysProgress wordsWritten={247} entriesWritten={2} targetWords={500} />
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-200/50 dark:border-dark-300/50">
            <div className="text-center">
              <p className="text-xs text-neutral-500 dark:text-dark-500 mb-1">
                © 2025 Momento
              </p>
              <p className="text-xs text-neutral-400 dark:text-dark-400">
                Crafted with ❤️
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};