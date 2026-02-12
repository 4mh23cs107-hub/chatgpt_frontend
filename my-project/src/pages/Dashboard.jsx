import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animateCards, setAnimateCards] = useState(false);

  // Protect route — redirect if no token
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Trigger card entrance animation
  useEffect(() => {
    const timeout = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const stats = [
    {
      label: 'Total Conversations',
      value: '1,284',
      change: '+12.5%',
      up: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      label: 'Tokens Used',
      value: '45.2K',
      change: '+8.1%',
      up: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Active Sessions',
      value: '3',
      change: '-2',
      up: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Saved Prompts',
      value: '56',
      change: '+4',
      up: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      gradient: 'from-sky-500 to-blue-600',
    },
  ];

  const recentActivity = [
    { action: 'Started a new conversation', time: '2 minutes ago', icon: '💬' },
    { action: 'Saved prompt "Marketing Strategy"', time: '15 minutes ago', icon: '📌' },
    { action: 'Exported chat to PDF', time: '1 hour ago', icon: '📄' },
    { action: 'Updated profile settings', time: '3 hours ago', icon: '⚙️' },
    { action: 'Created new workspace', time: '5 hours ago', icon: '🗂️' },
  ];

  const quickActions = [
    { label: 'New Chat', icon: '✨', color: 'bg-violet-500 hover:bg-violet-600' },
    { label: 'Browse Templates', icon: '📋', color: 'bg-sky-500 hover:bg-sky-600' },
    { label: 'View History', icon: '🕒', color: 'bg-amber-500 hover:bg-amber-600' },
    { label: 'API Keys', icon: '🔑', color: 'bg-emerald-500 hover:bg-emerald-600' },
  ];

  const sidebarNavItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: 'conversations',
      label: 'Conversations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  // Usage bar data
  const usageBars = [
    { label: 'GPT-4o', used: 72, color: 'bg-violet-500' },
    { label: 'GPT-4o Mini', used: 45, color: 'bg-sky-500' },
    { label: 'DALL·E', used: 28, color: 'bg-amber-500' },
    { label: 'Whisper', used: 15, color: 'bg-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-white">
      {/* ==================== SIDEBAR ==================== */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'
          } bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50 flex flex-col transition-all duration-300 ease-in-out relative`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-800/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          {sidebarOpen && (
            <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              ChatGPT
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id
                  ? 'bg-violet-500/20 text-violet-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600 hover:border-violet-500 transition-all duration-200 shadow-lg"
        >
          <svg className={`w-3 h-3 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* User Profile / Logout */}
        <div className="p-3 border-t border-slate-800/50">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold shadow-md flex-shrink-0">
              U
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">User</p>
                <p className="text-xs text-slate-500 truncate">Free Plan</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200 ${!sidebarOpen ? 'px-0' : ''
              }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold text-slate-100">{greeting()}, User 👋</h1>
            <p className="text-xs text-slate-500">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 text-sm text-slate-400 focus-within:border-violet-500/50 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-slate-200 placeholder-slate-500 w-40"
              />
            </div>
            {/* Notification bell */}
            <button className="relative w-9 h-9 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">3</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ===== STATS CARDS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-500 hover:shadow-lg hover:shadow-violet-500/5 cursor-pointer ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-100 mt-2">{stat.value}</p>
                    <p className={`text-xs mt-2 font-semibold flex items-center gap-1 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                      <svg className={`w-3 h-3 ${stat.up ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      {stat.change} <span className="text-slate-500 font-normal">vs last week</span>
                    </p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== MIDDLE SECTION: Quick Actions + Usage ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Quick Actions */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className={`${action.color} text-white rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2`}
                  >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Model Usage */}
            <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Model Usage This Month
              </h3>
              <div className="space-y-4">
                {usageBars.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400 font-medium">{bar.label}</span>
                      <span className="text-slate-500">{bar.used}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${bar.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: animateCards ? `${bar.used}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== BOTTOM SECTION: Activity + Plan Info ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Activity
              </h3>
              <div className="space-y-1">
                {recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-800/40 transition-all duration-200 cursor-pointer group"
                  >
                    <span className="text-lg flex-shrink-0">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors truncate">{activity.action}</p>
                      <p className="text-xs text-slate-600">{activity.time}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Info Card */}
            <div className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/20 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-violet-500/20 text-violet-300 text-xs font-bold rounded-full border border-violet-500/30">FREE</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-1">Upgrade to Pro</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Unlock unlimited GPT-4o access, DALL·E image generation, advanced analytics, and priority support.
                </p>
              </div>
              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited messages
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Access to GPT-4o & DALL·E 3
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </div>
              </div>
              <button className="mt-5 w-full py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                Upgrade Now — $20/mo
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;