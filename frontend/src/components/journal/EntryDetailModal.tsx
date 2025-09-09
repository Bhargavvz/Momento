import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  FileText, 
  Edit3, 
  Trash2, 
  Heart,
  Share2,
  Download,
  Tag,
  MapPin
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/Button';

interface Entry {
  id: string;
  title: string;
  content: string;
  date: Date;
  wordCount: number;
  tags?: string[];
  mood?: string;
  location?: string;
  weather?: string;
}

interface EntryDetailModalProps {
  entry: Entry;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (entry: Entry) => void;
  onDelete?: (entryId: string) => void;
}

export const EntryDetailModal: React.FC<EntryDetailModalProps> = ({
  entry,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!isOpen) return null;

  const handleEdit = () => {
    onEdit?.(entry);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDelete?.(entry.id);
      onClose();
    }
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.share?.({
      title: entry.title,
      text: entry.content.substring(0, 100) + '...',
    });
  };

  const handleDownload = () => {
    // Create downloadable text file
    const element = document.createElement('a');
    const file = new Blob([`${entry.title}\n\n${entry.content}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${entry.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-dark-100 rounded-3xl shadow-2xl border border-neutral-200/50 dark:border-dark-300/50 w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200/50 dark:border-dark-300/50 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white dark:bg-dark-100 rounded-2xl shadow-soft">
              <FileText className="text-primary-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-dark-900">
                {entry.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-dark-600">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{format(entry.date, 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{format(entry.date, 'h:mm a')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText size={14} />
                  <span>{entry.wordCount} words</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-600' 
                  : 'bg-neutral-100 dark:bg-dark-200 text-neutral-500 hover:text-red-500'
              }`}
            >
              <Heart size={20} className={isLiked ? 'fill-current' : ''} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-3 rounded-xl bg-neutral-100 dark:bg-dark-200 text-neutral-500 hover:text-neutral-700 dark:hover:text-dark-700 transition-all duration-200"
            >
              <X size={20} />
            </motion.button>
          </div>
        </div>

        {/* Metadata */}
        {(entry.tags || entry.mood || entry.location) && (
          <div className="p-6 bg-neutral-50 dark:bg-dark-200/50 border-b border-neutral-200/50 dark:border-dark-300/50">
            <div className="flex flex-wrap items-center gap-4">
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="text-neutral-500" size={16} />
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {entry.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="text-neutral-500" size={16} />
                  <span className="text-sm text-neutral-600 dark:text-dark-600">{entry.location}</span>
                </div>
              )}
              
              {entry.mood && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{entry.mood}</span>
                  <span className="text-sm text-neutral-600 dark:text-dark-600">Mood</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: '60vh' }}>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="text-neutral-700 dark:text-dark-700 leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-200/50 dark:border-dark-300/50 bg-neutral-50 dark:bg-dark-200/50">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 size={16} />
              <span>Share</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Download</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex items-center space-x-2"
            >
              <Edit3 size={16} />
              <span>Edit</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="flex items-center space-x-2 text-error-600 border-error-300 hover:bg-error-50"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
