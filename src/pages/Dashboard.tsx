import { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { RefreshCw, Eye, Users, DollarSign, Activity, Monitor, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

const generateArea = (points: number) => Array.from({ length: points }).map((_, i) => ({
  name: `Nov ${i + 1}`,
  views: Math.floor(Math.random() * 50) + 10,
  conversions: Math.floor(Math.random() * 20) + 5,
}));

const stackedBarData = [
  { name: 'Q1', APAC: 40.8, EMEA: 45, LATAM: 20, UCAN: 120 },
  { name: 'Q2', APAC: 48.9, EMEA: 55, LATAM: 25, UCAN: 140 },
  { name: 'Q3', APAC: 47.8, EMEA: 50, LATAM: 22, UCAN: 135 },
  { name: 'Q4', APAC: 46.4, EMEA: 48, LATAM: 24, UCAN: 130 },
  { name: 'Q1 22', APAC: 45.3, EMEA: 46, LATAM: 23, UCAN: 128 },
  { name: 'Q2 22', APAC: 52.3, EMEA: 55, LATAM: 26, UCAN: 145 },
  { name: 'Q3 22', APAC: 65.4, EMEA: 60, LATAM: 30, UCAN: 214.5 },
];

const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); } 
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const fadeInUp = { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4,  } } };

