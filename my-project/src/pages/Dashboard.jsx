import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');

  // State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const messagesEndRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/conversations', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  // Redirect if no token
  useEffect(() => {
    if (!accessToken) navigate('/login');
  }, [accessToken, navigate]);

  // Load Conversations on Mount
  useEffect(() => {
    if (accessToken) fetchConversations();
  }, [accessToken]);

  const loadConversation = async (id) => {
    setActiveConversationId(id);
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/history/${id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
    setInputMessage('');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userContent = inputMessage;
    const newMessage = { role: 'user', content: userContent, timestamp: new Date() };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          message: userContent,
          conversation_id: activeConversationId
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.response, timestamp: new Date() }]);

        // If it was a new conversation, set the ID and refresh list
        if (!activeConversationId && data.conversation_id) {
          setActiveConversationId(data.conversation_id);
          fetchConversations();
        }
      } else {
        throw new Error('Backend failed');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not reach the server.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDeleteConversation = async (e, id) => {
    e.stopPropagation(); // Prevent loading the conversation
    if (!window.confirm("Are you sure you want to delete this chat?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/conversation/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (response.ok) {
        // If the deleted conversation was the active one, clear messages
        if (activeConversationId === id) {
          setActiveConversationId(null);
          setMessages([]);
        }
        // Refresh conversations list
        fetchConversations();
      } else {
        alert("Failed to delete conversation");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-white">
      {/* ==================== SIDEBAR ==================== */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50 flex flex-col transition-all duration-300 ease-in-out relative overflow-hidden`}>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-all shadow-lg hover:shadow-violet-500/20 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-semibold">New Chat</span>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <h3 className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">History</h3>
          {conversations.map(conv => (
            <div key={conv.id} className="group relative">
              <button
                onClick={() => loadConversation(conv.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors text-left pr-10 ${activeConversationId === conv.id
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="truncate">{conv.title || 'Untitled Chat'}</span>
              </button>

              {/* Delete Button */}
              <button
                onClick={(e) => handleDeleteConversation(e, conv.id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-slate-700/50"
                title="Delete Chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}

        </div>

        {/* User / Logout */}
        <div className="p-4 border-t border-slate-800/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log out</span>
          </button>
        </div>

      </aside>

      {/* Toggle Sidebar Button (Visible on mobile or when closed) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute top-4 z-50 p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all ${sidebarOpen ? 'left-64 ml-2' : 'left-4'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* ==================== MAIN CHAT AREA ==================== */}
      <main className="flex-1 flex flex-col h-screen relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth pb-32">
          {!activeConversationId && messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-50">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-200">How can I help you today?</h2>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start max-w-3xl'}`}>
              {msg.role !== 'user' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              )}
              <div className={`p-4 rounded-2xl ${msg.role === 'user'
                ? 'bg-violet-600 text-white rounded-br-none max-w-[80%]'
                : 'bg-slate-800/80 text-slate-200 rounded-bl-none w-full'
                }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="px-4 py-3 bg-slate-800/50 rounded-2xl rounded-bl-none flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message ChatGPT..."
                className="w-full bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-slate-200 placeholder-slate-500 shadow-2xl"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-violet-600 rounded-xl text-white hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <p className="text-center text-xs text-slate-500 mt-2">
              ChatGPT can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;