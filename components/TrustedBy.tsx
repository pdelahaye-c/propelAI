import React from 'react';

export const TrustedBy: React.FC = () => {
  return (
    <div className="border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">
          Powering top agencies worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholder SVGs for logos for visual consistency */}
           <div className="h-8 flex items-center text-xl font-bold font-serif text-white">CENTURY 21</div>
           <div className="h-8 flex items-center text-xl font-bold font-sans text-white tracking-tighter">RE/MAX</div>
           <div className="h-8 flex items-center text-xl font-bold font-mono text-white">KELLER WILLIAMS</div>
           <div className="h-8 flex items-center text-xl font-bold font-serif text-white italic">Sotheby's</div>
           <div className="h-8 flex items-center text-xl font-bold font-sans text-white">CBRE</div>
        </div>
      </div>
    </div>
  );
};
