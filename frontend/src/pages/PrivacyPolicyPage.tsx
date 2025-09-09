import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, Eye, Database, Mail, Phone } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: (
        <div className="space-y-4 text-neutral-600 dark:text-dark-600">
          <p>
            We collect information you provide directly to us, such as when you create an account, 
            write journal entries, or contact us for support.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Account information (email address, username)</li>
            <li>Journal entries and personal writing</li>
            <li>Usage data and preferences</li>
            <li>Communication history with our support team</li>
          </ul>
        </div>
      )
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: (
        <div className="space-y-4 text-neutral-600 dark:text-dark-600">
          <p>
            We use the information we collect to provide, maintain, and improve our services:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To provide and operate the Momento journaling platform</li>
            <li>To personalize your writing experience</li>
            <li>To communicate with you about updates and features</li>
            <li>To analyze usage patterns and improve our services</li>
            <li>To ensure the security and integrity of our platform</li>
          </ul>
        </div>
      )
    },
    {
      title: "Data Security",
      icon: Shield,
      content: (
        <div className="space-y-4 text-neutral-600 dark:text-dark-600">
          <p>
            We implement appropriate security measures to protect your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>End-to-end encryption for all journal entries</li>
            <li>Secure data transmission using SSL/TLS protocols</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Limited access to personal data on a need-to-know basis</li>
          </ul>
        </div>
      )
    },
    {
      title: "Data Retention",
      icon: Calendar,
      content: (
        <div className="space-y-4 text-neutral-600 dark:text-dark-600">
          <p>
            We retain your information for as long as necessary to provide our services:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Account data is retained until you delete your account</li>
            <li>Journal entries are kept indefinitely unless you delete them</li>
            <li>Usage data may be retained for up to 2 years for analytics</li>
            <li>Communication records are kept for 3 years for support purposes</li>
          </ul>
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
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl text-white">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-900">Privacy Policy</h1>
            <p className="text-neutral-600 dark:text-dark-600">Last updated: September 10, 2025</p>
          </div>
        </div>
        
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-200/50 dark:border-primary-700/50">
          <p className="text-neutral-700 dark:text-dark-700">
            At Momento, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, and protect your personal information when you use our journaling platform.
          </p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => {
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
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-dark-900">
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

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-neutral-50 dark:bg-dark-200/50 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-900 mb-4">
          Questions About Privacy?
        </h3>
        <p className="text-neutral-600 dark:text-dark-600 mb-4">
          If you have any questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="text-primary-600" size={16} />
            <span className="text-sm text-neutral-700 dark:text-dark-700">privacy@momento.app</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="text-primary-600" size={16} />
            <span className="text-sm text-neutral-700 dark:text-dark-700">+1 (555) 123-4567</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
