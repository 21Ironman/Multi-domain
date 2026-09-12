import { motion } from 'framer-motion';
import { Play, Video, Users, Clock, PlayCircle, Eye } from 'lucide-react';
import { cn } from '../lib/utils';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const watchData = Array.from({ length: 7 }).map((_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  hours: Math.floor(Math.random() * 50) + 20,
}));

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeInUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Streaming() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8 pb-10">
      
      <motion.div variants={fadeInUp}>
        <h2 className="text-sm font-medium text-purple-600 mb-1">Streaming Analytics</h2>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Content Performance</h1>
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Concurrent Viewers', value: '14,291', change: '+18%', icon: Users },
          { title: 'Avg. Watch Time', value: '45m 12s', change: '+5%', icon: Clock },
          { title: 'Active Streams', value: '1,204', change: '-2%', icon: Video },
        ].map((kpi, i) => (
          <motion.div key={i} variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100/50 hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <kpi.icon className="w-32 h-32 text-purple-600" />
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium relative z-10">{kpi.title}</h3>
            <p className="text-3xl font-bold text-slate-900 mt-1 relative z-10">{kpi.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-900 font-semibold tracking-tight">Trending Content</h3>
            <button className="text-sm text-purple-600 font-medium hover:text-purple-700">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/5] bg-slate-100 border border-slate-200 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 duration-300">
                  <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h4 className="text-white font-bold text-lg leading-tight mb-1">Original Series {i}</h4>
                  <div className="flex items-center text-purple-200 text-xs font-medium">
                    <Eye className="w-3 h-3 mr-1" /> 1.2M views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 flex flex-col">
          <h3 className="text-slate-900 font-semibold tracking-tight mb-6">Watch Time (Hours)</h3>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={watchData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="hours" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
