import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Heart, Sparkles, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Bhargavvz/Momento", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@momento.app", label: "Email" },
  ];

  return (
    <footer className="bg-gradient-to-r from-neutral-50 via-white to-neutral-50 dark:from-dark-100 dark:via-dark-50 dark:to-dark-100 border-t border-neutral-200/50 dark:border-dark-300/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Brand Section */}
          <motion.div 
            className="flex flex-col items-center md:items-start space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <BookOpen className="text-primary-600 dark:text-primary-400" size={28} />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-secondary-500" size={14} />
                </motion.div>
              </div>
              <div>
                <span className="font-bold text-neutral-900 dark:text-dark-900 text-xl">
                  Momento
                </span>
                <div className="text-xs text-neutral-500 dark:text-dark-500 -mt-1">
                  Premium Journaling Experience
                </div>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-dark-600 text-center md:text-left max-w-sm">
              Transform your thoughts into beautiful memories with our intelligent journaling platform.
            </p>
          </motion.div>

          {/* Copyright Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600 dark:text-dark-600">
              <span>© {currentYear} Momento</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex items-center justify-center space-x-1 mt-2 text-xs text-neutral-500 dark:text-dark-500">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="text-red-500 fill-current" size={12} />
              </motion.div>
              <span>by passionate developers</span>
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div 
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-neutral-100 dark:bg-dark-200 text-neutral-600 dark:text-dark-600 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 shadow-soft hover:shadow-soft-md"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Border */}
        <motion.div
          className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-dark-300/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 text-xs text-neutral-500 dark:text-dark-500">
              <Link
                to="/privacy"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                to="/terms"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <span>•</span>
              <Link
                to="/support"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Support
              </Link>
            </div>
            <div className="text-xs text-neutral-500 dark:text-dark-500">
              Version 1.0.0 • Built with React & TypeScript
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
