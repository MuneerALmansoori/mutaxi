import React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download,
  Star,
  Wallet,
  MapPin,
  X,
  Clock,
  Calendar,
  CreditCard,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const passengers = [
  { 
    id: 1, 
    name: "عبدالله العتيبي", 
    email: "abdullah@example.com", 
    phone: "0501234567", 
    rating: 4.9, 
    trips: 142, 
    balance: "SAR 120.50", 
    status: "Active",
    joinedDate: "2023-05-12",
    notes: "عميل مميز، يفضل السيارات العائلية.",
    history: [
      { id: "TRP-101", date: "2024-03-01", from: "مطار الملك خالد", to: "حي النخيل", fare: "SAR 85.00", status: "Completed" },
      { id: "TRP-105", date: "2024-02-28", from: "برج المملكة", to: "حي الملقا", fare: "SAR 42.00", status: "Completed" },
    ]
  },
  { 
    id: 2, 
    name: "ليلى الأحمد", 
    email: "layla@example.com", 
    phone: "0559876543", 
    rating: 4.8, 
    trips: 86, 
    balance: "SAR 45.00", 
    status: "Active",
    joinedDate: "2023-08-20",
    notes: "تستخدم التطبيق بشكل يومي للعمل.",
    history: [
      { id: "TRP-202", date: "2024-03-02", from: "حي الياسمين", to: "الرياض بارك", fare: "SAR 30.00", status: "Completed" },
    ]
  },
  { 
    id: 3, 
    name: "عمر الحربي", 
    email: "omar@example.com", 
    phone: "0543210987", 
    rating: 4.5, 
    trips: 12, 
    balance: "SAR 0.00", 
    status: "Inactive",
    joinedDate: "2024-01-05",
    notes: "حساب جديد.",
    history: []
  },
  { 
    id: 4, 
    name: "ريم القحطاني", 
    email: "reem@example.com", 
    phone: "0567891234", 
    rating: 5.0, 
    trips: 215, 
    balance: "SAR 350.75", 
    status: "Active",
    joinedDate: "2022-11-30",
    notes: "عضوية ذهبية.",
    history: [
      { id: "TRP-303", date: "2024-03-03", from: "حي السفارات", to: "الدرعية", fare: "SAR 65.00", status: "Completed" },
    ]
  },
];

export default function PassengersPage() {
  const [selectedPassenger, setSelectedPassenger] = React.useState<any>(null);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">إدارة الركاب</h1>
          <p className="text-slate-500">عرض وإدارة بيانات الركاب المسجلين في النظام.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Download size={16} />
            تصدير
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
            <Plus size={16} />
            إضافة راكب
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">إجمالي الركاب</div>
          <div className="text-3xl font-bold">12,450</div>
          <div className="text-emerald-500 text-xs mt-2 font-medium">+15% هذا الشهر</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">متوسط التقييم</div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold">4.8</div>
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
          </div>
          <div className="text-slate-400 text-xs mt-2">بناءً على 50k رحلة</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">أرصدة المحفظة</div>
          <div className="text-3xl font-bold">SAR 84,200</div>
          <div className="text-slate-400 text-xs mt-2">إجمالي المبالغ المودعة</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="البحث بالاسم، البريد، أو رقم الجوال..." 
              className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
            <Filter size={16} />
            تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">الراكب</th>
                <th className="px-6 py-4 font-medium">رقم الجوال</th>
                <th className="px-6 py-4 font-medium">الرحلات</th>
                <th className="px-6 py-4 font-medium">التقييم</th>
                <th className="px-6 py-4 font-medium">المحفظة</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {passengers.map((p) => (
                <tr 
                  key={p.id} 
                  onClick={() => setSelectedPassenger(p)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                        {p.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-base font-bold text-slate-900 leading-tight">{p.name}</div>
                        <div className="text-sm text-slate-500 mt-0.5">{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{p.phone}</td>
                  <td className="px-6 py-4 text-sm font-bold">{p.trips}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm font-bold">
                      {p.rating}
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-emerald-600">{p.balance}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {p.status === 'Active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Passenger Detail Modal */}
      <AnimatePresence>
        {selectedPassenger && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPassenger(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {selectedPassenger.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedPassenger.name}</h2>
                    <p className="text-sm text-slate-500">{selectedPassenger.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPassenger(null)}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                      <Calendar size={12} /> تاريخ الانضمام
                    </div>
                    <div className="text-sm font-bold">{selectedPassenger.joinedDate}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                      <Star size={12} /> التقييم العام
                    </div>
                    <div className="text-sm font-bold flex items-center gap-1">
                      {selectedPassenger.rating} <Star className="text-yellow-400 fill-yellow-400" size={12} />
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                      <Clock size={12} /> إجمالي الرحلات
                    </div>
                    <div className="text-sm font-bold">{selectedPassenger.trips}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                      <CreditCard size={12} /> الرصيد الحالي
                    </div>
                    <div className="text-sm font-bold text-emerald-600">{selectedPassenger.balance}</div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare size={18} className="text-emerald-500" />
                    ملاحظات إضافية
                  </h3>
                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-sm text-slate-700 leading-relaxed">
                    {selectedPassenger.notes || "لا توجد ملاحظات مسجلة لهذا الراكب."}
                  </div>
                </div>

                {/* Trip History Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Clock size={18} className="text-emerald-500" />
                    سجل الرحلات الأخيرة
                  </h3>
                  <div className="space-y-3">
                    {selectedPassenger.history.length > 0 ? (
                      selectedPassenger.history.map((trip: any) => (
                        <div key={trip.id} className="p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-900">{trip.id}</span>
                            <span className="text-[10px] text-slate-400">{trip.date}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-slate-600">
                                <MapPin size={14} className="text-emerald-500" />
                                {trip.from}
                              </div>
                              <div className="flex items-center gap-2 text-slate-600 mt-1">
                                <MapPin size={14} className="text-red-500" />
                                {trip.to}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-slate-900">{trip.fare}</div>
                              <div className="text-[10px] text-emerald-600 font-bold uppercase">{trip.status}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-400 text-sm italic">
                        لا يوجد سجل رحلات متاح حالياً.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                  تعديل البيانات
                </button>
                <button 
                  onClick={() => setSelectedPassenger(null)}
                  className="flex-1 bg-white border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
