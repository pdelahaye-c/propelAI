import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TrustedBy } from './components/TrustedBy';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ROICalculator } from './components/ROICalculator';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { User } from './types';

type ViewState = 'landing' | 'login' | 'dashboard';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('propel_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('dashboard');
    }
  }, []);

  const handleLoginClick = () => {
    setView('login');
  };

  const handleLoginSubmit = (email: string) => {
    // Backend Simulation: Create a session
    const mockUser = {
        email: email,
        name: "Paul-Arthur Delahaye" // Hardcoded for the demo experience
    };
    setUser(mockUser);
    localStorage.setItem('propel_user', JSON.stringify(mockUser));
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('propel_user');
    setView('landing');
  };

  const handleLoginCancel = () => {
    setView('landing');
  };

  // 1. Dashboard View
  if (view === 'dashboard' && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // 2. Landing Page View (with optional Login Modal)
  return (
    <div className="bg-[#0E0E10] min-h-screen text-white overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200 relative">
      
      <Header onLoginClick={handleLoginClick} />
      
      <Hero />
      <TrustedBy />
      <Features />
      <ROICalculator />
      <Pricing />
      <FAQ />
      
      {/* CTA Section */}
      <section className="py-32 px-6 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] to-[#1a1a23]"></div>
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
               Ready to automate your <br/>
               <span className="text-gradient">agency's growth?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
               Join 400+ real estate agencies using Propel to capture every lead, 24/7. Set up your AI agent in minutes.
            </p>
            <button className="px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105">
               Start Free Trial
            </button>
            <p className="mt-6 text-sm text-gray-500">No credit card required. 14-day free trial.</p>
         </div>
      </section>

      <Footer />


      {/* Login Modal Overlay */}
      {view === 'login' && (
        <Login onLogin={handleLoginSubmit} onCancel={handleLoginCancel} />
      )}
    </div>
  );
}

export default App;