import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageCircle, 
  Book, 
  Bug, 
  Lightbulb,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const SupportPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the form data to your backend
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const supportCategories = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of using Momento",
      topics: ["Creating your first entry", "Setting up your profile", "Understanding the dashboard"]
    },
    {
      title: "Account & Settings",
      icon: HelpCircle,
      description: "Manage your account and preferences",
      topics: ["Password reset", "Account settings", "Privacy controls", "Data export"]
    },
    {
      title: "Technical Issues",
      icon: Bug,
      description: "Report bugs or technical problems",
      topics: ["App not loading", "Sync issues", "Performance problems"]
    },
    {
      title: "Feature Requests",
      icon: Lightbulb,
      description: "Suggest new features or improvements",
      topics: ["New functionality", "UI improvements", "Integration requests"]
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@momento.app",
      response: "Within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 9 AM - 6 PM EST",
      response: "Immediate"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      response: "During business hours"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl text-white">
            <HelpCircle size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-900">Support Center</h1>
            <p className="text-neutral-600 dark:text-dark-600">How can we help you today?</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Support Categories */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-dark-900 mb-6">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {supportCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-dark-100 rounded-2xl shadow-soft border border-neutral-200/50 dark:border-dark-300/50 p-6 hover:shadow-soft-md transition-all duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                        <Icon className="text-primary-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-dark-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-dark-600 mb-3">
                          {category.description}
                        </p>
                        <ul className="space-y-1">
                          {category.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="text-xs text-neutral-500 dark:text-dark-500">
                              • {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-100 rounded-2xl shadow-soft border border-neutral-200/50 dark:border-dark-300/50 p-6"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-dark-900 mb-6">
              Send us a Message
            </h2>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="text-success-600 mx-auto mb-4" size={48} />
                <h3 className="text-lg font-semibold text-success-700 dark:text-success-400 mb-2">
                  Message Sent!
                </h3>
                <p className="text-neutral-600 dark:text-dark-600">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                      Category
                    </label>
                    <select
                      value={contactForm.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="general">General Support</option>
                      <option value="technical">Technical Issue</option>
                      <option value="feature">Feature Request</option>
                      <option value="billing">Billing Question</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-dark-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-dark-300 bg-white dark:bg-dark-100 text-neutral-900 dark:text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Please describe your issue or question in detail..."
                  />
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  <Send size={20} className="mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Contact Methods */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-dark-900 mb-6">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.title}
                    className="bg-white dark:bg-dark-100 rounded-2xl shadow-soft border border-neutral-200/50 dark:border-dark-300/50 p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-accent-50 dark:bg-accent-900/20 rounded-xl">
                        <Icon className="text-accent-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-dark-900 mb-1">
                          {method.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-dark-600 mb-2">
                          {method.description}
                        </p>
                        <p className="text-sm font-medium text-primary-600 mb-1">
                          {method.contact}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} className="text-neutral-400" />
                          <span className="text-xs text-neutral-500 dark:text-dark-500">
                            {method.response}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FAQ Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-6 border border-primary-200/50 dark:border-primary-700/50"
            >
              <h3 className="font-semibold text-neutral-900 dark:text-dark-900 mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-sm text-neutral-600 dark:text-dark-600 mb-4">
                Check out our FAQ section for quick answers to common questions.
              </p>
              <Button variant="outline" size="sm">
                View FAQ
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
