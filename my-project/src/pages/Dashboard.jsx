import React from 'react';

const Dashboard = () => {
  // Get user data or tokens from localStorage if needed
  const accessToken = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.clear(); // Removes tokens
    window.location.href = '/login'; // Redirects to login
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-800">
          MyApp
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block py-2.5 px-4 rounded bg-indigo-800">Overview</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-indigo-800 transition">Analytics</a>
          <a href="#" className="block py-2.5 px-4 rounded hover:bg-indigo-800 transition">Settings</a>
        </nav>
        <button 
          onClick={handleLogout}
          className="m-4 p-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">User Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, User!</span>
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              U
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">Active Tasks</p>
              <p className="text-3xl font-bold text-gray-900">48</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-bold">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900">84%</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
            Graph or Table Content goes here...
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;