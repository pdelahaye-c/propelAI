import React from 'react';

export const Features: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
       {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The complete <span className="text-gradient">lead lifecycle</span> automation
          </h2>
          <p className="text-xl text-gray-400">
            Propel doesn't just answer phones. It manages the entire flow from first hello to closed deal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: The Call */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col h-full hover:border-indigo-500/30 transition-colors duration-300">
            <div className="mb-8 p-4 bg-indigo-500/10 w-fit rounded-xl border border-indigo-500/20">
               <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">1. Instant Reception</h3>
            <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
              Incoming call? Propel answers in 0.8 seconds. It sounds human, handles objections, and qualifies the lead based on your criteria (budget, location, timeline).
            </p>
            <div className="mt-auto border-t border-white/10 pt-6">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                24/7 Availability
              </div>
            </div>
          </div>

          {/* Feature 2: The Data */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col h-full hover:border-purple-500/30 transition-colors duration-300">
            <div className="mb-8 p-4 bg-purple-500/10 w-fit rounded-xl border border-purple-500/20">
               <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">2. CRM Sync</h3>
            <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
              Data is extracted and pushed instantly to HubSpot, Salesforce, or Pipedrive. No manual entry. We categorize leads as "Hot", "Warm", or "Nurture".
            </p>
             <div className="mt-auto border-t border-white/10 pt-6">
              <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full bg-gray-700 border border-black flex items-center justify-center text-xs">SF</div>
                 <div className="w-8 h-8 rounded-full bg-gray-700 border border-black flex items-center justify-center text-xs">HS</div>
                 <div className="w-8 h-8 rounded-full bg-gray-700 border border-black flex items-center justify-center text-xs">+5</div>
              </div>
            </div>
          </div>

          {/* Feature 3: The Conversion */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col h-full hover:border-green-500/30 transition-colors duration-300">
            <div className="mb-8 p-4 bg-green-500/10 w-fit rounded-xl border border-green-500/20">
               <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.15-2.9-7.02zM12.04 20.16c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.5-.4-.43-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.11s.9 2.45 1.02 2.62c.13.17 1.78 2.73 4.31 3.82.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.11-.23-.18-.48-.3z"/>
               </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">3. WhatsApp Engagement</h3>
            <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
              The moment the call ends, Propel sends a personalized WhatsApp message to schedule a viewing or send property brochures.
            </p>
             <div className="mt-auto border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 text-sm text-green-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                98% Open Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
