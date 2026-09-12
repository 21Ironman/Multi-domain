import { motion } from 'framer-motion';
import { Heart, Activity, Thermometer, User, Clipboard, PlusCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const heartbeatData = Array.from({ length: 40 }).map((_, i) => {
  let val = 70 + Math.random() * 5;
  if (i % 10 === 0) val = 120;
  if (i % 10 === 1) val = 60;
  return { time: i, value: val };
});

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeInUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Healthcare() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8 pb-10">
      
      <motion.div variants={fadeInUp} className="flex justify-between items-end">
        <div>
          <h2 className="text-sm font-medium text-teal-600 mb-1">Healthcare Domain</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Overview</h1>
        </div>
        <button className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-teal-600/20">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Patient
        </button>
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Health Score', value: '92%', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
          { title: 'Heart Rate', value: '72 BPM', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
          { title: 'Blood Pressure', value: '118/76', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { title: 'Oxygen', value: '98%', icon: Thermometer, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-100' },
        ].map((metric, i) => (
          <motion.div key={i} variants={fadeInUp} className={cn("p-5 rounded-2xl shadow-sm border bg-white transition-transform hover:-translate-y-1 hover:shadow-md", metric.border)}>
            <div className="flex justify-between items-center mb-4">
              <div className={cn("p-2.5 rounded-xl", metric.bg, metric.color)}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{metric.title}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 flex flex-col h-[400px]">
          <h3 className="text-slate-900 font-semibold tracking-tight mb-6">Real-time Vitals</h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heartbeatData}>
                <defs>
                  <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorHeart)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 overflow-hidden">
          <h3 className="text-slate-900 font-semibold tracking-tight mb-6">Medical Timeline</h3>
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 no-scrollbar overflow-y-auto h-[300px] pr-2">
            {[
              { title: 'Patient Consultation', desc: 'Dr. Sarah Smith', time: '10:00 AM', icon: User, color: 'bg-teal-500' },
              { title: 'Blood Test Results', desc: 'All levels normal', time: '11:30 AM', icon: Clipboard, color: 'bg-indigo-500' },
              { title: 'Medication Updated', desc: 'Prescription renewed', time: '1:15 PM', icon: PlusCircle, color: 'bg-rose-500' },
              { title: 'Follow-up Scheduled', desc: 'Next week, 2:00 PM', time: '3:45 PM', icon: Activity, color: 'bg-amber-500' },
            ].map((event, i) => (
              <div key={i} className="relative pl-6">
                <span className={cn("absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm", event.color)} />
                <h4 className="text-sm font-bold text-slate-800">{event.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{event.desc}</p>
                <span className="text-[10px] text-teal-600 font-medium mt-1 block">{event.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
