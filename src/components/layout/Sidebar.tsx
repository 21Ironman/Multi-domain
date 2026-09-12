import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Activity, PlaySquare, Bot, Landmark, Settings, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../lib/utils';

const domains = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'E-Commerce', path: '/ecommerce', icon: ShoppingCart },
  { name: 'Healthcare', path: '/healthcare', icon: Activity },
  { name: 'Streaming', path: '/streaming', icon: PlaySquare },
  { name: 'AI Agent', path: '/ai-agent', icon: Bot },
  { name: 'Banking', path: '/banking', icon: Landmark },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="hidden md:flex flex-col bg-[#0a0a0a] border-r border-white/5 shadow-2xl z-40 flex-shrink-0 relative"
    >
      <div className="flex items-center h-16 px-4 border-b border-white/5 justify-between overflow-hidden">
        <div className="flex items-center whitespace-nowrap">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)] flex-shrink-0">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <motion.span 
            animate={{ opacity: collapsed ? 0 : 1, display: collapsed ? 'none' : 'block' }}
            transition={{ duration: 0.2 }}
            className="text-lg font-bold text-white tracking-wide ml-3"
          >
            MultiDash
          </motion.span>
        </div>
      </div>

      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-[#121212] text-slate-400 p-1 rounded-full border border-white/10 hover:text-white z-50 transition-colors shadow-lg hover:scale-110"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 flex flex-col gap-1 relative no-scrollbar">
        {!collapsed && <motion.div animate={{opacity: collapsed?0:1}} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">Domains</motion.div>}
        
        {domains.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="relative group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl text-slate-400 hover:text-white transition-colors"
              title={collapsed ? item.name : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 flex items-center w-full">
                <Icon className={cn(
                  "flex-shrink-0 h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "text-slate-500 group-hover:text-slate-300",
                  collapsed && "mx-auto"
                )} />
                <motion.span 
                  animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto', marginLeft: collapsed ? 0 : 12 }}
                  className={cn("whitespace-nowrap transition-colors overflow-hidden", isActive && "text-white font-semibold")}
                >
                  {item.name}
                </motion.span>
              </div>
            </Link>
          );
        })}

        <div className="mt-auto pt-8">
          {!collapsed && <motion.div animate={{opacity: collapsed?0:1}} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">System</motion.div>}
          <Link to="#" className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors" title={collapsed ? "Settings" : undefined}>
            <Settings className={cn("flex-shrink-0 h-5 w-5", collapsed && "mx-auto")} />
            <motion.span animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto', marginLeft: collapsed ? 0 : 12 }} className="whitespace-nowrap overflow-hidden">Settings</motion.span>
          </Link>
          <Link to="#" className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors" title={collapsed ? "Support" : undefined}>
            <HelpCircle className={cn("flex-shrink-0 h-5 w-5", collapsed && "mx-auto")} />
            <motion.span animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto', marginLeft: collapsed ? 0 : 12 }} className="whitespace-nowrap overflow-hidden">Support</motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