export default function Dashboard() {
  const chartData = generateArea(14);

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6 pb-10">
      
      {/* KPI Cards row */}
      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Views', value: 5800000, suffix: '+', bg: 'bg-[#ff9900]/10', border: 'border-[#ff9900]/30', color: 'text-[#ff9900]', icon: Eye },
          { title: 'Conversions', value: 295800, bg: 'bg-[#06b6d4]/10', border: 'border-[#06b6d4]/30', color: 'text-[#06b6d4]', icon: Activity },
          { title: 'Avg Session', value: 22, suffix: 'm', bg: 'bg-[#a855f7]/10', border: 'border-[#a855f7]/30', color: 'text-[#a855f7]', icon: Users },
          { title: 'Revenue', value: 889, prefix: '$', bg: 'bg-[#10b981]/10', border: 'border-[#10b981]/30', color: 'text-[#10b981]', icon: DollarSign },
        ].map((kpi, i) => (
          <motion.div key={i} variants={fadeInUp} className={cn("relative p-5 rounded-xl border bg-[#12121a] shadow-lg overflow-hidden group hover:bg-[#161622] transition-all", kpi.border)}>
            <div className={cn("absolute right-0 top-0 w-24 h-24 rounded-full blur-3xl opacity-20 -mr-10 -mt-10", kpi.bg)} />
            <div className="flex justify-between items-start mb-2 relative z-10">
              <h3 className="text-slate-400 text-sm font-medium">{kpi.title}</h3>
              <kpi.icon className={cn("w-4 h-4 opacity-70", kpi.color)} />
            </div>
            <p className={cn("text-3xl font-bold tracking-tight mt-1 relative z-10", kpi.color)}>
              <AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Audience Insights Graph */}
        <motion.div variants={fadeInUp} className="xl:col-span-2 bg-[#12121a] rounded-xl border border-white/5 p-5 shadow-lg flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold tracking-wide">Audience Insights Graph</h3>
            <div className="flex space-x-4 text-xs font-medium">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#ec4899] mr-2"/>Conversions</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#06b6d4] mr-2"/>Watch Time</span>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff0a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ fontWeight: 600 }}
                  isAnimationActive={false}
                />
                <Line type="monotone" dataKey="views" name="Watch Time" stroke="#06b6d4" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#06b6d4', stroke: '#0f172a', strokeWidth: 2 }} isAnimationActive={true} animationDuration={1500} />
                <Line type="monotone" dataKey="conversions" name="Conversions" stroke="#ec4899" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#ec4899', stroke: '#0f172a', strokeWidth: 2 }} isAnimationActive={true} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div variants={fadeInUp} className="bg-[#12121a] rounded-xl border border-white/5 p-5 shadow-lg flex flex-col h-[400px]">
          <h3 className="text-white font-semibold tracking-wide mb-6">Device Breakdown</h3>
          <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-2">
            
            <div>
              <div className="flex items-center text-sm font-medium text-[#ec4899] mb-3">
                <Monitor className="w-4 h-4 mr-2" /> Top TV Devices
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Samsung QLED', pct: 26 },
                  { name: 'LG OLED', pct: 20 },
                  { name: 'Sony Bravia', pct: 14 },
                  { name: 'Hisense U8', pct: 11 },
                ].map(d => (
                  <div key={d.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{d.name}</span>
                      <span className="text-slate-400">{d.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${d.pct}%` }} transition={{ duration: 1,  }} className="h-full bg-[#ec4899]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center text-sm font-medium text-[#06b6d4] mb-3">
                <Smartphone className="w-4 h-4 mr-2" /> Top Phone Devices
              </div>
              <div className="space-y-3">
                {[
                  { name: 'iPhone 15 Pro', pct: 45 },
                  { name: 'Google Pixel 8', pct: 25 },
                  { name: 'Samsung S24', pct: 15 },
                  { name: 'Other', pct: 15 },
                ].map(d => (
                  <div key={d.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{d.name}</span>
                      <span className="text-slate-400">{d.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${d.pct}%` }} transition={{ duration: 1,  }} className="h-full bg-[#06b6d4]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Revenue Contribution Stacked Chart */}
      <motion.div variants={fadeInUp} className="bg-[#12121a] rounded-xl border border-white/5 p-5 shadow-lg flex flex-col lg:flex-row h-auto lg:h-[400px]">
        
        <div className="flex-1 pr-0 lg:pr-6 mb-6 lg:mb-0 flex flex-col">
          <h3 className="text-white font-semibold tracking-wide mb-2">Revenue Contribution Over Time</h3>
          <p className="text-xs text-slate-400 mb-6">Total revenue contribution across all regions is <span className="text-white font-bold">$214.46M</span></p>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stackedBarData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff0a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(val) => `$${val}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
                <Bar dataKey="APAC" stackId="a" fill="#a855f7" radius={[0, 0, 4, 4]} isAnimationActive={true} animationDuration={1000} />
                <Bar dataKey="EMEA" stackId="a" fill="#ec4899" isAnimationActive={true} animationDuration={1000} />
                <Bar dataKey="LATAM" stackId="a" fill="#f43f5e" isAnimationActive={true} animationDuration={1000} />
                <Bar dataKey="UCAN" stackId="a" fill="#f97316" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full lg:w-72 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0">
          <h3 className="text-white font-semibold tracking-wide mb-2">Cumulative Revenue</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            UCAN contributing to the highest cumulative revenue across all the regions.
          </p>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">
              <span>Region</span>
              <span>Cumulative</span>
            </div>
            {[
              { region: 'Worldwide', val: '$550M', color: 'text-white' },
              { region: 'UCAN', val: '$219M', color: 'text-[#f97316]' },
              { region: 'EMEA', val: '$206M', color: 'text-[#ec4899]' },
              { region: 'LATAM', val: '$67M', color: 'text-[#f43f5e]' },
              { region: 'APAC', val: '$59M', color: 'text-[#a855f7]' },
            ].map(r => (
              <div key={r.region} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center">
                  <div className={cn("w-2 h-2 rounded-full mr-3", r.region === 'Worldwide' ? 'bg-white' : `bg-[${r.color.replace('text-[', '').replace(']', '')}]`)} 
                       style={r.region !== 'Worldwide' ? { backgroundColor: r.color.replace('text-[', '').replace(']', '') } : {}}/>
                  <span className="text-sm text-slate-300">{r.region}</span>
                </div>
                <span className={cn("text-lg font-bold", r.color)}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>

    </motion.div>
  );
}
