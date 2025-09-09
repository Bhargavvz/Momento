import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Clock, Tag as TagIcon } from 'lucide-react';
import { JournalEntry } from '../../types';

interface EntryCardProps {
  entry: JournalEntry;
  onClick: () => void;
  variant?: 'timeline' | 'grid';
}

export const EntryCard: React.FC<EntryCardProps> = ({ 
  entry, 
  onClick, 
  variant = 'timeline' 
}) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const getPreview = (content: string, length = 150) => {
    const text = stripHtml(content);
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg cursor-pointer
        border border-neutral-100 dark:border-dark-200 transition-all duration-300
        ${variant === 'grid' ? 'h-full' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`text-2xl ${entry.mood.color}`}>
            {entry.mood.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-dark-900 text-lg leading-tight">
              {entry.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-dark-500 mt-1">
              <Clock size={14} />
              <span>{format(entry.date, 'MMM d, yyyy')}</span>
              <span>•</span>
              <span>{entry.wordCount} words</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-neutral-600 dark:text-dark-600 leading-relaxed">
          {getPreview(entry.content)}
        </p>
      </div>

      {entry.tags.length > 0 && (
        <div className="flex items-center space-x-2">
          <TagIcon size={14} className="text-neutral-400 dark:text-dark-400" />
          <div className="flex flex-wrap gap-1">
            {entry.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {entry.tags.length > 3 && (
              <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-medium">
                +{entry.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};