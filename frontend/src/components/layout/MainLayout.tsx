import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { JournalProvider } from '../../contexts/JournalContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { FloatingActionButton } from './FloatingActionButton';
import { Footer } from './Footer';

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFabClick = () => {
    navigate('/app/editor');
  }

  return (
    <JournalProvider>
      <div className="min-h-screen bg-neutral-50 dark:bg-dark-50 flex flex-col">
        <div className="flex-1">
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <div className="flex">
            <Sidebar
              isOpen={isSidebarOpen}
            />

            <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </main>
          </div>

          <FloatingActionButton onClick={handleFabClick} />
        </div>
        <Footer />
      </div>
    </JournalProvider>
  );
};

export default MainLayout;
