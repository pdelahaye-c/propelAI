import React, { useState } from 'react';

const countries = [
  { code: 'FR', dial: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78' },
  { code: 'US', dial: '+1', flag: '🇺🇸', placeholder: '(555) 123-4567' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', placeholder: '7911 123456' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', placeholder: '(416) 123-4567' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', placeholder: '151 12345678' },
  { code: 'ES', dial: '+34', flag: '🇪🇸', placeholder: '612 34 56 78' },
  { code: 'IT', dial: '+39', flag: '🇮🇹', placeholder: '312 345 6789' },
  { code: 'BE', dial: '+32', flag: '🇧🇪', placeholder: '470 12 34 56' },
  { code: 'CH', dial: '+41', flag: '🇨🇭', placeholder: '79 123 45 67' },
];

export const ROICalculator: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [callsPerWeek, setCallsPerWeek] = useState(50);
  const [missedCallRate, setMissedCallRate] = useState(30);
  const [avgCommission, setAvgCommission] = useState(10000);
  const [conversionRate, setConversionRate] = useState(5);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to France

  // Results Calculation
  const monthlyCalls = callsPerWeek * 4;
  const missedCalls = monthlyCalls * (missedCallRate / 100);
  const potentialDeals = missedCalls * (conversionRate / 100);
  const monthlyLoss = Math.round(potentialDeals * avgCommission);
  const yearlyLoss = Math.round(monthlyLoss * 12);

  const handleNext = () => {
    setStep(2);
    // Scroll to top of component if needed, or keep focus
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    const webhookUrl = process.env.WEBHOOK_URL;
    
    // Format phone number: Remove spaces/non-digits, remove leading zero, prepend country code
    let formattedPhone = '';
    if (phone) {
        let cleaned = phone.replace(/\D/g, ''); // Remove non-numeric chars
        if (cleaned.startsWith('0')) {
            cleaned = cleaned.substring(1); // Remove leading zero
        }
        formattedPhone = `${selectedCountry.dial}${cleaned}`; // e.g. +33612345678
    }

    const payload = {
        name,
        email,
        phone: formattedPhone,
        callsPerWeek,
        missedCallRate,
        avgCommission,
        conversionRate,
        monthlyLoss,
        yearlyLoss,
        source: "ROICalculator",
        submittedAt: new Date().toISOString()
    };

    try {
        if (webhookUrl) {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    } finally {
        setIsSubmitting(false);
        setStep(3);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0E0E10]" id="calculator">
       {/* Background decorative blobs */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="max-w-3xl mx-auto px-6 relative z-10">
          
          {/* Header - Changes based on step */}
          <div className="text-center mb-12">
            {step === 1 && (
                <>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Calculate your <span className="text-gradient">hidden losses</span>
                    </h2>
                    <p className="text-xl text-gray-400">
                    Step 1 of 2: Let's analyze your current call volume.
                    </p>
                </>
            )}
            {step === 2 && (
                <>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Almost <span className="text-gradient">there...</span>
                    </h2>
                    <p className="text-xl text-gray-400">
                    Step 2 of 2: Where should we send your analysis?
                    </p>
                </>
            )}
            {step === 3 && (
                <>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Your <span className="text-gradient">Opportunity Report</span>
                    </h2>
                    <p className="text-xl text-gray-400">
                    Here is the revenue you could be saving.
                    </p>
                </>
            )}
          </div>

          <div className="bg-[#131316] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
             
             {/* Progress Bar */}
             {step < 3 && (
                 <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                    <div 
                        className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                        style={{ width: step === 1 ? '50%' : '95%' }}
                    ></div>
                 </div>
             )}

             {/* STEP 1: CALCULATOR INPUTS */}
             {step === 1 && (
                 <div className="space-y-10 animate-[fadeIn_0.5s_ease-out]">
                    
                    {/* Input 1: Calls per week */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-200 font-medium text-lg">Weekly Incoming Calls</label>
                            <span className="text-white font-bold bg-white/10 px-4 py-1 rounded-lg border border-white/5">{callsPerWeek}</span>
                        </div>
                        <input 
                            type="range" min="10" max="500" step="10"
                            value={callsPerWeek}
                            onChange={(e) => setCallsPerWeek(Number(e.target.value))}
                            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
                        />
                        <p className="text-sm text-gray-500">Estimate how many calls your agency receives per week.</p>
                    </div>

                    {/* Input 2: Missed Call Rate */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-200 font-medium text-lg">Missed Call Rate</label>
                            <span className="text-white font-bold bg-white/10 px-4 py-1 rounded-lg border border-white/5">{missedCallRate}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="100"
                            value={missedCallRate}
                            onChange={(e) => setMissedCallRate(Number(e.target.value))}
                            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
                        />
                         <div className="flex justify-between text-xs text-gray-500">
                            <span>0%</span>
                            <span className="text-indigo-400 font-medium cursor-pointer hover:underline" onClick={() => setMissedCallRate(30)}>Reset to Industry Avg (30%)</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* Input 3: Avg Commission */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-200 font-medium text-lg">Avg. Commission per Deal</label>
                            <span className="text-white font-bold bg-white/10 px-4 py-1 rounded-lg border border-white/5">${avgCommission.toLocaleString()}</span>
                        </div>
                        <input 
                            type="range" min="1000" max="50000" step="500"
                            value={avgCommission}
                            onChange={(e) => setAvgCommission(Number(e.target.value))}
                            className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
                        />
                    </div>

                    {/* Input 4: Conversion Rate */}
                    <div className="pt-6 border-t border-white/5">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-gray-400 font-medium">Lead-to-Deal Conversion</label>
                                <span className="text-gray-400 font-bold">{conversionRate}%</span>
                            </div>
                            <input 
                                type="range" min="1" max="20" step="0.5"
                                value={conversionRate}
                                onChange={(e) => setConversionRate(Number(e.target.value))}
                                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gray-500"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleNext}
                        className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group mt-8"
                    >
                        <span>Next Step</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                 </div>
             )}

             {/* STEP 2: LEAD FORM */}
             {step === 2 && (
                 <form onSubmit={handleSubmit} className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                     
                     <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name <span className="text-indigo-400">*</span></label>
                            <input 
                                id="name" type="text" required
                                value={name} onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Work Email <span className="text-indigo-400">*</span></label>
                            <input 
                                id="email" type="email" required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="john@agency.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number <span className="text-gray-500">(Optional)</span></label>
                            <div className="flex gap-2">
                                <div className="relative w-32 shrink-0">
                                    <select
                                        value={selectedCountry.code}
                                        onChange={(e) => {
                                            const country = countries.find(c => c.code === e.target.value);
                                            if (country) setSelectedCountry(country);
                                        }}
                                        className="w-full appearance-none bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
                                    >
                                        {countries.map((c) => (
                                            <option key={c.code} value={c.code}>
                                                {c.flag} {c.dial}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                                <input 
                                    id="phone" type="tel"
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    placeholder={selectedCountry.placeholder}
                                />
                            </div>
                        </div>
                     </div>

                     <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 text-sm text-indigo-200">
                        <div className="flex gap-2">
                             <svg className="w-5 h-5 shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                             <p>Based on your inputs of <strong>{callsPerWeek} calls/week</strong> and a <strong>{missedCallRate}% missed rate</strong>, we have calculated your potential revenue loss.</p>
                        </div>
                     </div>

                     <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Calculating...
                            </>
                        ) : (
                            <>
                                <span>Reveal My Results</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-gray-500">We respect your privacy. No spam.</p>
                 </form>
             )}

             {/* STEP 3: RESULTS */}
             {step === 3 && (
                 <div className="animate-[fadeIn_0.5s_ease-out]">
                    <div className="text-center mb-10">
                        <h3 className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">Monthly Revenue Leakage</h3>
                        <div className="text-6xl md:text-7xl font-bold text-white mb-2 tracking-tight">
                            ${monthlyLoss.toLocaleString()}
                        </div>
                        <p className="text-red-400 text-sm font-medium bg-red-500/10 inline-block px-4 py-1 rounded-full border border-red-500/20">
                            ⚠️ You are losing this much every single month.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                         <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
                             <p className="text-gray-400 text-sm mb-2">Yearly Opportunity Cost</p>
                             <p className="text-2xl md:text-3xl font-bold text-white">${yearlyLoss.toLocaleString()}</p>
                         </div>
                         <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
                             <p className="text-gray-400 text-sm mb-2">Propel AI ROI</p>
                             <p className="text-2xl md:text-3xl font-bold text-green-400">{(monthlyLoss / 299).toFixed(1)}x Return</p>
                         </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 border border-indigo-500/20 mb-8">
                        <p className="text-indigo-200 text-center leading-relaxed">
                            <span className="font-bold text-white">{name}</span>, capturing just <span className="text-white font-bold">1</span> of these missed deals covers the cost of Propel AI for <span className="text-white font-bold">{Math.floor(avgCommission / 299)} years</span>.
                        </p>
                    </div>

                    <button className="w-full py-5 bg-white text-black font-bold text-xl rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-indigo-500/20">
                        <span>Stop The Bleeding - Start Free Trial</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                    <button 
                        onClick={() => setStep(1)}
                        className="w-full mt-4 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        Recalculate
                    </button>
                 </div>
             )}

          </div>
       </div>
    </section>
  );
};