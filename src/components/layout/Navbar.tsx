import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Activity, PlaySquare, Bot, Landmark, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const domains = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'E-Commerce', path: '/ecommerce', icon: ShoppingCart },
  { name: 'Healthcare', path: '/healthcare', icon: Activity },
  { name: 'Streaming', path: '/streaming', icon: PlaySquare },
  { name: 'AI Agent', path: '/ai-agent', icon: Bot },
  { name: 'Banking', path: '/banking', icon: Landmark },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 z-30 sticky top-0">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex flex-1 overflow-x-auto no-scrollbar">
            <nav className="flex space-x-1 sm:space-x-2">
              {domains.map((domain) => {
                const Icon = domain.icon;
                const isActive = location.pathname === domain.path;
                return (
                  <Link
                    key={domain.name}
                    to={domain.path}
                    className={cn(
                      "relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                      isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {domain.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-t-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden sm:flex items-center space-x-4 ml-4">
            <button 
              className="flex items-center text-sm text-slate-400 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors border border-white/5"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            >
              <Search className="w-4 h-4 mr-2" />
              <span>Search...</span>
              <kbd className="ml-3 font-sans font-semibold text-[10px] text-slate-500 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
            </button>
            <button className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm border-2 border-white/10 cursor-pointer hover:scale-105 transition-transform" />
          </div>
          
        </div>
      </div>
    </header>
  );
}
