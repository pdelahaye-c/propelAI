import React, { useState } from 'react';

// Mock Data for the Dashboard
const stats = [
  { label: 'Calls Handled', value: '124', change: '+12%', trend: 'up' },
  { label: 'Qualified Leads', value: '42', change: '+8%', trend: 'up' },
  { label: 'Revenue Saved', value: '$12,400', change: '+24%', trend: 'up' },
];

const recentCalls = [
  { id: 1, name: 'Sarah Miller', number: '+1 (555) 012-3456', status: 'Qualified', duration: '4m 12s', time: '10 mins ago' },
  { id: 2, name: 'Unknown Caller', number: '+1 (555) 987-6543', status: 'Spam', duration: '0m 45s', time: '32 mins ago' },
  { id: 3, name: 'James Wilson', number: '+1 (555) 456-7890', status: 'Missed', duration: '0m 00s', time: '1 hour ago' },
  { id: 4, name: 'Emily Davis', number: '+1 (555) 234-5678', status: 'Qualified', duration: '2m 30s', time: '2 hours ago' },
  { id: 5, name: 'Michael Brown', number: '+1 (555) 876-5432', status: 'Nurture', duration: '5m 15s', time: '4 hours ago' },
];

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#0E0E10] flex text-white font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#131316] flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
          <span className="text-xl font-bold tracking-tight">Propel</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {['Overview', 'Call Logs', 'Knowledge Base', 'CRM Sync', 'Settings'].map((item) => {
             const id = item.toLowerCase().replace(' ', '');
             const isActive = activeTab === id;
             return (
               <button
                 key={item}
                 onClick={() => setActiveTab(id)}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                   isActive 
                     ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
                     : 'text-gray-400 hover:bg-white/5 hover:text-white'
                 }`}
               >
                 {/* Icons based on item name (simplified for demo) */}
                 {item === 'Overview' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>}
                 {item === 'Call Logs' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}
                 {item === 'Knowledge Base' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>}
                 {item === 'CRM Sync' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>}
                 {item === 'Settings' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
                 
                 <span>{item}</span>
               </button>
             );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <button onClick={onLogout} className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
           <div>
              <h1 className="text-3xl font-bold text-white mb-2">Good afternoon, {user.name.split(' ')[0]}</h1>
              <p className="text-gray-400">Here's what's happening with your agency today.</p>
           </div>
           <button className="px-5 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              + New Campaign
           </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           {stats.map((stat, i) => (
             <div key={i} className="bg-[#131316] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                   <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                   <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {stat.change}
                   </span>
                </div>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                   <svg className="w-24 h-24 text-indigo-500 transform translate-x-4 translate-y-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg>
                </div>
             </div>
           ))}
        </div>

        {/* Activity Table */}
        <div className="bg-[#131316] border border-white/5 rounded-2xl overflow-hidden">
           <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Recent Calls</h3>
              <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="text-xs text-gray-500 border-b border-white/5">
                   <th className="p-4 font-medium uppercase tracking-wider">Caller</th>
                   <th className="p-4 font-medium uppercase tracking-wider">Status</th>
                   <th className="p-4 font-medium uppercase tracking-wider">Duration</th>
                   <th className="p-4 font-medium uppercase tracking-wider">Time</th>
                   <th className="p-4 font-medium uppercase tracking-wider">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-sm">
                 {recentCalls.map((call) => (
                   <tr key={call.id} className="hover:bg-white/5 transition-colors">
                     <td className="p-4">
                       <p className="font-semibold text-white">{call.name}</p>
                       <p className="text-gray-500 text-xs">{call.number}</p>
                     </td>
                     <td className="p-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                         call.status === 'Qualified' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                         call.status === 'Spam' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                         call.status === 'Missed' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                         'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                       }`}>
                         {call.status}
                       </span>
                     </td>
                     <td className="p-4 text-gray-300">{call.duration}</td>
                     <td className="p-4 text-gray-500">{call.time}</td>
                     <td className="p-4">
                       <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </main>
    </div>
  );
};