import { motion } from 'framer-motion';
import { ShoppingBag, TrendingUp, Users, ArrowUpRight, DollarSign, CreditCard, ShoppingCart } from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 12 }).map((_, i) => ({
  name: `H${i * 2}`,
  revenue: Math.floor(Math.random() * 5000) + 2000,
}));

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeInUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Ecommerce() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8 pb-10">
      
      <motion.div variants={fadeInUp}>
        <h2 className="text-sm font-medium text-orange-600 mb-1">E-Commerce Domain</h2>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sales & Orders</h1>
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Revenue', value: '$24,192', change: '+8.2%', icon: DollarSign },
          { title: 'Orders', value: '1,482', change: '+12.5%', icon: ShoppingBag },
          { title: 'Conversion', value: '4.8%', change: '+1.2%', icon: TrendingUp },
          { title: 'Abandoned', value: '12.4%', change: '-2.4%', icon: ShoppingCart },
        ].map((kpi, i) => (
          <motion.div key={i} variants={fadeInUp} className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100/50 hover:shadow-md hover:border-orange-200 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-orange-50 rounded-xl text-orange-600 group-hover:scale-110 transition-transform">
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className="flex items-center text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {kpi.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-xs font-medium">{kpi.title}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{kpi.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 flex flex-col h-[400px]">
          <h3 className="text-slate-900 font-semibold tracking-tight mb-6">Revenue Today</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={40} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 overflow-hidden flex flex-col">
          <h3 className="text-slate-900 font-semibold tracking-tight mb-6">Live Order Feed</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
            {[
              { n: 'Sarah Jenkins', p: 'Nike Air Max 90', amt: '$129.00', loc: 'New York', t: '2 sec ago' },
              { n: 'Michael Chen', p: 'Sony WH-1000XM5', amt: '$348.00', loc: 'San Francisco', t: '45 sec ago' },
              { n: 'Emma Watson', p: 'Apple Watch Series 9', amt: '$399.00', loc: 'London', t: '2 min ago' },
              { n: 'David Kumar', p: 'Logitech MX Master 3', amt: '$99.00', loc: 'Toronto', t: '5 min ago' },
              { n: 'Lisa Ray', p: 'Kindle Paperwhite', amt: '$139.00', loc: 'Sydney', t: '8 min ago' },
            ].map((order, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm mr-3">
                    {order.n.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{order.p}</p>
                    <p className="text-[10px] text-slate-500">{order.n} • {order.loc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{order.amt}</p>
                  <p className="text-[10px] text-orange-500">{order.t}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
