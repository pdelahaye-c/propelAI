import React, { useState } from 'react';

const faqs = [
  {
    question: "How fast does the AI answer?",
    answer: "Instantly. Propel picks up within 0.8 seconds, ensuring you never miss a lead due to long ring times or busy signals."
  },
  {
    question: "Does it integrate with my CRM?",
    answer: "Yes. We sync natively with HubSpot, Salesforce, Pipedrive, and GoHighLevel in real-time. No manual data entry is required."
  },
  {
    question: "Can it schedule viewings?",
    answer: "Absolutely. The AI qualifies the lead based on your criteria and sends a personalized WhatsApp link to book a viewing directly on your calendar."
  },
  {
    question: "What if the AI gets stuck?",
    answer: "The AI is trained to handle objections gracefully. If it encounters a complex scenario it can't handle, it politely takes a message and flags the conversation for your immediate review."
  },
  {
    question: "Is the voice realistic?",
    answer: "Yes. We use advanced voice synthesis that sounds indistinguishable from a human, complete with natural pauses, intonation, and active listening cues."
  },
  {
    question: "Can I customize the script?",
    answer: "Yes. You provide the knowledge base and specific instructions (e.g., 'we don't do rentals', 'office hours are 9-5'). The AI adapts its responses accordingly."
  },
  {
    question: "Do I need a new phone number?",
    answer: "No. You can simply forward your existing missed calls to your Propel dedicated line. Alternatively, we can provide a new number for your marketing campaigns."
  },
  {
    question: "Is it really 24/7?",
    answer: "Yes. Holidays, weekends, and 3 AM calls are all covered. The AI never sleeps, takes breaks, or calls in sick."
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. Our plans are monthly. You can pause or cancel your subscription anytime with one click in your dashboard."
  },
  {
    question: "What happens during onboarding?",
    answer: "We set up your knowledge base, connect your CRM, and test the line. You can be live and taking calls in less than 30 minutes."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative bg-[#0E0E10]" id="faq">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Note: Removed items-start to allow columns to stretch to equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          
          {/* Left Column: Header & Questions */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
              <span className="italic font-serif text-indigo-400 mr-3">Frequently</span>
              asked questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border-b border-white/10 pb-4"
                >
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-4 text-left group hover:opacity-80 transition-opacity"
                  >
                    <span className="text-lg font-medium text-white pr-8">{faq.question}</span>
                    <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-400 pb-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Floating Booking Card */}
          {/* Using sticky positioning centered in the viewport */}
          <div className="lg:col-span-1 hidden lg:block h-full">
            <div className="sticky top-[calc(50vh-275px)]">
              <div className="relative overflow-hidden rounded-[2.5rem] p-8 text-center border border-white/10 bg-[#131316] min-h-[550px] flex flex-col justify-center items-center shadow-2xl isolate">
                
                {/* Glass Effect Overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl z-10 pointer-events-none"></div>

                {/* Animated Gradient Background Blobs - Behind glass */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/40 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute top-10 -right-20 w-80 h-80 bg-purple-600/40 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-600/40 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
                
                <div className="relative z-20 flex flex-col items-center w-full">
                  {/* Avatar/Icon */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20 shadow-xl ring-1 ring-white/10">
                    <div className="text-5xl animate-[wave_2s_infinite_ease-in-out] origin-bottom-right drop-shadow-lg">👋</div>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                    Book a 15-min intro call
                  </h3>
                  <p className="text-white/80 text-base mb-10 max-w-[240px] font-medium drop-shadow-sm">
                    See if Propel AI is the right fit for your agency.
                  </p>

                  <button className="w-full bg-white text-black font-bold py-5 px-6 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-white/25 active:scale-95 mb-6 text-lg tracking-tight">
                    Book a call
                  </button>

                  <div className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors cursor-pointer group">
                     <svg className="w-4 h-4 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                     <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-pink-400">Prefer to email? hello@propel.ai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
