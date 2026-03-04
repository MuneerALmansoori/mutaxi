import React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download,
  Star,
  Car,
  ShieldCheck,
  ShieldAlert,
  Wallet,
  Phone,
  UserCheck,
  UserX,
  Eye,
  FileText,
  Clock,
  Calendar,
  Image as ImageIcon,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

const drivers = [
  { 
    id: 1, 
    name: "سعد القحطاني", 
    email: "saad@example.com", 
    phone: "0501112222", 
    rating: 4.9, 
    trips: 1240, 
    balance: "SAR 1,250.00", 
    status: "ONLINE",
    vehicle: "تويوتا كامري 2023",
    plate: "أ ب ج 1234",
    joinedDate: "2022-01-15",
    documents: { 
      license: { status: "Valid", expiry: "2025-12-01" }, 
      insurance: { status: "Valid", expiry: "2024-11-15" }, 
      registration: { status: "Valid", expiry: "2026-01-10" } 
    },
    vehicleImages: [
      "https://picsum.photos/seed/car1/400/300",
      "https://picsum.photos/seed/car2/400/300",
      "https://picsum.photos/seed/car3/400/300"
    ]
  },
  { 
    id: 2, 
    name: "محمد العتيبي", 
    email: "mohammed@example.com", 
    phone: "0553334444", 
    rating: 4.7, 
    trips: 850, 
    balance: "SAR 450.00", 
    status: "BUSY",
    vehicle: "هيونداي سوناتا 2022",
    plate: "د هـ و 5678",
    joinedDate: "2022-06-20",
    documents: { 
      license: { status: "Valid", expiry: "2025-05-12" }, 
      insurance: { status: "Valid", expiry: "2024-09-30" }, 
      registration: { status: "Valid", expiry: "2025-08-22" } 
    },
    vehicleImages: [
      "https://picsum.photos/seed/car4/400/300",
      "https://picsum.photos/seed/car5/400/300"
    ]
  },
  { 
    id: 3, 
    name: "خالد الشمري", 
    email: "khaled@example.com", 
    phone: "0545556666", 
    rating: 4.2, 
    trips: 120, 
    balance: "SAR 0.00", 
    status: "OFFLINE",
    vehicle: "كيا كادينزا 2021",
    plate: "ز ح ط 9012",
    joinedDate: "2023-11-05",
    documents: { 
      license: { status: "Expired", expiry: "2024-01-10" }, 
      insurance: { status: "Valid", expiry: "2025-03-15" }, 
      registration: { status: "Valid", expiry: "2025-12-20" } 
    },
    vehicleImages: [
      "https://picsum.photos/seed/car6/400/300",
      "https://picsum.photos/seed/car7/400/300"
    ]
  },
  { 
    id: 4, 
    name: "بندر الدوسري", 
    email: "bandar@example.com", 
    phone: "0567778888", 
    rating: 3.8, 
    trips: 2100, 
    balance: "SAR -120.00", 
    status: "SUSPENDED",
    vehicle: "فورد تورس 2020",
    plate: "ي ك ل 3456",
    joinedDate: "2021-03-10",
    documents: { 
      license: { status: "Valid", expiry: "2026-06-05" }, 
      insurance: { status: "Expired", expiry: "2023-12-20" }, 
      registration: { status: "Valid", expiry: "2025-04-18" } 
    },
    vehicleImages: [
      "https://picsum.photos/seed/car8/400/300",
      "https://picsum.photos/seed/car9/400/300"
    ]
  },
];

