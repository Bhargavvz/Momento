import React from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useJournal } from '../contexts/JournalContext';
import { Button } from '../components/ui/Button';

export const CalendarPage: React.FC = () => {
  const { entries } = useJournal();
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEntryForDate = (date: Date) => {
    return entries.find(entry => isSameDay(entry.date, date));
  };

  const getEntriesCountForDate = (date: Date) => {
    return entries.filter(entry => isSameDay(entry.date, date)).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Calendar</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={previousMonth}>
            <ChevronLeft size={16} />
          </Button>
          <h2 className="text-lg font-semibold text-neutral-900 min-w-[200px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-100">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-neutral-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-4">
          {monthDays.map((day, index) => {
            const entry = getEntryForDate(day);
            const entryCount = getEntriesCountForDate(day);
            const today = isToday(day);

            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`
                  relative aspect-square rounded-xl p-2 cursor-pointer transition-all duration-200
                  ${today 
                    ? 'bg-primary-100 ring-2 ring-primary-500' 
                    : entry 
                    ? 'bg-accent-50 hover:bg-accent-100' 
                    : 'bg-neutral-50 hover:bg-neutral-100'
                  }
                `}
              >
                <div className={`text-sm font-medium ${today ? 'text-primary-700' : 'text-neutral-900'}`}>
                  {format(day, 'd')}
                </div>
                
                {entry && (
                  <div className="absolute bottom-1 right-1">
                    <div className={`text-lg ${entry.mood.color}`}>
                      {entry.mood.emoji}
                    </div>
                  </div>
                )}

                {entryCount > 1 && (
                  <div className="absolute top-1 right-1">
                    <div className="w-4 h-4 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                      {entryCount}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-100">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Legend</h3>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-100 rounded border-2 border-primary-500"></div>
            <span className="text-neutral-600">Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent-50 rounded"></div>
            <span className="text-neutral-600">Has entries</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-lg">😊</div>
            <span className="text-neutral-600">Mood indicator</span>
          </div>
        </div>
      </div>
    </div>
  );
};