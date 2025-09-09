import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useJournal } from '../contexts/JournalContext';
import { JournalEntry } from '../types';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { EntryCard } from '../components/journal/EntryCard';
import { EntryDetailModal } from '../components/journal/EntryDetailModal';

export const CalendarPage: React.FC = () => {
  const { entries, getFilteredEntries } = useJournal();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
  };

  const handleEntryClick = (entry: JournalEntry) => {
    setSelectedEntry(entry);
  };

  const handleCloseModal = () => {
    setSelectedEntry(null);
  };

  const entriesForSelectedDay = selectedDay
    ? getFilteredEntries().filter(entry => format(entry.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd'))
    : [];

  const modifiers = {
    highlighted: entries.map(entry => entry.date),
  };

  const modifiersStyles = {
    highlighted: {
      border: '2px solid #8B5CF6',
      color: '#8B5CF6',
      backgroundColor: '#F5F3FF',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-dark-100 rounded-2xl shadow-soft p-4">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="w-full"
          />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-900 mb-4">
            {selectedDay ? format(selectedDay, 'MMMM dd, yyyy') : 'Select a day'}
          </h2>
          <div className="space-y-4">
            {entriesForSelectedDay.length > 0 ? (
              entriesForSelectedDay.map(entry => (
                <EntryCard key={entry.id} entry={entry} onClick={() => handleEntryClick(entry)} />
              ))
            ) : (
              <p className="text-neutral-500 dark:text-dark-500">No entries for this day.</p>
            )}
          </div>
        </div>
      </div>

      {selectedEntry && (
        <EntryDetailModal
          entry={selectedEntry}
          isOpen={!!selectedEntry}
          onClose={handleCloseModal}
        />
      )}
    </motion.div>
  );
};

export default CalendarPage;