export default function DriversPage() {
  const [driverList, setDriverList] = React.useState(drivers);
  const [selectedDriver, setSelectedDriver] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editingDoc, setEditingDoc] = React.useState<string | null>(null);

  const filteredDrivers = driverList.filter(d => 
    d.name.includes(searchQuery) || d.phone.includes(searchQuery) || d.vehicle.includes(searchQuery)
  );

  const toggleDriverStatus = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal
    setDriverList(prev => prev.map(d => {
      if (d.id === id) {
        const newStatus = d.status === 'SUSPENDED' ? 'OFFLINE' : 'SUSPENDED';
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  const updateDocument = (driverId: number, docKey: string, newExpiry: string) => {
    setDriverList(prev => prev.map(d => {
      if (d.id === driverId) {
        const today = new Date().toISOString().split('T')[0];
        const newStatus = newExpiry >= today ? 'Valid' : 'Expired';
        const updatedDriver = {
          ...d,
          documents: {
            ...d.documents,
            [docKey]: { status: newStatus, expiry: newExpiry }
          }
        };
        if (selectedDriver && selectedDriver.id === driverId) {
          setSelectedDriver(updatedDriver);
        }
        return updatedDriver;
      }
      return d;
    }));
    setEditingDoc(null);
  };

  const toggleDocumentStatus = (driverId: number, docKey: string) => {
    setDriverList(prev => prev.map(d => {
      if (d.id === driverId) {
        const currentDoc = (d.documents as any)[docKey];
        const newStatus = currentDoc.status === 'Valid' ? 'Expired' : 'Valid';
        const updatedDriver = {
          ...d,
          documents: {
            ...d.documents,
            [docKey]: { ...currentDoc, status: newStatus }
          }
        };
        if (selectedDriver && selectedDriver.id === driverId) {
          setSelectedDriver(updatedDriver);
        }
        return updatedDriver;
      }
      return d;
    }));
  };

  const getDocAlert = (driver: any) => {
    const today = new Date("2026-03-04");
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const alerts = Object.entries(driver.documents).map(([key, doc]: [string, any]) => {
      const expiryDate = new Date(doc.expiry);
      if (doc.status === 'Expired' || expiryDate < today) {
        return { key, type: 'EXPIRED' };
      }
      if (expiryDate <= thirtyDaysFromNow) {
        return { key, type: 'EXPIRING_SOON' };
      }
      return null;
    }).filter(Boolean);

    return alerts;
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">إدارة السائقين</h1>
          <p className="text-slate-500">التحكم الكامل في حسابات السائقين، المركبات، والوثائق.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Download size={16} />
            تصدير التقارير
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
            <Plus size={16} />
            إضافة سائق جديد
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <UserCheck size={20} />
            </div>
            <span className="text-emerald-500 text-xs font-bold">+12 اليوم</span>
          </div>
          <div className="text-2xl font-bold">1,240</div>
          <div className="text-slate-500 text-xs font-medium">سائق نشط حالياً</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Car size={20} />
            </div>
            <span className="text-blue-500 text-xs font-bold">85% إشغال</span>
          </div>
          <div className="text-2xl font-bold">842</div>
          <div className="text-slate-500 text-xs font-medium">في رحلات نشطة</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <FileText size={20} />
            </div>
            <span className="text-orange-500 text-xs font-bold">عاجل</span>
          </div>
          <div className="text-2xl font-bold">18</div>
          <div className="text-slate-500 text-xs font-medium">وثائق منتهية الصلاحية</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <ShieldAlert size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold">5</div>
          <div className="text-slate-500 text-xs font-medium">سائقين محظورين مؤخراً</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="البحث بالاسم، رقم الجوال، أو لوحة السيارة..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
              <Filter size={16} />
              تصفية الحالة
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">السائق والمركبة</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">تنشيط الحساب</th>
                <th className="px-6 py-4 font-medium">الرحلات / التقييم</th>
                <th className="px-6 py-4 font-medium">المحفظة</th>
                <th className="px-6 py-4 font-medium">الوثائق</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDrivers.map((d) => {
                const alerts = getDocAlert(d);
                const hasAlert = alerts.length > 0;
                const hasExpired = alerts.some((a: any) => a.type === 'EXPIRED');

                return (
                  <tr 
                    key={d.id} 
                    onClick={() => setSelectedDriver(d)}
                    className={cn(
                      "hover:bg-slate-50/80 transition-colors cursor-pointer group",
                      hasExpired && "bg-red-50/30",
                      !hasExpired && hasAlert && "bg-orange-50/30"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg border border-slate-200 group-hover:border-emerald-200 transition-colors">
                            {d.name.charAt(0)}
                          </div>
                          {hasAlert && (
                            <div className={cn(
                              "absolute -top-1 -right-1 p-1 rounded-full border-2 border-white shadow-sm",
                              hasExpired ? "bg-red-500" : "bg-orange-500"
                            )}>
                              <ShieldAlert size={10} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            {d.name}
                            {hasAlert && (
                              <span className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded font-bold",
                                hasExpired ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                              )}>
                                {hasExpired ? "وثائق منتهية" : "تنتهي قريباً"}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Car size={12} className="text-emerald-500" />
                            {d.vehicle} • {d.plate}
                          </div>
                        </div>
                      </div>
                    </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5 w-fit",
                      d.status === 'ONLINE' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      d.status === 'BUSY' ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      d.status === 'OFFLINE' ? "bg-slate-100 text-slate-500 border border-slate-200" :
                      "bg-red-50 text-red-600 border border-red-100"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        d.status === 'ONLINE' ? "bg-emerald-500" :
                        d.status === 'BUSY' ? "bg-blue-500" :
                        d.status === 'OFFLINE' ? "bg-slate-400" :
                        "bg-red-500"
                      )} />
                      {d.status === 'ONLINE' ? 'متصل' : d.status === 'BUSY' ? 'في رحلة' : d.status === 'OFFLINE' ? 'غير متصل' : 'محظور'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={(e) => toggleDriverStatus(d.id, e)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                        d.status !== 'SUSPENDED' ? "bg-emerald-500" : "bg-slate-300"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          d.status !== 'SUSPENDED' ? "-translate-x-6" : "-translate-x-1"
                        )}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900">{d.trips} رحلة</div>
                    <div className="flex items-center gap-1 text-xs font-medium text-yellow-600 mt-0.5">
                      <Star size={12} className="fill-yellow-500 text-yellow-500" />
                      {d.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "text-sm font-bold",
                      d.balance.includes('-') ? "text-red-600" : "text-emerald-600"
                    )}>
                      {d.balance}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <div className="group/doc relative">
                        <div className={cn(
                          "p-1.5 rounded-md transition-colors",
                          d.documents.license.status === 'Valid' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}>
                          <ShieldCheck size={16} />
                        </div>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover/doc:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                          الرخصة: {d.documents.license.status === 'Valid' ? 'سارية' : 'منتهية'} ({d.documents.license.expiry})
                        </span>
                      </div>
                      <div className="group/doc relative">
                        <div className={cn(
                          "p-1.5 rounded-md transition-colors",
                          d.documents.insurance.status === 'Valid' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}>
                          <FileText size={16} />
                        </div>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover/doc:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                          التأمين: {d.documents.insurance.status === 'Valid' ? 'ساري' : 'منتهي'} ({d.documents.insurance.expiry})
                        </span>
                      </div>
                      <div className="group/doc relative">
                        <div className={cn(
                          "p-1.5 rounded-md transition-colors",
                          d.documents.registration.status === 'Valid' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}>
                          <Car size={16} />
                        </div>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover/doc:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                          الاستمارة: {d.documents.registration.status === 'Valid' ? 'سارية' : 'منتهية'} ({d.documents.registration.expiry})
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>

      {/* Driver Detail Modal */}
      <AnimatePresence>
        {selectedDriver && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDriver(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-bold shadow-xl">
                    {selectedDriver.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedDriver.name}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Phone size={14} /> {selectedDriver.phone}
                      </span>
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Car size={14} /> {selectedDriver.vehicle}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedDriver(null)}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Alerts Summary */}
                {(() => {
                  const alerts = getDocAlert(selectedDriver);
                  if (alerts.length === 0) return null;
                  const hasExpired = alerts.some((a: any) => a.type === 'EXPIRED');
                  
                  return (
                    <div className={cn(
                      "p-4 rounded-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-2",
                      hasExpired ? "bg-red-50 border-red-100 text-red-800" : "bg-orange-50 border-orange-100 text-orange-800"
                    )}>
                      <div className={cn(
                        "p-2 rounded-xl",
                        hasExpired ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                      )}>
                        <ShieldAlert size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">
                          {hasExpired ? "تنبيه: وثائق منتهية" : "تنبيه: وثائق تنتهي قريباً"}
                        </div>
                        <div className="text-xs opacity-80">
                          يوجد {alerts.length} وثائق تتطلب اهتماماً فورياً لتجنب توقف السائق عن العمل.
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Action Bar */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors">
                    <Wallet size={18} /> شحن المحفظة
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
                    <FileText size={18} /> عرض الوثائق
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-700 py-2.5 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors">
                    <ShieldAlert size={18} /> حظر السائق
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Stats Card */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-slate-400 text-[10px] font-bold uppercase mb-1">إجمالي الدخل</div>
                        <div className="text-lg font-bold text-slate-900">SAR 42,500</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-slate-400 text-[10px] font-bold uppercase mb-1">التقييم</div>
                        <div className="text-lg font-bold text-yellow-600 flex items-center gap-1">
                          {selectedDriver.rating} <Star className="fill-yellow-500 text-yellow-500" size={16} />
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-slate-400 text-[10px] font-bold uppercase mb-1">تاريخ الانضمام</div>
                        <div className="text-lg font-bold text-slate-900">{selectedDriver.joinedDate}</div>
                      </div>
                    </div>

                    {/* Documents Status */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                      <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        حالة الوثائق الرسمية
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(selectedDriver.documents).map(([key, doc]: [string, any]) => {
                          const docAlert = getDocAlert(selectedDriver).find((a: any) => a.key === key);
                          
                          return (
                            <div key={key} className={cn(
                              "flex flex-col p-3 rounded-xl space-y-2 border transition-colors",
                              docAlert?.type === 'EXPIRED' ? "bg-red-50 border-red-100" :
                              docAlert?.type === 'EXPIRING_SOON' ? "bg-orange-50 border-orange-100" :
                              "bg-slate-50 border-transparent"
                            )}>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                  {key === 'license' ? 'رخصة القيادة' : key === 'insurance' ? 'تأمين المركبة' : 'استمارة السيارة'}
                                </span>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => toggleDocumentStatus(selectedDriver.id, key)}
                                    className={cn(
                                      "text-[10px] font-bold px-2 py-0.5 rounded transition-all active:scale-95 hover:opacity-80",
                                      doc.status === 'Valid' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                    )}
                                  >
                                    {doc.status === 'Valid' ? 'سارية' : 'منتهية'}
                                  </button>
                                  <button 
                                    onClick={() => setEditingDoc(editingDoc === key ? null : key)}
                                    className={cn(
                                      "p-1 rounded text-slate-400 transition-colors",
                                      editingDoc === key ? "bg-slate-200 text-slate-600" : "hover:bg-slate-200"
                                    )}
                                  >
                                    <Clock size={14} />
                                  </button>
                                </div>
                              </div>
                              
                              {editingDoc === key ? (
                                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                                  <input 
                                    type="date" 
                                    defaultValue={doc.expiry}
                                    className="flex-1 text-xs p-1.5 border border-slate-200 rounded bg-white"
                                    onBlur={(e) => updateDocument(selectedDriver.id, key, e.target.value)}
                                  />
                                  <button 
                                    className="text-[10px] font-bold text-emerald-600"
                                    onClick={() => setEditingDoc(null)}
                                  >
                                    حفظ
                                  </button>
                                </div>
                              ) : (
                                <div className={cn(
                                  "text-[10px] flex items-center gap-1",
                                  docAlert?.type === 'EXPIRED' ? "text-red-600 font-bold" :
                                  docAlert?.type === 'EXPIRING_SOON' ? "text-orange-600 font-bold" :
                                  "text-slate-400"
                                )}>
                                  <Calendar size={10} />
                                  تاريخ الانتهاء: {doc.expiry}
                                  {docAlert?.type === 'EXPIRING_SOON' && " (تنتهي قريباً)"}
                                  {docAlert?.type === 'EXPIRED' && " (منتهية)"}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Vehicle Images */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                      <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <ImageIcon size={18} className="text-blue-500" />
                        صور المركبة
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedDriver.vehicleImages?.map((img: string, idx: number) => (
                          <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 group/img">
                            <img 
                              src={img} 
                              alt={`مركبة ${idx + 1}`} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                                <Eye size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className="aspect-video rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all bg-slate-50/50">
                          <Plus size={20} />
                          <span className="text-[10px] font-bold">إضافة صورة</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Side Info */}
                  <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-5 rounded-2xl">
                      <h3 className="text-xs font-bold uppercase text-slate-400 mb-4">بيانات المركبة</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase">الموديل</div>
                          <div className="text-sm font-bold">{selectedDriver.vehicle}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase">رقم اللوحة</div>
                          <div className="text-sm font-bold">{selectedDriver.plate}</div>
                        </div>
                        <div className="pt-4 border-t border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase">الحالة الفنية</div>
                          <div className="text-sm font-bold text-emerald-400">ممتازة</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-2xl">
                      <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <Clock size={18} className="text-blue-500" />
                        آخر النشاطات
                      </h3>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                          <div>
                            <div className="text-xs font-bold">رحلة مكتملة</div>
                            <div className="text-[10px] text-slate-500">منذ 15 دقيقة</div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-1 h-8 bg-blue-500 rounded-full" />
                          <div>
                            <div className="text-xs font-bold">تسجيل دخول</div>
                            <div className="text-[10px] text-slate-500">منذ ساعتين</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                  حفظ التغييرات
                </button>
                <button 
                  onClick={() => setSelectedDriver(null)}
                  className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
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
