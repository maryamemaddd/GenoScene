import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastProvider } from './components/common/Toast';
import { HomePage } from './pages/HomePage';
import { AnalysisPage } from './pages/AnalysisPage';
import { LearningPage } from './pages/LearningPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'analysis' | 'learning' | 'about'>('home');

  const navigateTo = (page: 'home' | 'analysis' | 'learning' | 'about') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplore = () => {
    const workflowEl = document.getElementById('workflow-section');
    if (workflowEl) {
      workflowEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('about');
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">

        <Navbar
          activeTab={currentPage}
          onNavigate={navigateTo}
        />

        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onStartAnalysis={() => navigateTo('analysis')}
              onExplore={handleExplore}
              onLearnMore={() => navigateTo('learning')}
            />
          )}

          {currentPage === 'analysis' && (
            <AnalysisPage />
          )}

          {currentPage === 'learning' && (
            <LearningPage />
          )}

          {currentPage === 'about' && (
            <AboutPage />
          )}
        </main>

        <Footer onNavigate={navigateTo} />
      </div>
    </ToastProvider>
  );
}

