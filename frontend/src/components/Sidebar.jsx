import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠', current: location.pathname === '/' },
    { name: 'MCQ Bank', href: '/mcq', icon: '📝', current: location.pathname === '/mcq' },
    { name: 'Coding', href: '/coding', icon: '💻', current: location.pathname === '/coding' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊', current: location.pathname === '/dashboard' },
    { name: 'Resources', href: '/resources', icon: '📚', current: location.pathname === '/resources' },
    { name: 'Feedback', href: '/feedback', icon: '💬', current: location.pathname === '/feedback' },
    { name: 'About', href: '/about', icon: 'ℹ️', current: location.pathname === '/about' }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h1 className="text-xl font-bold text-white">🚀 Placement Prep</h1>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                item.current
                  ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>

      </nav>
      </div>
    </>
  );
}
