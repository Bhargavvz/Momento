import React from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, List, X } from 'lucide-react';
import { useJournal } from '../../contexts/JournalContext';
import { Input } from '../ui/Input';

export const SearchAndFilter: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    tags,
    viewMode,
    setViewMode,
  } = useJournal();

  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(t => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const hasFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search your entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} className="text-neutral-400" />}
          />
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('timeline')}
            className={`
              p-2 rounded-lg transition-colors
              ${viewMode === 'timeline' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }
            `}
          >
            <List size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`
              p-2 rounded-lg transition-colors
              ${viewMode === 'grid' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }
            `}
          >
            <Grid size={20} />
          </motion.button>

          {hasFilters && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="p-2 rounded-lg text-neutral-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <X size={20} />
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <motion.button
            key={tag.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleTag(tag.name)}
            className={`
              px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${selectedTags.includes(tag.name)
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }
            `}
          >
            {tag.name} ({tag.count})
          </motion.button>
        ))}
      </div>
    </div>
  );
};