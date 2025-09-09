import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`
                relative w-full ${sizes[size]} rounded-2xl bg-white dark:bg-dark-100 p-6 shadow-soft-lg
                transform transition-all duration-300
              `}
            >
              {title && (
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-900">{title}</h3>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-neutral-400 dark:text-dark-400 hover:text-neutral-600 dark:hover:text-dark-600 hover:bg-neutral-100 dark:hover:bg-dark-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};