import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Edit3, 
  Calendar, 
  User, 
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'editor', label: 'New Entry', icon: Edit3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'profile', label: 'Profile', icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeView, onViewChange }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => onViewChange(activeView)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-dark-100 
          border-r border-neutral-200 dark:border-dark-200 z-50
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-dark-200 lg:hidden">
            <span className="font-semibold text-neutral-900 dark:text-dark-900">Menu</span>
            <button
              onClick={() => onViewChange(activeView)}
              className="p-2 rounded-lg text-neutral-500 dark:text-dark-500 hover:text-neutral-700 dark:hover:text-dark-700 hover:bg-neutral-100 dark:hover:bg-dark-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <li key={item.id}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onViewChange(item.id)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl 
                        text-left transition-all duration-200
                        ${isActive 
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 shadow-soft' 
                          : 'text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900 hover:bg-neutral-100 dark:hover:bg-dark-100'
                        }
                      `}
                    >
                      <Icon size={20} className={isActive ? 'text-primary-600 dark:text-primary-400' : ''} />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-200 dark:border-dark-200">
            <div className="text-center">
              <p className="text-xs text-neutral-500 dark:text-dark-500 mb-2">
                © 2025 Momento
              </p>
              <p className="text-xs text-neutral-400 dark:text-dark-400">
                Your thoughts, beautifully organized
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};