import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface TodaysProgressProps {
  wordsWritten: number;
  entriesWritten: number;
  targetWords?: number;
}

export const TodaysProgress: React.FC<TodaysProgressProps> = ({ 
  wordsWritten = 247, 
  entriesWritten = 2,
  targetWords = 500 
}) => {
  const progressPercentage = Math.min((wordsWritten / targetWords) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-dark-200/50 dark:to-dark-300/50 rounded-2xl border border-neutral-200/50 dark:border-dark-300/50"
    >
      <div className="flex items-center space-x-2 mb-3">
        <TrendingUp className="text-success-600" size={16} />
        <span className="text-sm font-medium text-neutral-700 dark:text-dark-700">
          Today's Progress
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="text-xs text-neutral-600 dark:text-dark-600">
          <div className="flex justify-between mb-1">
            <span>Words written</span>
            <span className="font-medium">{wordsWritten}</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-dark-400 rounded-full h-1.5">
            <motion.div 
              className="bg-gradient-to-r from-success-500 to-accent-500 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs">
            <span className="text-neutral-500 dark:text-dark-500">Target: {targetWords}</span>
            <span className="text-success-600 dark:text-success-400">{Math.round(progressPercentage)}%</span>
          </div>
        </div>
        
        <div className="text-xs text-neutral-600 dark:text-dark-600">
          <div className="flex justify-between">
            <span>Entries today</span>
            <span className="font-medium text-accent-600">{entriesWritten}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
