import React from 'react';

export const Pricing: React.FC = () => {
  return (
    <section className="py-24 relative" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
           <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
             One subscription, <br/><span className="text-gradient">endless possibilities</span>.
           </h2>
           <p className="text-xl text-gray-400">
             We’ve simplified everything. One plan that covers your entire agency, no matter how many leads you get.
           </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-[#131316] border border-white/10 p-8 md:p-12 rounded-[2rem] relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 shadow-2xl shadow-black/50">
             
             {/* Header Row */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
               <div>
                 <h3 className="text-3xl font-bold text-white">Agency Pro</h3>
                 <p className="text-gray-400 mt-2">The complete automation suite.</p>
               </div>
               <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 uppercase tracking-widest hover:bg-white/10 transition-colors cursor-default">
                 Pause or cancel anytime
               </div>
             </div>

             {/* Price Row */}
             <div className="mb-12 relative">
               <div className="absolute top-1/2 -left-4 w-px h-12 bg-indigo-500/50 hidden md:block"></div>
               <div className="flex items-baseline gap-2">
                 <span className="text-6xl md:text-8xl font-bold text-white tracking-tighter">$299</span>
                 <div className="flex flex-col">
                    <span className="text-xl text-gray-400 font-medium">/month</span>
                    <span className="text-sm text-green-400 font-medium">Paid monthly</span>
                 </div>
               </div>
             </div>

             {/* Features Divider with "Included" Badge */}
             <div className="relative h-px bg-white/10 mb-12 flex items-center">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1c1c21] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded border border-white/10">
                   What's included
                </div>
             </div>

             {/* Features List */}
             <div className="grid md:grid-cols-2 gap-y-6 gap-x-12 mb-12">
               <div className="space-y-5">
                 <FeatureItem text="Unlimited AI conversations" />
                 <FeatureItem text="Real-time CRM Integration" />
                 <FeatureItem text="Instant WhatsApp follow-ups" />
                 <FeatureItem text="Custom knowledge base" />
               </div>
               <div className="space-y-5">
                 <FeatureItem text="Local phone number included" />
                 <FeatureItem text="Call recording & transcription" />
                 <FeatureItem text="Priority 24/7 Support" />
                 <FeatureItem text="Unlimited team members" />
               </div>
             </div>

             {/* CTA Button */}
             <div className="relative group/btn">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover/btn:opacity-50 transition duration-200"></div>
                <button className="relative w-full bg-white text-black h-16 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-3 active:scale-[0.99]">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span>Join Propel Today</span>
                </button>
             </div>
          </div>

          {/* Secondary Blocks (Trial/Cancel) */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#131316]/50 border border-white/5 p-6 rounded-2xl flex items-start gap-4 hover:bg-[#131316] transition-colors">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <div>
                 <h4 className="font-semibold text-white mb-1">Pause anytime</h4>
                 <p className="text-sm text-gray-400 leading-relaxed">Going on vacation? Pause your subscription and billing instantly.</p>
               </div>
            </div>
            <div className="bg-[#131316]/50 border border-white/5 p-6 rounded-2xl flex items-start gap-4 hover:bg-[#131316] transition-colors">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <div>
                 <h4 className="font-semibold text-white mb-1">7-day money back</h4>
                 <p className="text-sm text-gray-400 leading-relaxed">Not satisfied in your first week? Get a full refund, no questions asked.</p>
               </div>
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             {/* Payment Methods / Logos */}
             <div className="flex items-center gap-2 text-white font-bold font-sans tracking-tight"><span className="text-xl">stripe</span></div>
             <div className="flex items-center gap-2 text-white font-bold font-serif"><span className="text-xl">PayPal</span></div>
             <div className="flex items-center gap-2 text-white font-bold font-mono"><span className="text-xl">VISA</span></div>
          </div>

        </div>
      </div>
    </section>
  );
}

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 group">
    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-indigo-400 transition-colors shrink-0"></div>
    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{text}</span>
  </div>
);
