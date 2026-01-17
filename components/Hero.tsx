import React from 'react';
import { LiveAgentDemo } from './LiveAgentDemo';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden hero-glow">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-xs font-medium text-indigo-300 uppercase tracking-wide">Live Demo Available</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Turn missed calls into <span className="text-gradient">closed deals</span>.
          </h1>
          
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            The AI receptionist for real estate. We answer calls, qualify leads, sync to your CRM, and schedule viewings instantly via WhatsApp.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
               Get Started Free
             </button>
             <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-sm">
               View Integrations
             </button>
          </div>
          
          <div className="pt-8 flex items-center gap-4 text-sm text-gray-500">
             <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <img key={i} src={`https://picsum.photos/32/32?random=${i}`} className="w-8 h-8 rounded-full border-2 border-[#0E0E10]" alt="User" />
               ))}
             </div>
             <p>Trusted by 400+ Agencies</p>
          </div>
        </div>

        {/* Right Content - The Agent */}
        <div className="relative z-10 lg:h-[600px] flex items-center justify-center">
          {/* Background decorative elements for the agent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-indigo-600/20 blur-[100px] rounded-full -z-10"></div>
          
          <LiveAgentDemo />

          {/* Floating 'Cards' simulating the Fyxer/Baseten look */}
          <div className="absolute -right-4 top-20 glass-panel p-4 rounded-xl hidden xl:block animate-[bounce_3s_infinite]">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                   <p className="text-xs text-gray-400">Lead Qualified</p>
                   <p className="text-sm font-semibold text-white">Budget > $1.2M</p>
                </div>
             </div>
          </div>

          <div className="absolute -left-12 bottom-32 glass-panel p-4 rounded-xl hidden xl:block animate-[bounce_4s_infinite]">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
                <div>
                   <p className="text-xs text-gray-400">WhatsApp Sent</p>
                   <p className="text-sm font-semibold text-white">Viewing Scheduled</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
