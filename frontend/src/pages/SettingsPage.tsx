import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  Mail, 
  Smartphone, 
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    daily: true,
    weekly: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || 'John Doe',
    email: user?.email || 'john@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    bio: 'Passionate writer exploring the depths of creativity.',
    dailyGoal: 500,
    timezone: 'UTC-08:00'
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const settingSections = [
    {
      title: 'Profile Settings',
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
              Daily Writing Goal (words)
            </label>
            <input
              type="number"
              value={formData.dailyGoal}
              onChange={(e) => handleInputChange('dailyGoal', parseInt(e.target.value))}
              min="100"
              max="10000"
              step="50"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Security & Privacy',
      icon: Lock,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Notifications',
      icon: Bell,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            {Object.entries({
              email: 'Email notifications for new features',
              push: 'Push notifications on mobile',
              daily: 'Daily writing reminders',
              weekly: 'Weekly progress reports'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-dark-700">{label}</span>
                <button
                  onClick={() => handleNotificationChange(key, !notifications[key as keyof typeof notifications])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    notifications[key as keyof typeof notifications] 
                      ? 'bg-primary-600' 
                      : 'bg-neutral-300 dark:bg-dark-400'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      notifications[key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Appearance',
      icon: isDark ? Moon : Sun,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-neutral-700 dark:text-dark-700">Dark Mode</h4>
              <p className="text-xs text-neutral-500 dark:text-dark-500">Switch between light and dark themes</p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                isDark ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-dark-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
              Timezone
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="UTC-12:00">UTC-12:00 Baker Island</option>
              <option value="UTC-08:00">UTC-08:00 Pacific Time</option>
              <option value="UTC-05:00">UTC-05:00 Eastern Time</option>
              <option value="UTC+00:00">UTC+00:00 Greenwich Mean Time</option>
              <option value="UTC+05:30">UTC+05:30 India Standard Time</option>
              <option value="UTC+09:00">UTC+09:00 Japan Standard Time</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: 'Data & Storage',
      icon: Download,
      content: (
        <div className="space-y-6">
          <div className="bg-neutral-50 dark:bg-dark-200/50 rounded-xl p-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">Export Your Data</h4>
            <p className="text-xs text-neutral-500 dark:text-dark-500 mb-4">
              Download all your journal entries and data in JSON format
            </p>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export Data
            </Button>
          </div>
          
          <div className="bg-error-50 dark:bg-error-900/20 rounded-xl p-6 border border-error-200 dark:border-error-800">
            <h4 className="text-sm font-medium text-error-700 dark:text-error-400 mb-2">Danger Zone</h4>
            <p className="text-xs text-error-600 dark:text-error-500 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="outline" size="sm" className="text-error-600 border-error-300 hover:bg-error-50">
              <Trash2 size={16} className="mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl text-white">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-900">Settings</h1>
            <p className="text-neutral-600 dark:text-dark-600">Manage your account preferences and settings</p>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-100 rounded-2xl shadow-soft border border-neutral-200/50 dark:border-dark-300/50 overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-200/50 dark:border-dark-300/50">
                <div className="flex items-center space-x-3">
                  <Icon className="text-primary-600" size={20} />
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-dark-900">
                    {section.title}
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                {section.content}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex justify-end"
      >
        <Button variant="gradient" size="lg">
          <Save size={20} className="mr-2" />
          Save Changes
        </Button>
      </motion.div>
    </div>
  );
};
