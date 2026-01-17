import React from 'react';

interface HeaderProps {
  onLoginClick: () => void;
  onPricingClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0E0E10]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
           <span className="text-xl font-bold tracking-tight text-white">Propel</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Product</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Integrations</a>
          <a href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={onLoginClick} className="hidden sm:block text-sm font-medium text-white hover:text-gray-300">Log in</button>
          <a href="#calculator" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
            Get started
          </a>
        </div>
      </div>
    </header>
  );
};