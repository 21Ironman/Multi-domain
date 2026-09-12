import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, ShoppingCart, Activity, PlaySquare, Bot, Landmark, FileText, Settings, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { id: 'home', name: 'Navigate to Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'eco', name: 'Navigate to E-Commerce', icon: ShoppingCart, path: '/ecommerce' },
  { id: 'health', name: 'Navigate to Healthcare', icon: Activity, path: '/healthcare' },
  { id: 'stream', name: 'Navigate to Streaming', icon: PlaySquare, path: '/streaming' },
  { id: 'ai', name: 'Navigate to AI Agent', icon: Bot, path: '/ai-agent' },
  { id: 'bank', name: 'Navigate to Banking', icon: Landmark, path: '/banking' },
  { id: 'report', name: 'Create report', icon: FileText, path: '#' },
  { id: 'export', name: 'Export analytics', icon: Download, path: '#' },
  { id: 'settings', name: 'Open settings', icon: Settings, path: '#' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = query === '' 
    ? actions 
    : actions.filter(action => action.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed inset-0 m-auto mt-[10vh] max-w-xl w-[90%] h-fit bg-[#0f0f13] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 border border-white/10"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search commands or jump to..."
                className="flex-1 outline-none text-slate-200 placeholder-slate-500 bg-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="text-xs text-slate-500 font-medium border border-white/10 rounded px-1.5 py-0.5 bg-white/5">ESC</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-sm">No results found.</div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (action.path !== '#') {
                          navigate(action.path);
                        }
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors group"
                    >
                      <action.icon className="w-4 h-4 mr-3 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                      {action.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
