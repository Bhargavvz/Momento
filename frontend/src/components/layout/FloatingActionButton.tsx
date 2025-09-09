import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 bg-primary-600 hover:bg-primary-700
        text-white rounded-full shadow-soft-lg
        flex items-center justify-center
        transition-colors duration-200
        lg:hidden
      "
    >
      <Plus size={24} />
    </motion.button>
  );
};