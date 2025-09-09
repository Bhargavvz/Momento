import React, { createContext, useContext, useState, ReactNode } from 'react';
import { JournalEntry, Tag, MOODS } from '../types';
import { format, subDays, addDays } from 'date-fns';

interface JournalContextType {
  entries: JournalEntry[];
  tags: Tag[];
  currentEntry: JournalEntry | null;
  searchQuery: string;
  selectedTags: string[];
  viewMode: 'timeline' | 'grid';
  isWritingMode: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setViewMode: (mode: 'timeline' | 'grid') => void;
  setWritingMode: (mode: boolean) => void;
  createEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (id: string, entry: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  setCurrentEntry: (entry: JournalEntry | null) => void;
  getFilteredEntries: () => JournalEntry[];
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export { JournalContext };

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

// Generate mock data
const generateMockEntries = (): JournalEntry[] => {
  const entries: JournalEntry[] = [];
  const mockTitles = [
    "A Beautiful Morning",
    "Reflections on Growth",
    "Weekend Adventures",
    "Learning Something New",
    "Gratitude Practice",
    "Challenging Times",
    "Creative Inspiration",
    "Family Moments",
  ];

  const mockTags = ["personal", "work", "family", "travel", "health", "creativity", "goals"];

  for (let i = 0; i < 15; i++) {
    const date = subDays(new Date(), i);
    entries.push({
      id: (i + 1).toString(),
      title: mockTitles[i % mockTitles.length],
      content: `<p>This is a sample journal entry from ${format(date, 'MMMM do, yyyy')}. It contains thoughtful reflections and personal insights.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>`,
      date: date,
      mood: MOODS[i % MOODS.length],
      tags: mockTags.slice(0, Math.floor(Math.random() * 3) + 1),
      createdAt: date,
      updatedAt: date,
      wordCount: Math.floor(Math.random() * 300) + 50,
    });
  }

  return entries;
};

export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>(generateMockEntries);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [isWritingMode, setWritingMode] = useState(false);

  // Generate tags from entries
  const tags: Tag[] = React.useMemo(() => {
    const tagMap = new Map<string, { count: number; color: string }>();
    const colors = ['bg-primary-100', 'bg-secondary-100', 'bg-accent-100', 'bg-pink-100', 'bg-blue-100'];
    
    entries.forEach(entry => {
      entry.tags.forEach(tag => {
        if (tagMap.has(tag)) {
          tagMap.set(tag, { ...tagMap.get(tag)!, count: tagMap.get(tag)!.count + 1 });
        } else {
          tagMap.set(tag, { count: 1, color: colors[Math.floor(Math.random() * colors.length)] });
        }
      });
    });

    return Array.from(tagMap.entries()).map(([name, data]) => ({
      id: name,
      name,
      count: data.count,
      color: data.color,
    }));
  }, [entries]);

  const createEntry = (entryData: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const updateEntry = (id: string, entryData: Partial<JournalEntry>) => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === id 
          ? { ...entry, ...entryData, updatedAt: new Date() }
          : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getFilteredEntries = () => {
    return entries.filter(entry => {
      const matchesSearch = !searchQuery || 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => entry.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  };

  return (
    <JournalContext.Provider value={{
      entries,
      tags,
      currentEntry,
      searchQuery,
      selectedTags,
      viewMode,
      isWritingMode,
      setSearchQuery,
      setSelectedTags,
      setViewMode,
      setWritingMode,
      createEntry,
      updateEntry,
      deleteEntry,
      setCurrentEntry,
      getFilteredEntries,
    }}>
      {children}
    </JournalContext.Provider>
  );
};