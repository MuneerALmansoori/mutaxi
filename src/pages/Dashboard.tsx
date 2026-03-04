import React from "react";
import { 
  Users, 
  Car, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Star,
  Activity,
  ShieldCheck,
  MoreVertical
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";

const weeklyData = [
  { name: "السبت", trips: 400, revenue: 2400 },
  { name: "الأحد", trips: 300, revenue: 1398 },
  { name: "الاثنين", trips: 200, revenue: 9800 },
  { name: "الثلاثاء", trips: 278, revenue: 3908 },
  { name: "الأربعاء", trips: 189, revenue: 4800 },
  { name: "الخميس", trips: 239, revenue: 3800 },
  { name: "الجمعة", trips: 349, revenue: 4300 },
];

const driverStatusData = [
  { name: "نشط", value: 45, color: "#10b981" },
  { name: "مشغول", value: 30, color: "#f59e0b" },
  { name: "غير متصل", value: 25, color: "#94a3b8" },
];

const recentActivities = [
  { id: 1, type: "trip", user: "أحمد علي", action: "بدأ رحلة جديدة", time: "منذ دقيقتين", icon: Car, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 2, type: "driver", user: "سعد القحطاني", action: "تم توثيق رخصة القيادة", time: "منذ 15 دقيقة", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 3, type: "alert", user: "نظام التنبيه", action: "وثيقة تأمين منتهية لسائق", time: "منذ ساعة", icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  { id: 4, type: "review", user: "سارة خالد", action: "قيمت السائق بـ 5 نجوم", time: "منذ ساعتين", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
];

const topDrivers = [
  { name: "محمد العتيبي", trips: 142, rating: 4.9, status: "نشط" },
  { name: "فهد الشمري", trips: 128, rating: 4.8, status: "نشط" },
  { name: "عبدالله الدوسري", trips: 115, rating: 4.7, status: "مشغول" },
];

const StatCard = ({ title, value, change, icon: Icon, trend, colorClass }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-2 rounded-xl", colorClass || "bg-slate-50")}>
        <Icon className="text-slate-700" size={22} />
      </div>
      <div className={cn(
        "flex items-center text-xs font-bold px-2 py-1 rounded-full",
        trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
      )}>
        {trend === "up" ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowDownRight size={14} className="ml-1" />}
        {change}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-1 text-slate-900">{value}</p>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">مركز المراقبة والتحكم</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Activity size={16} className="text-emerald-500 animate-pulse" />
            تحديث مباشر للعمليات الجارية الآن
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                {i}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
              +12
            </div>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
            <TrendingUp size={16} />
            التقارير التحليلية
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الرحلات اليوم" value="1,284" change="+12.5%" icon={Car} trend="up" colorClass="bg-blue-50" />
        <StatCard title="السائقين المتصلين" value="158" change="+3.2%" icon={Users} trend="up" colorClass="bg-emerald-50" />
        <StatCard title="إيرادات اليوم" value="SAR 42,500" change="-1.4%" icon={TrendingUp} trend="down" colorClass="bg-amber-50" />
        <StatCard title="معدل الإلغاء" value="2.4%" change="-0.5%" icon={AlertCircle} trend="up" colorClass="bg-red-50" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">أداء الرحلات الأسبوعي</h3>
              <p className="text-sm text-slate-500">مقارنة بين عدد الرحلات والإيرادات</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl text-xs font-bold p-2 outline-none">
              <option>آخر 7 أيام</option>
              <option>آخر 30 يوم</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Area type="monotone" dataKey="trips" stroke="#10b981" fillOpacity={1} fill="url(#colorTrips)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Driver Status Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-2">حالة الأسطول</h3>
          <p className="text-sm text-slate-500 mb-6">توزيع السائقين حسب الحالة الحالية</p>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={driverStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {driverStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900">158</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">إجمالي السائقين</span>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {driverStatusData.map((status) => (
              <div key={status.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-sm font-bold text-slate-700">{status.name}</span>
                </div>
                <span className="text-sm font-black text-slate-900">{status.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900">النشاط المباشر</h3>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg animate-pulse">LIVE</span>
          </div>
          <div className="space-y-6 flex-1">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0", activity.bg)}>
                  <activity.icon size={18} className={activity.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900 truncate">{activity.user}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{activity.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.action}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-slate-600 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
            عرض كل السجلات
          </button>
        </div>

        {/* Top Drivers List */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">أفضل السائقين أداءً</h3>
          <div className="space-y-4">
            {topDrivers.map((driver, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-slate-50 rounded-2xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-lg">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{driver.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                        <Star size={10} fill="currentColor" /> {driver.rating}
                      </span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] font-bold text-slate-500">{driver.trips} رحلة</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-300 group-hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-200 text-white">
          <h3 className="text-xl font-black mb-6">إجراءات عاجلة</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">وثائق معلقة</p>
                  <p className="text-[10px] text-white/60">5 سائقين بانتظار المراجعة</p>
                </div>
              </div>
              <button className="text-[10px] font-black bg-white text-slate-900 px-3 py-1.5 rounded-lg">مراجعة</button>
            </div>
            
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">تحديثات النظام</p>
                  <p className="text-[10px] text-white/60">الإصدار 2.4 جاهز للتثبيت</p>
                </div>
              </div>
              <button className="text-[10px] font-black bg-white/20 text-white px-3 py-1.5 rounded-lg">تحديث</button>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex flex-col items-center text-center">
            <MapPin size={32} className="text-emerald-400 mb-2" />
            <p className="text-sm font-bold">تغطية الشبكة</p>
            <p className="text-[10px] text-white/60 mt-1">أداء ممتاز في الرياض وجدة اليوم</p>
          </div>
        </div>

      </div>
    </div>
  );
}

