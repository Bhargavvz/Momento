import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Gavel, AlertTriangle, Mail, Phone } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: (
        <div className="space-y-4 text-neutral-600 dark:text-dark-600">
          <p>
            By accessing and using Momento, you accept and agree to be bound by the terms and 
            provision of this agreement. These Terms of Service govern your use of our journaling platform.
          </p>
          <p>
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>
      )
    },
    {
      title: "User Responsibilities",
      icon: Users,
      content: (
        <div className="space-y-4 text-neutral-600 dark:text-dark-600">
          <p>As a user of Momento, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide accurate and complete information when creating your account</li>
            <li>Maintain the security of your password and account</li>
            <li>Use the service only for lawful purposes</li>
            <li>Respect the intellectual property rights of others</li>
            <li>Not attempt to interfere with or disrupt the service</li>
            <li>Not share your account credentials with others</li>
          </ul>
        </div>
      )
    },
    {
      title: "Content Ownership",
      icon: Gavel,
      content: (
        <div className="space-y-4 text-neutral-600 dark:text-dark-600">
          <p>
            You retain full ownership and control over the content you create on Momento:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your journal entries remain your intellectual property</li>
            <li>We do not claim any ownership rights to your content</li>
            <li>You can export or delete your content at any time</li>
            <li>We may use aggregated, anonymized data for service improvement</li>
          </ul>
        </div>
      )
    },
    {
      title: "Service Availability",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4 text-neutral-600 dark:text-dark-600">
          <p>
            While we strive to provide reliable service, we cannot guarantee uninterrupted access:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Service may be temporarily unavailable for maintenance</li>
            <li>We are not liable for any data loss or service interruptions</li>
            <li>Regular backups are recommended for important content</li>
            <li>We reserve the right to modify or discontinue features</li>
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
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-900">Terms of Service</h1>
            <p className="text-neutral-600 dark:text-dark-600">Last updated: September 10, 2025</p>
          </div>
        </div>
        
        <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-6 border border-accent-200/50 dark:border-accent-700/50">
          <p className="text-neutral-700 dark:text-dark-700">
            Welcome to Momento! These terms and conditions outline the rules and regulations for the use of 
            our journaling platform. By using our service, you agree to these terms.
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

      {/* Legal Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-warning-50 dark:bg-warning-900/20 rounded-2xl p-6 border border-warning-200/50 dark:border-warning-700/50"
      >
        <h3 className="text-lg font-semibold text-warning-800 dark:text-warning-300 mb-4">
          Important Legal Information
        </h3>
        <p className="text-warning-700 dark:text-warning-400 mb-4">
          These terms may be updated from time to time. Continued use of the service after changes 
          constitutes acceptance of the new terms. For questions about these terms, please contact us:
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="text-warning-600" size={16} />
            <span className="text-sm text-warning-700 dark:text-warning-400">legal@momento.app</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="text-warning-600" size={16} />
            <span className="text-sm text-warning-700 dark:text-warning-400">+1 (555) 123-4567</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
