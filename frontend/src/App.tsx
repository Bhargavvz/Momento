import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
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
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import { JournalProvider } from './contexts/JournalContext';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // You might want to show a loading spinner here
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/app/dashboard" /> : <LandingPage onGetStarted={() => {}} />} />
      <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/app/dashboard" />} />

      <Route path="/app" element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="editor" element={<EditorPage />} />
          <Route path="editor/:id" element={<EditorPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* Redirect any unknown routes to the dashboard if logged in, or landing page if not */}
      <Route path="*" element={<Navigate to={user ? "/app/dashboard" : "/"} />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <JournalProvider>
            <AppRoutes />
          </JournalProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;