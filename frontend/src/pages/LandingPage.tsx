import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Search, 
  Tag, 
  Moon, 
  Sun,
  ArrowRight,
  Star,
  Users,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTheme } from '../contexts/ThemeContext';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { isDark, toggleTheme } = useTheme();

  const features = [
    {
      icon: BookOpen,
      title: 'Rich Text Editor',
      description: 'Write with a beautiful, distraction-free editor that supports formatting, lists, and more.',
    },
    {
      icon: Calendar,
      title: 'Calendar View',
      description: 'Visualize your journaling journey with an interactive calendar showing your mood patterns.',
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find any entry instantly with powerful search and filtering by tags, mood, or content.',
    },
    {
      icon: Tag,
      title: 'Mood Tracking',
      description: 'Track your emotions with beautiful mood indicators and see patterns over time.',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your thoughts are safe with us. All entries are encrypted and stored securely.',
    },
    {
      icon: Zap,
      title: 'Auto-Save',
      description: 'Never lose your thoughts. Everything is automatically saved as you write.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Writer',
      content: 'Momento has transformed my writing practice. The interface is so intuitive and beautiful.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Student',
      content: 'I love the mood tracking feature. It helps me understand my emotional patterns better.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      name: 'Emma Thompson',
      role: 'Therapist',
      content: 'I recommend Momento to all my clients. The calendar view is particularly helpful.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200">
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <BookOpen className="text-primary-600 dark:text-primary-400" size={32} />
              <span className="font-bold text-neutral-900 dark:text-dark-900 text-2xl">Momento</span>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg text-neutral-600 dark:text-dark-600 hover:text-neutral-900 dark:hover:text-dark-900 hover:bg-neutral-100 dark:hover:bg-dark-100 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              <Button onClick={onGetStarted}>
                Get Started
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-dark-900 mb-6 leading-tight"
          >
            Your Personal
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              {' '}Digital Journal
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-600 dark:text-dark-600 mb-8 leading-relaxed"
          >
            Capture your thoughts, track your moods, and reflect on your journey with our beautiful, 
            intuitive journaling platform designed for daily reflection and personal growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button size="lg" onClick={onGetStarted}>
              Start Journaling Today
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button variant="ghost" size="lg">
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center space-x-8 text-sm text-neutral-500 dark:text-dark-500"
          >
            <div className="flex items-center space-x-1">
              <Star className="text-secondary-500" size={16} />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="text-accent-500" size={16} />
              <span>10k+ users</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="text-primary-500" size={16} />
              <span>Secure & private</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-dark-900 mb-4"
          >
            Everything you need for mindful journaling
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-dark-600"
          >
            Powerful features designed to enhance your writing and reflection experience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-neutral-100 dark:border-dark-200"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-dark-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-dark-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-dark-900 mb-4"
          >
            Loved by writers everywhere
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600 dark:text-dark-600"
          >
            See what our community has to say about their journaling experience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-soft border border-neutral-100 dark:border-dark-200"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-secondary-500 fill-current" size={16} />
                ))}
              </div>
              <p className="text-neutral-700 dark:text-dark-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-neutral-900 dark:text-dark-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-dark-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start your journaling journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of writers who have made Momento their digital sanctuary
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-white text-primary-600 hover:bg-neutral-100"
          >
            Get Started for Free
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-dark-200 bg-white dark:bg-dark-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="text-primary-600 dark:text-primary-400" size={24} />
              <span className="font-semibold text-neutral-900 dark:text-dark-900">Momento</span>
            </div>
            <div className="text-sm text-neutral-600 dark:text-dark-600">
              © 2025 Momento. Made with ❤️ for writers everywhere.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};