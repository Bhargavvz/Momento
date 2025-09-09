import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MOODS, JournalEntry } from '../types';
import { useJournal } from '../contexts/JournalContext';
import { RichTextEditor } from '../components/journal/RichTextEditor';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const EditorPage: React.FC = () => {
  const { createEntry, updateEntry, currentEntry, isWritingMode, setWritingMode } = useJournal();
  
  const [title, setTitle] = useState(currentEntry?.title || '');
  const [content, setContent] = useState(currentEntry?.content || '');
  const [selectedMood, setSelectedMood] = useState(currentEntry?.mood || MOODS[0]);
  const [tags, setTags] = useState(currentEntry?.tags.join(', ') || '');

  const handleSave = () => {
    const entryData = {
      title: title || format(new Date(), "EEEE, MMMM do"),
      content,
      date: new Date(),
      mood: selectedMood,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      wordCount: content.replace(/<[^>]*>/g, '').split(' ').filter(Boolean).length,
    };

    if (currentEntry) {
      updateEntry(currentEntry.id, entryData);
    } else {
      createEntry(entryData);
    }

    alert('Entry saved successfully!');
  };

  return (
    <div className="space-y-6">
      {!isWritingMode && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900">
              {currentEntry ? 'Edit Entry' : 'New Entry'}
            </h1>
            <div className="text-sm text-neutral-500">
              {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Input
                placeholder="Entry title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  How are you feeling?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {MOODS.map((mood) => (
                    <motion.button
                      key={mood.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMood(mood)}
                      className={`
                        p-3 rounded-xl text-center transition-all
                        ${selectedMood.label === mood.label
                          ? 'bg-primary-100 ring-2 ring-primary-500'
                          : 'bg-neutral-50 hover:bg-neutral-100'
                        }
                      `}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs font-medium text-neutral-600">
                        {mood.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <RichTextEditor
        content={content}
        onChange={setContent}
        onSave={handleSave}
        isWritingMode={isWritingMode}
        onToggleWritingMode={() => setWritingMode(!isWritingMode)}
      />
    </div>
  );
};