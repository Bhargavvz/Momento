import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Grid, List, Plus, TrendingUp, Clock, Target, Zap } from 'lucide-react';
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

  const handleEntryClick = (entry: any) => {
    setCurrentEntry(entry);
  };

  const totalEntries = entries.length;
  const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
  const thisWeekEntries = entries.filter(entry => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entry.date >= weekAgo;
  }).length;

  const avgWordsPerEntry = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0;

  const stats = [
    {
      title: "Total Entries",
      value: totalEntries,
      icon: Target,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50 dark:bg-primary-900/20",
      iconColor: "text-primary-600 dark:text-primary-400"
    },
    {
      title: "Words Written",
      value: totalWords.toLocaleString(),
      icon: TrendingUp,
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50 dark:bg-accent-900/20",
      iconColor: "text-accent-600 dark:text-accent-400"
    },
    {
      title: "This Week",
      value: thisWeekEntries,
      icon: Clock,
      color: "from-success-500 to-success-600",
      bgColor: "bg-success-50 dark:bg-success-900/20",
      iconColor: "text-success-600 dark:text-success-400"
    },
    {
      title: "Avg Words/Entry",
      value: avgWordsPerEntry,
      icon: Zap,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50 dark:bg-secondary-900/20",
      iconColor: "text-secondary-600 dark:text-secondary-400"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-100 dark:via-dark-50 dark:to-dark-100 rounded-3xl p-8 border border-neutral-200/50 dark:border-dark-300/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-dark-900 dark:to-dark-700 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome back to Momento
            </motion.h1>
            <motion.p 
              className="text-neutral-600 dark:text-dark-600 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {format(new Date(), "EEEE, MMMM do, yyyy")}
            </motion.p>
          </div>
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center bg-white/80 dark:bg-dark-100/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-soft border border-neutral-200/50 dark:border-dark-300/50">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('timeline')}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === 'timeline' 
                    ? 'bg-primary-600 text-white shadow-soft' 
                    : 'text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900 hover:bg-neutral-100 dark:hover:bg-dark-200'
                }`}
              >
                <List size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-primary-600 text-white shadow-soft' 
                    : 'text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900 hover:bg-neutral-100 dark:hover:bg-dark-200'
                }`}
              >
                <Grid size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary-200/30 to-success-200/30 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative overflow-hidden bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg border border-neutral-200/50 dark:border-dark-300/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={stat.iconColor} size={24} />
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full opacity-10 absolute -top-2 -right-2`}></div>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-neutral-900 dark:text-dark-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-600 dark:text-dark-600">
                  {stat.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <SearchAndFilter />
      </motion.div>

      {/* Entries Section */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl flex items-center justify-center mx-auto">
                <Plus size={32} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-dark-900 mb-3">
              No entries found
            </h3>
            <p className="text-neutral-600 dark:text-dark-600 mb-8 max-w-md mx-auto">
              Start your journaling journey by creating your first entry. Share your thoughts, track your mood, and build lasting memories.
            </p>
            <Button 
              onClick={() => window.location.hash = '#editor'}
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-3 rounded-2xl shadow-soft-lg"
            >
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
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
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
      </motion.div>
    </div>
  );
};
