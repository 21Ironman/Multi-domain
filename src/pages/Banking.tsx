import { motion } from 'framer-motion';
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, ShieldCheck, Wallet, PieChart } from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const balanceData = Array.from({ length: 30 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  balance: 100000 + Math.random() * 20000 + i * 1000,
}));

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeInUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Banking() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8 pb-10">
      
      <motion.div variants={fadeInUp} className="flex justify-between items-end">
        <div>
          <h2 className="text-sm font-medium text-emerald-600 mb-1">Financial Services</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Corporate Banking</h1>
        </div>
        <div className="flex items-center text-sm font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
          End-to-End Encrypted
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <motion.div variants={fadeInUp} className="lg:col-span-2 bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <p className="text-slate-400 font-medium mb-1">Total Available Balance</p>
              <h2 className="text-4xl font-bold text-white tracking-tight">$128,492.20</h2>
              <div className="flex items-center mt-2">
                <span className="flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +8.42%
                </span>
                <span className="text-slate-500 text-xs ml-3">vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="h-[200px] w-full relative z-10 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceData}>
                <defs>
                  <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#10b981', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={stagger} className="flex flex-col gap-6">
          <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex-1 flex flex-col justify-center relative overflow-hidden group hover:border-emerald-200 transition-colors cursor-pointer">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <CreditCard className="w-32 h-32 text-emerald-600" />
            </div>
            <div className="flex items-center mb-2 relative z-10">
              <CreditCard className="w-5 h-5 text-emerald-600 mr-2" />
              <h3 className="text-slate-900 font-semibold">Corporate Card</h3>
            </div>
            <p className="text-slate-500 text-sm mb-4 relative z-10">**** **** **** 4920</p>
            <p className="text-2xl font-bold text-slate-900 relative z-10">$12,450.00 <span className="text-xs font-normal text-slate-500">limit</span></p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex-1 flex flex-col justify-center relative overflow-hidden group hover:border-indigo-200 transition-colors cursor-pointer">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <PieChart className="w-32 h-32 text-indigo-600" />
            </div>
            <div className="flex items-center mb-2 relative z-10">
              <PieChart className="w-5 h-5 text-indigo-600 mr-2" />
              <h3 className="text-slate-900 font-semibold">Financial Health</h3>
            </div>
            <p className="text-slate-500 text-sm mb-4 relative z-10">Excellent standing</p>
            <p className="text-2xl font-bold text-slate-900 relative z-10">94 <span className="text-xs font-normal text-slate-500">/100</span></p>
          </motion.div>
        </motion.div>

      </div>

      <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-slate-900 font-semibold tracking-tight">Recent Transactions</h3>
          <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Stripe Payout', desc: 'Settlement', amt: '+$14,200.50', pos: true, icon: ArrowDownRight, color: 'text-emerald-600 bg-emerald-50' },
            { name: 'AWS Cloud Services', desc: 'Infrastructure', amt: '-$3,450.00', pos: false, icon: ArrowUpRight, color: 'text-slate-600 bg-slate-50' },
            { name: 'Payroll Transfer', desc: 'Internal Transfer', amt: '-$42,100.00', pos: false, icon: ArrowUpRight, color: 'text-slate-600 bg-slate-50' },
            { name: 'Client Retainer', desc: 'Invoice #INV-2024', amt: '+$8,500.00', pos: true, icon: ArrowDownRight, color: 'text-emerald-600 bg-emerald-50' },
          ].map((tx, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center">
                <div className={cn("p-2 rounded-full mr-4", tx.color)}>
                  <tx.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{tx.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{tx.desc}</p>
                </div>
              </div>
              <span className={cn("text-sm font-bold", tx.pos ? "text-emerald-600" : "text-slate-900")}>
                {tx.amt}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
