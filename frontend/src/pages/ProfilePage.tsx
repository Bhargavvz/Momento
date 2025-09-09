import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  FileText, 
  TrendingUp,
  Award,
  Clock,
  Target,
  Edit2,
  Save,
  X,
  Camera,
  Download,
  Share2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useJournal } from '../contexts/JournalContext';
import { Button } from '../components/ui/Button';
import { format } from 'date-fns';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { entries } = useJournal();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.displayName || 'John Doe',
    email: user?.email || 'john@example.com',
    bio: 'Passionate writer exploring the depths of creativity and self-expression.',
    location: 'San Francisco, CA',
    joinedDate: 'January 2025',
    dailyGoal: 500,
    favoriteGenre: 'Creative Writing'
  });

  // Calculate statistics
  const totalEntries = entries.length;
  const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
  const avgWordsPerEntry = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0;
  const longestEntry = entries.reduce((max, entry) => 
    entry.wordCount > max ? entry.wordCount : max, 0);
  const currentStreak = 7; // This would be calculated based on consecutive days
  const bestMonth = 'September 2025'; // This would be calculated

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'momento-journal-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const stats = [
    {
      title: 'Total Entries',
      value: totalEntries,
      icon: FileText,
      color: 'text-primary-600',
      bg: 'bg-primary-50 dark:bg-primary-900/20'
    },
    {
      title: 'Words Written',
      value: totalWords.toLocaleString(),
      icon: TrendingUp,
      color: 'text-accent-600',
      bg: 'bg-accent-50 dark:bg-accent-900/20'
    },
    {
      title: 'Avg Words/Entry',
      value: avgWordsPerEntry,
      icon: Target,
      color: 'text-success-600',
      bg: 'bg-success-50 dark:bg-success-900/20'
    },
    {
      title: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Award,
      color: 'text-warning-600',
      bg: 'bg-warning-50 dark:bg-warning-900/20'
    }
  ];

  const achievements = [
    {
      title: 'First Entry',
      description: 'Wrote your first journal entry',
      icon: '🎉',
      earned: true,
      date: 'Jan 15, 2025'
    },
    {
      title: 'Word Master',
      description: 'Wrote 10,000+ words',
      icon: '📝',
      earned: totalWords >= 10000,
      date: totalWords >= 10000 ? 'Mar 3, 2025' : null
    },
    {
      title: 'Consistent Writer',
      description: 'Write for 7 consecutive days',
      icon: '🔥',
      earned: currentStreak >= 7,
      date: currentStreak >= 7 ? 'Sep 8, 2025' : null
    },
    {
      title: 'Century Club',
      description: 'Write 100 journal entries',
      icon: '💯',
      earned: totalEntries >= 100,
      date: totalEntries >= 100 ? 'Aug 20, 2025' : null
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl text-white">
            <User size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-900">Profile</h1>
            <p className="text-neutral-600 dark:text-dark-600">Manage your account and view your writing journey</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Share2 size={16} className="mr-2" />
            Share Profile
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-dark-100 rounded-2xl shadow-soft border border-neutral-200/50 dark:border-dark-300/50 p-6">
            {/* Profile Picture */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profileData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-dark-100 rounded-full shadow-soft border border-neutral-200 dark:border-dark-300 hover:bg-neutral-50 dark:hover:bg-dark-200 transition-colors">
                  <Camera size={14} className="text-neutral-600 dark:text-dark-600" />
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="primary" size="sm" onClick={handleSave}>
                      <Save size={14} className="mr-1" />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCancel}>
                      <X size={14} className="mr-1" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-dark-900 mb-1">
                      {profileData.name}
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-dark-600 mb-3">
                      {profileData.bio}
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 size={14} className="mr-1" />
                      Edit Profile
                    </Button>
                  </div>

                  <div className="border-t border-neutral-200/50 dark:border-dark-300/50 pt-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-neutral-500 dark:text-dark-500" size={16} />
                      <span className="text-sm text-neutral-700 dark:text-dark-700">{profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-neutral-500 dark:text-dark-500" size={16} />
                      <span className="text-sm text-neutral-700 dark:text-dark-700">Joined {profileData.joinedDate}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Target className="text-neutral-500 dark:text-dark-500" size={16} />
                      <span className="text-sm text-neutral-700 dark:text-dark-700">Daily goal: {profileData.dailyGoal} words</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats and Achievements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Writing Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-900 mb-4">
              Writing Statistics
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.title}
                    className="bg-white dark:bg-dark-100 rounded-xl shadow-soft border border-neutral-200/50 dark:border-dark-300/50 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${stat.bg}`}>
                        <Icon className={stat.color} size={16} />
                      </div>
                    </div>
                    <p className="text-xl font-bold text-neutral-900 dark:text-dark-900">{stat.value}</p>
                    <p className="text-xs text-neutral-600 dark:text-dark-600">{stat.title}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-100 rounded-2xl shadow-soft border border-neutral-200/50 dark:border-dark-300/50 p-6"
          >
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-900 mb-4">
              Achievements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-700/50'
                      : 'bg-neutral-50 dark:bg-dark-200/50 border-neutral-200 dark:border-dark-300/50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        achievement.earned
                          ? 'text-success-800 dark:text-success-200'
                          : 'text-neutral-700 dark:text-dark-700'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${
                        achievement.earned
                          ? 'text-success-600 dark:text-success-400'
                          : 'text-neutral-600 dark:text-dark-600'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-success-500 dark:text-success-400 mt-1">
                          Earned on {achievement.date}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-dark-100 rounded-2xl shadow-soft border border-neutral-200/50 dark:border-dark-300/50 p-6"
          >
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {entries.slice(0, 5).map((entry, index) => (
                <div key={entry.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-dark-200/50 transition-colors">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <FileText className="text-primary-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-900 dark:text-dark-900 text-sm">
                      {entry.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-dark-600">
                      {format(entry.date, 'MMM dd, yyyy • h:mm a')} • {entry.wordCount} words
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
