import { motion } from 'framer-motion';
import { Bot, Cpu, Zap, Activity, Database, CheckCircle2, Search, Send } from 'lucide-react';

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeInUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AiAgent() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8 pb-10">
      
      <motion.div variants={fadeInUp}>
        <h2 className="text-sm font-medium text-violet-600 mb-1">AI Intelligence</h2>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agent Workspace</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Node Network Visualizer */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 relative overflow-hidden h-[500px] flex flex-col">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0,transparent_100%)] pointer-events-none" />
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-white font-semibold tracking-tight">Agent Neural Flow</h3>
            <div className="flex items-center text-xs font-medium bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              Online & Processing
            </div>
          </div>

          <div className="flex-1 relative z-10 flex items-center justify-center">
            <div className="relative w-full max-w-lg h-64">
              
              {/* Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <motion.path 
                  d="M 256,40 L 100,150" 
                  stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                />
                <motion.path 
                  d="M 256,40 L 256,150" 
                  stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, repeatType: 'reverse' }}
                />
                <motion.path 
                  d="M 256,40 L 412,150" 
                  stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                />
                
                <motion.path 
                  d="M 100,150 L 256,260" 
                  stroke="rgba(139, 92, 246, 0.2)" strokeWidth="2" fill="none"
                />
                <motion.path 
                  d="M 256,150 L 256,260" 
                  stroke="rgba(139, 92, 246, 0.2)" strokeWidth="2" fill="none"
                />
                <motion.path 
                  d="M 412,150 L 256,260" 
                  stroke="rgba(139, 92, 246, 0.2)" strokeWidth="2" fill="none"
                />
              </svg>

              {/* Nodes */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-violet-600 border-4 border-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)] z-10">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-violet-200 text-xs mt-2 font-medium">Core Agent</span>
              </div>

              <div className="absolute top-[130px] left-[60px] flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-violet-500 flex items-center justify-center z-10">
                  <Database className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-slate-400 text-xs mt-2">Data Source</span>
              </div>

              <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-violet-500 flex items-center justify-center z-10">
                  <Activity className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-slate-400 text-xs mt-2">Analysis</span>
              </div>

              <div className="absolute top-[130px] right-[60px] flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-violet-500 flex items-center justify-center z-10">
                  <Zap className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-slate-400 text-xs mt-2">Actions</span>
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center z-10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-emerald-400 text-xs mt-2 font-medium">Result Generated</span>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Activity Stream */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 flex flex-col h-[500px]">
          <h3 className="text-slate-900 font-semibold tracking-tight mb-6">Activity Stream</h3>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 no-scrollbar relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {[
              { status: 'processing', text: 'Analyzing customer data anomaly...', icon: Search, color: 'text-amber-500 bg-amber-50' },
              { status: 'success', text: 'Updated revenue forecast models', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
              { status: 'success', text: 'Resolved 34 support tickets', icon: Send, color: 'text-emerald-500 bg-emerald-50' },
              { status: 'success', text: 'Optimized server allocation', icon: Cpu, color: 'text-emerald-500 bg-emerald-50' },
            ].map((task, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <task.icon className={`w-4 h-4 ${task.status === 'processing' ? 'animate-pulse text-violet-500' : 'text-slate-400'}`} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-800 text-sm">{task.text}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
