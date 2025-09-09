export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    defaultView: 'timeline' | 'grid';
    autoSave: boolean;
  };
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood: Mood;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  wordCount: number;
}

export interface Mood {
  emoji: string;
  label: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  count: number;
}

export const MOODS: Mood[] = [
  { emoji: '😊', label: 'Happy', color: 'text-accent-500' },
  { emoji: '😢', label: 'Sad', color: 'text-blue-500' },
  { emoji: '😠', label: 'Angry', color: 'text-red-500' },
  { emoji: '😰', label: 'Anxious', color: 'text-orange-500' },
  { emoji: '😴', label: 'Tired', color: 'text-purple-500' },
  { emoji: '🤗', label: 'Grateful', color: 'text-pink-500' },
  { emoji: '🤔', label: 'Thoughtful', color: 'text-indigo-500' },
  { emoji: '😌', label: 'Peaceful', color: 'text-green-500' },
];