import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, ChevronRight, BarChart2, AlertTriangle, FileText } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

export default function ChatBot() {
  const { isOpen, toggleChat, messages, addMessage } = useChatStore();
  const [input, setInput] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    addMessage(input, false);
    setInput('');
    
    setTimeout(() => {
      addMessage('I am analyzing cross-domain metrics across MultiDash...', true);
    }, 600);
  };

  const handleQuickAction = (action: string) => {
    addMessage(action, false);
    setTimeout(() => {
      addMessage(`Here is the analysis for: "${action}". All systems normal.`, true);
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 p-4 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 text-white z-50 group border border-indigo-500/50"
          >
            <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
            className="fixed bottom-6 right-6 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-slate-200/80 z-50 flex flex-col h-[550px] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-5 text-white flex justify-between items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="relative z-10">
                <div className="flex items-center mb-1">
                  <Bot className="w-5 h-5 mr-2 text-indigo-400" />
                  <h3 className="font-semibold text-lg tracking-tight">MultiDash AI</h3>
                </div>
                <p className="text-xs text-indigo-200/80">Cross-domain intelligence active</p>
              </div>
              <button 
                onClick={toggleChat}
                className="relative z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#F8FAFC] flex flex-col space-y-4 no-scrollbar">
              
              {/* Quick Actions if only 1 message */}
              {messages.length === 1 && (
                <div className="mb-2 space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Suggested Actions</p>
                  {[
                    { t: 'Investigate revenue', i: BarChart2 },
                    { t: 'Find anomalies', i: AlertTriangle },
                    { t: 'Generate report', i: FileText },
                  ].map((act, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      onClick={() => handleQuickAction(act.t)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 text-sm font-medium transition-colors group"
                    >
                      <div className="flex items-center">
                        <act.i className="w-4 h-4 mr-3 text-indigo-500" />
                        {act.t}
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div 
                  key={msg.id} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.isBot && <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 shrink-0 mt-1"><Sparkles className="w-3 h-3 text-indigo-600" /></div>}
                  <div className={`max-w-[75%] rounded-2xl p-3.5 text-[13px] leading-relaxed shadow-sm ${
                    msg.isBot 
                      ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm' 
                      : 'bg-indigo-600 text-white rounded-tr-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your dashboard..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="ml-2 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4 -ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
