import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await login(email, password);
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h2>
        <p className="text-neutral-600">Sign in to continue your journaling journey</p>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {errors.general}
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        icon={<Mail size={18} className="text-neutral-400" />}
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          icon={<Lock size={18} className="text-neutral-400" />}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
          <span className="ml-2 text-sm text-neutral-600">Remember me</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        disabled={!email || !password}
      >
        Sign In
      </Button>

      <div className="text-center">
        <span className="text-neutral-600">Don't have an account? </span>
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign up
        </button>
      </div>
    </motion.form>
  );
};