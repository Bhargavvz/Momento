import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { JournalProvider } from './contexts/JournalContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { EditorPage } from './pages/EditorPage';
import { CalendarPage } from './pages/CalendarPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { SupportPage } from './pages/SupportPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { FloatingActionButton } from './components/layout/FloatingActionButton';
import { Footer } from './components/layout/Footer';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(!user);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setShowLanding(!user);
  }, [user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  if (showLanding && !user) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'editor':
        return <EditorPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'support':
        return <SupportPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <JournalProvider>
      <div className="min-h-screen bg-neutral-50 dark:bg-dark-50 flex flex-col">
        <div className="flex-1">
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
          <div className="flex">
            <Sidebar 
              isOpen={isSidebarOpen} 
              activeView={activeView} 
              onViewChange={handleViewChange}
            />
            
            <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
              <div className="max-w-7xl mx-auto">
                {renderCurrentView()}
              </div>
            </main>
          </div>

          <FloatingActionButton onClick={() => setActiveView('editor')} />
        </div>
        <Footer onLinkClick={handleViewChange} />
      </div>
    </JournalProvider>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;