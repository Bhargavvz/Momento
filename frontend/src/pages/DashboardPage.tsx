import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Grid, List, Plus } from 'lucide-react';
import { useJournal } from '../contexts/JournalContext';
import { EntryCard } from '../components/journal/EntryCard';
import { SearchAndFilter } from '../components/journal/SearchAndFilter';
import { Button } from '../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const { 
    getFilteredEntries, 
    viewMode, 
    setViewMode, 
    setCurrentEntry,
    entries 
  } = useJournal();

  const filteredEntries = getFilteredEntries();
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleEntryClick = (entry: any) => {
    setCurrentEntry(entry);
    setSelectedEntry(entry);
  };

  const totalEntries = entries.length;
  const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
  const thisWeekEntries = entries.filter(entry => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entry.date >= weekAgo;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-900 mb-2">
            Welcome back to Momento
          </h1>
          <p className="text-neutral-600 dark:text-dark-600">
            {format(new Date(), "EEEE, MMMM do, yyyy")}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-neutral-100 dark:bg-dark-100 rounded-lg p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'timeline' 
                  ? 'bg-white dark:bg-dark-50 text-primary-600 dark:text-primary-400 shadow-soft' 
                  : 'text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900'
              }`}
            >
              <List size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-dark-50 text-primary-600 dark:text-primary-400 shadow-soft' 
                  : 'text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900'
              }`}
            >
              <Grid size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-soft border border-neutral-100 dark:border-dark-200"
        >
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-900 mb-2">
            Total Entries
          </h3>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {totalEntries}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-soft border border-neutral-100 dark:border-dark-200"
        >
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-900 mb-2">
            Words Written
          </h3>
          <p className="text-3xl font-bold text-accent-600 dark:text-accent-400">
            {totalWords.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-soft border border-neutral-100 dark:border-dark-200"
        >
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-900 mb-2">
            This Week
          </h3>
          <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">
            {thisWeekEntries}
          </p>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <SearchAndFilter />

      {/* Entries */}
      <div className="space-y-6">
        {filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-neutral-100 dark:bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={24} className="text-neutral-400 dark:text-dark-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-dark-900 mb-2">
              No entries found
            </h3>
            <p className="text-neutral-600 dark:text-dark-600 mb-6">
              Start your journaling journey by creating your first entry.
            </p>
            <Button onClick={() => window.location.hash = '#editor'}>
              Create First Entry
            </Button>
          </motion.div>
        ) : (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }
          `}>
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <EntryCard
                  entry={entry}
                  variant={viewMode}
                  onClick={() => handleEntryClick(entry)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};