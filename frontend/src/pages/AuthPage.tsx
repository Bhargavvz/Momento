import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      await resetPassword(resetEmail);
      alert('Password reset email sent!');
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error) {
      alert('Error sending reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-100 rounded-2xl shadow-soft-lg p-8 border border-neutral-100 dark:border-dark-200"
        >
          <div className="text-center mb-8">
            <motion.div 
              className="inline-flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="text-primary-600 dark:text-primary-400" size={32} />
              <span className="font-bold text-neutral-900 dark:text-dark-900 text-2xl">Momento</span>
            </motion.div>
          </div>

          {isLogin ? (
            <LoginForm
              onSwitchToSignup={() => setIsLogin(false)}
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500 dark:text-dark-500 mb-4">
            Experience the beauty of daily reflection and personal growth
          </p>
          <div className="flex justify-center space-x-8 text-xs text-neutral-400 dark:text-dark-400">
            <span>✨ Rich Text Editor</span>
            <span>📅 Calendar View</span>
            <span>🏷️ Smart Tags</span>
            <span>😊 Mood Tracking</span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        title="Reset Password"
      >
        <div className="space-y-4">
          <p className="text-neutral-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <Input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => setShowForgotPassword(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleForgotPassword}
              isLoading={isLoading}
              disabled={!resetEmail}
              className="flex-1"
            >
              Send Reset Link
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};