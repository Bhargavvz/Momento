import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Settings, Download, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useJournal } from '../contexts/JournalContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { entries } = useJournal();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
  const avgWordsPerEntry = entries.length > 0 ? Math.round(totalWords / entries.length) : 0;

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        name: formData.name,
        email: formData.email,
      });
    }
    setIsEditing(false);
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'my-journal-entries.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleExportText = () => {
    let textContent = 'My Journal Entries\n\n';
    entries.forEach((entry, index) => {
      textContent += `Entry ${index + 1}: ${entry.title}\n`;
      textContent += `Date: ${entry.date.toLocaleDateString()}\n`;
      textContent += `Mood: ${entry.mood.emoji} ${entry.mood.label}\n`;
      textContent += `Tags: ${entry.tags.join(', ')}\n`;
      textContent += `Content:\n${entry.content.replace(/<[^>]*>/g, '')}\n\n`;
      textContent += '---\n\n';
    });
    
    const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(textContent);
    const exportFileDefaultName = 'my-journal-entries.txt';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">Profile & Settings</h1>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900">Profile Information</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings size={16} className="mr-1" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-100"
          />
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  icon={<User size={18} className="text-neutral-400" />}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={<Mail size={18} className="text-neutral-400" />}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-neutral-900">{user?.name}</h3>
                <p className="text-neutral-600">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-100"
      >
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Your Writing Stats</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-primary-50 rounded-xl">
            <div className="text-3xl font-bold text-primary-600 mb-2">{entries.length}</div>
            <div className="text-sm text-neutral-600">Total Entries</div>
          </div>
          
          <div className="text-center p-4 bg-accent-50 rounded-xl">
            <div className="text-3xl font-bold text-accent-600 mb-2">{totalWords.toLocaleString()}</div>
            <div className="text-sm text-neutral-600">Words Written</div>
          </div>
          
          <div className="text-center p-4 bg-secondary-50 rounded-xl">
            <div className="text-3xl font-bold text-secondary-600 mb-2">{avgWordsPerEntry}</div>
            <div className="text-sm text-neutral-600">Avg Words/Entry</div>
          </div>
        </div>
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-100"
      >
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Export Your Data</h2>
        <p className="text-neutral-600 mb-6">
          Download your journal entries in different formats to keep them safe or use them elsewhere.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="secondary"
            onClick={handleExportJSON}
            className="flex items-center justify-center"
          >
            <Download size={16} className="mr-2" />
            Export as JSON
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleExportText}
            className="flex items-center justify-center"
          >
            <FileText size={16} className="mr-2" />
            Export as Text
          </Button>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-100"
      >
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-neutral-900">Auto-save</h4>
              <p className="text-sm text-neutral-600">Automatically save your entries while writing</p>
            </div>
            <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-neutral-900">Daily reminders</h4>
              <p className="text-sm text-neutral-600">Get notified to write in your journal</p>
            </div>
            <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-neutral-900">Dark mode</h4>
              <p className="text-sm text-neutral-600">Use dark theme for better night writing</p>
            </div>
            <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};