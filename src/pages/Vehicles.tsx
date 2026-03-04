import React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download,
  Car,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Image as ImageIcon,
  X,
  Eye,
  User,
  Clock,
  Info,
  ArrowRight,
  ChevronRight,
  Settings,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Link as LinkIcon,
  Star,
  Shield,
  FileText,
  CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

// Mock Data for Vehicles
const vehicles = [
  { 
    id: "V-1001", 
    image: "https://picsum.photos/seed/car1/400/300", 
    type: "سيارة", 
    brand: "تويوتا",
    model: "كامري", 
    year: "2023", 
    plate: "أ ب ج 1234", 
    color: "أبيض",
    status: "Active",
    registrationDate: "2023-01-15",
    lastUpdate: "منذ ساعتين",
    drivers: [
      { id: 1, name: "سعد القحطاني", avatar: "S" }
    ],
    images: [
      "https://picsum.photos/seed/car1/400/300",
      "https://picsum.photos/seed/car1-2/400/300",
      "https://picsum.photos/seed/car1-3/400/300"
    ],
    maintenance: [
      { id: 1, date: "2024-01-10", type: "تغيير زيت", cost: "SAR 250", status: "Completed" },
      { id: 2, date: "2023-11-05", type: "فحص دوري", cost: "SAR 500", status: "Completed" },
    ],
    documents: {
      license: "Valid",
      insurance: "Valid",
      registration: "Valid"
    }
  },
  { 
    id: "V-1002", 
    image: "https://picsum.photos/seed/car4/400/300", 
    type: "فان", 
    brand: "هيونداي",
    model: "H1", 
    year: "2022", 
    plate: "د هـ و 5678", 
    color: "فضي",
    status: "Active",
    registrationDate: "2022-06-20",
    lastUpdate: "منذ 15 دقيقة",
    drivers: [
      { id: 2, name: "محمد العتيبي", avatar: "M" }
    ],
    images: [
      "https://picsum.photos/seed/car4/400/300",
      "https://picsum.photos/seed/car4-2/400/300"
    ],
    maintenance: [
      { id: 1, date: "2024-02-15", type: "تغيير إطارات", cost: "SAR 1,200", status: "Completed" },
    ],
    documents: {
      license: "Valid",
      insurance: "Expired",
      registration: "Valid"
    }
  },
  { 
    id: "V-1003", 
    image: "https://picsum.photos/seed/car6/400/300", 
    type: "سيارة", 
    brand: "كيا",
    model: "كادينزا", 
    year: "2021", 
    plate: "ز ح ط 9012", 
    color: "أسود",
    status: "Inactive",
    registrationDate: "2021-11-05",
    lastUpdate: "منذ يومين",
    drivers: [],
    images: [
      "https://picsum.photos/seed/car6/400/300"
    ],
    maintenance: [],
    documents: {
      license: "Expired",
      insurance: "Expired",
      registration: "Expired"
    }
  },
  { 
    id: "V-1004", 
    image: "https://picsum.photos/seed/car8/400/300", 
    type: "باص", 
    brand: "مرسيدس",
    model: "سبرينتر", 
    year: "2020", 
    plate: "ي ك ل 3456", 
    color: "أبيض",
    status: "Suspended",
    registrationDate: "2020-03-10",
    lastUpdate: "منذ أسبوع",
    drivers: [
      { id: 4, name: "بندر الدوسري", avatar: "B" }
    ],
    images: [
      "https://picsum.photos/seed/car8/400/300"
    ],
    maintenance: [
      { id: 1, date: "2023-12-20", type: "إصلاح محرك", cost: "SAR 4,500", status: "Completed" },
    ],
    documents: {
      license: "Valid",
      insurance: "Valid",
      registration: "Expired"
    }
  },
  { 
    id: "V-1005", 
    image: "https://picsum.photos/seed/car10/400/300", 
    type: "سيارة", 
    brand: "نيسان",
    model: "ألتيما", 
    year: "2024", 
    plate: "ر س ت 7890", 
    color: "رمادي",
    status: "Pending approval",
    registrationDate: "2024-02-28",
    lastUpdate: "منذ ساعة",
    drivers: [],
    images: [
      "https://picsum.photos/seed/car10/400/300"
    ],
    maintenance: [],
    documents: {
      license: "Valid",
      insurance: "Valid",
      registration: "Valid"
    }
  }
];

const availableDrivers = [
  { id: 1, name: "سعد القحطاني", avatar: "S" },
  { id: 2, name: "محمد العتيبي", avatar: "M" },
  { id: 3, name: "خالد الشمري", avatar: "K" },
  { id: 4, name: "بندر الدوسري", avatar: "B" },
  { id: 5, name: "فهد الحربي", avatar: "F" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    "Active": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Inactive": "bg-slate-100 text-slate-500 border-slate-200",
    "Suspended": "bg-red-50 text-red-600 border-red-100",
    "Pending approval": "bg-amber-50 text-amber-600 border-amber-100"
  };

  const labels: any = {
    "Active": "نشط",
    "Inactive": "غير نشط",
    "Suspended": "موقوف",
    "Pending approval": "بانتظار الموافقة"
  };

  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap",
      styles[status] || styles["Inactive"]
    )}>
      {labels[status] || status}
    </span>
  );
};

export default function VehiclesPage() {
  const [vehicleList, setVehicleList] = React.useState(vehicles);
  const [selectedVehicle, setSelectedVehicle] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [isLinkingDriver, setIsLinkingDriver] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showMaintenance, setShowMaintenance] = React.useState(false);
  const [editForm, setEditForm] = React.useState<any>(null);

  const filteredVehicles = vehicleList.filter(v => {
    const matchesSearch = 
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.plate.includes(searchQuery) || 
      v.model.includes(searchQuery) ||
      v.brand.includes(searchQuery);
    
    const matchesStatus = filterStatus === "All" || v.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleLinkDriver = (driver: any) => {
    if (!selectedVehicle) return;
    
    // Check if already linked
    if (selectedVehicle.drivers.some((d: any) => d.id === driver.id)) {
      setIsLinkingDriver(false);
      return;
    }

    const updatedVehicle = {
      ...selectedVehicle,
      drivers: [...selectedVehicle.drivers, driver]
    };

    setVehicleList(prev => prev.map(v => v.id === selectedVehicle.id ? updatedVehicle : v));
    setSelectedVehicle(updatedVehicle);
    setIsLinkingDriver(false);
  };

  const handleUnlinkDriver = (driverId: number) => {
    if (!selectedVehicle) return;

    const updatedVehicle = {
      ...selectedVehicle,
      drivers: selectedVehicle.drivers.filter((d: any) => d.id !== driverId)
    };

    setVehicleList(prev => prev.map(v => v.id === selectedVehicle.id ? updatedVehicle : v));
    setSelectedVehicle(updatedVehicle);
  };

  const handleSuspendVehicle = () => {
    if (!selectedVehicle) return;
    const newStatus = selectedVehicle.status === "Suspended" ? "Active" : "Suspended";
    const updatedVehicle = { ...selectedVehicle, status: newStatus };
    setVehicleList(prev => prev.map(v => v.id === selectedVehicle.id ? updatedVehicle : v));
    setSelectedVehicle(updatedVehicle);
  };

  const handleDeleteVehicle = () => {
    if (!selectedVehicle) return;
    if (window.confirm("هل أنت متأكد من حذف هذه المركبة؟")) {
      setVehicleList(prev => prev.filter(v => v.id !== selectedVehicle.id));
      setSelectedVehicle(null);
    }
  };

  const handleStartEdit = () => {
    setEditForm({ ...selectedVehicle });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setVehicleList(prev => prev.map(v => v.id === selectedVehicle.id ? editForm : v));
    setSelectedVehicle(editForm);
    setIsEditing(false);
  };

  const handleSetPrimaryImage = (imageUrl: string) => {
    if (!selectedVehicle) return;
    const updatedVehicle = { ...selectedVehicle, image: imageUrl };
    setVehicleList(prev => prev.map(v => v.id === selectedVehicle.id ? updatedVehicle : v));
    setSelectedVehicle(updatedVehicle);
  };

  const handleSaveChanges = () => {
    // All changes are already synced to vehicleList in this mock implementation
    // We just close the modal and could potentially show a toast here
    setSelectedVehicle(null);
  };

  const exportCSV = () => {
    const headers = ["Vehicle ID,Type,Brand,Model,Year,Plate,Status,Registration Date"];
    const rows = vehicleList.map(v => `${v.id},${v.type},${v.brand},${v.model},${v.year},${v.plate},${v.status},${v.registrationDate}`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vehicles_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">الأسطول والمركبات</h1>
          <p className="text-slate-500 mt-1">إدارة أسطول المركبات، تتبع الحالات، وربط السائقين.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Download size={18} />
            تصدير CSV
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            <Plus size={18} />
            إضافة مركبة
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Car size={20} />
            </div>
            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">إجمالي الأسطول</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{vehicleList.length}</div>
          <p className="text-xs text-slate-500 mt-1">مركبة مسجلة في النظام</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">نشط</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{vehicleList.filter(v => v.status === "Active").length}</div>
          <p className="text-xs text-slate-500 mt-1">تعمل حالياً في الميدان</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Clock size={20} />
            </div>
            <span className="text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">قيد المراجعة</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{vehicleList.filter(v => v.status === "Pending approval").length}</div>
          <p className="text-xs text-slate-500 mt-1">بانتظار الموافقة النهائية</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-50 text-red-600 rounded-xl">
              <ShieldAlert size={20} />
            </div>
            <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg">موقوف</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{vehicleList.filter(v => v.status === "Suspended").length}</div>
          <p className="text-xs text-slate-500 mt-1">مركبات خارج الخدمة مؤقتاً</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="البحث برقم المركبة، اللوحة، الماركة..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-slate-900 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {["All", "Active", "Inactive", "Suspended", "Pending approval"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                filterStatus === status 
                  ? "bg-slate-900 text-white shadow-md shadow-slate-200" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              )}
            >
              {status === "All" ? "الكل" : status === "Active" ? "نشط" : status === "Inactive" ? "غير نشط" : status === "Suspended" ? "موقوف" : "قيد المراجعة"}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-5">المركبة</th>
                <th className="px-6 py-5">النوع والموديل</th>
                <th className="px-6 py-5">رقم اللوحة</th>
                <th className="px-6 py-5">السائقون</th>
                <th className="px-6 py-5">الحالة</th>
                <th className="px-6 py-5">الوثائق</th>
                <th className="px-6 py-5">التسجيل</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredVehicles.map((v) => (
                <tr 
                  key={v.id} 
                  onClick={() => setSelectedVehicle(v)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-100 shrink-0">
                        <img src={v.image} alt={v.model} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900">{v.id}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{v.brand} {v.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-700">{v.type}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{v.year}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 inline-flex flex-col items-center min-w-[80px]">
                      <span className="text-xs font-black text-slate-900">{v.plate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2 rtl:space-x-reverse">
                      {v.drivers.length > 0 ? (
                        v.drivers.map(d => (
                          <div key={d.id} className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold" title={d.name}>
                            {d.avatar}
                          </div>
                        ))
                      ) : (
                        <button className="w-8 h-8 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors">
                          <LinkIcon size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="group/doc relative">
                        <CreditCard size={14} className={cn(v.documents?.license === "Valid" ? "text-emerald-500" : "text-red-500")} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[8px] rounded opacity-0 group-hover/doc:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          الرخصة: {v.documents?.license === "Valid" ? "سارية" : "منتهية"}
                        </div>
                      </div>
                      <div className="group/doc relative">
                        <Shield size={14} className={cn(v.documents?.insurance === "Valid" ? "text-emerald-500" : "text-red-500")} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[8px] rounded opacity-0 group-hover/doc:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          التأمين: {v.documents?.insurance === "Valid" ? "سارٍ" : "منتهٍ"}
                        </div>
                      </div>
                      <div className="group/doc relative">
                        <FileText size={14} className={cn(v.documents?.registration === "Valid" ? "text-emerald-500" : "text-red-500")} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[8px] rounded opacity-0 group-hover/doc:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          الإستمارة: {v.documents?.registration === "Valid" ? "سارية" : "منتهية"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-700">{v.registrationDate}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{v.lastUpdate}</div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Simulation */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
          <p className="text-xs text-slate-500 font-medium">عرض 1-5 من أصل {vehicleList.length} مركبة</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <button className="w-8 h-8 rounded-xl bg-slate-900 text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50">2</button>
            <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVehicle(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-slate-900 text-white flex items-center justify-center shadow-xl">
                    <Car size={40} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-slate-900">{selectedVehicle.id}</h2>
                      <StatusBadge status={selectedVehicle.status} />
                    </div>
                    <p className="text-slate-500 font-bold mt-1">{selectedVehicle.brand} {selectedVehicle.model} • {selectedVehicle.year}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedVehicle(null)}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-400 hover:bg-slate-100 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Basic Info */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Vehicle Info Grid */}
                    <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                          <Info size={20} className="text-blue-500" />
                          معلومات المركبة الأساسية
                        </h3>
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={handleSaveEdit}
                              className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                            >
                              حفظ
                            </button>
                            <button 
                              onClick={() => setIsEditing(false)}
                              className="px-4 py-1.5 bg-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-300 transition-colors"
                            >
                              إلغاء
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={handleStartEdit}
                            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            <Settings size={16} />
                          </button>
                        )}
                      </div>
                      
                      {isEditing ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase">النوع</label>
                            <input 
                              type="text" 
                              value={editForm.type} 
                              onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase">الماركة</label>
                            <input 
                              type="text" 
                              value={editForm.brand} 
                              onChange={(e) => setEditForm({...editForm, brand: e.target.value})}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase">الموديل</label>
                            <input 
                              type="text" 
                              value={editForm.model} 
                              onChange={(e) => setEditForm({...editForm, model: e.target.value})}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase">سنة الصنع</label>
                            <input 
                              type="text" 
                              value={editForm.year} 
                              onChange={(e) => setEditForm({...editForm, year: e.target.value})}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase">اللون</label>
                            <input 
                              type="text" 
                              value={editForm.color} 
                              onChange={(e) => setEditForm({...editForm, color: e.target.value})}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase">رقم اللوحة</label>
                            <input 
                              type="text" 
                              value={editForm.plate} 
                              onChange={(e) => setEditForm({...editForm, plate: e.target.value})}
                              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">نوع المركبة</p>
                            <p className="text-sm font-bold text-slate-900">{selectedVehicle.type}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">الماركة</p>
                            <p className="text-sm font-bold text-slate-900">{selectedVehicle.brand}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">الموديل</p>
                            <p className="text-sm font-bold text-slate-900">{selectedVehicle.model}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">سنة الصنع</p>
                            <p className="text-sm font-bold text-slate-900">{selectedVehicle.year}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">اللون</p>
                            <p className="text-sm font-bold text-slate-900">{selectedVehicle.color}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">رقم اللوحة</p>
                            <p className="text-sm font-bold text-slate-900">{selectedVehicle.plate}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Maintenance Section */}
                    {showMaintenance && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-white rounded-[32px] border border-slate-200 p-8"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Clock size={20} className="text-amber-500" />
                            سجل الصيانة
                          </h3>
                          <button 
                            onClick={() => setShowMaintenance(false)}
                            className="text-xs font-bold text-slate-400 hover:text-slate-600"
                          >
                            إخفاء السجل
                          </button>
                        </div>
                        <div className="space-y-4">
                          {selectedVehicle.maintenance && selectedVehicle.maintenance.length > 0 ? (
                            selectedVehicle.maintenance.map((m: any) => (
                              <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div>
                                  <div className="text-sm font-bold text-slate-900">{m.type}</div>
                                  <div className="text-[10px] text-slate-400">{m.date}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-bold text-emerald-600">{m.cost}</div>
                                  <div className="text-[10px] text-slate-400">{m.status}</div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center py-8 text-slate-400 text-sm font-medium">لا يوجد سجل صيانة متاح لهذه المركبة</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Vehicle Images Gallery */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                        <ImageIcon size={20} className="text-emerald-500" />
                        معرض صور المركبة
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {selectedVehicle.images.map((img: string, idx: number) => {
                          const isPrimary = selectedVehicle.image === img;
                          return (
                            <div key={idx} className={cn(
                              "relative aspect-video rounded-3xl overflow-hidden border transition-all group",
                              isPrimary ? "border-emerald-500 ring-4 ring-emerald-500/20" : "border-slate-100"
                            )}>
                              <img src={img} alt="Vehicle" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => handleSetPrimaryImage(img)}
                                  className={cn(
                                    "p-2 rounded-full transition-all",
                                    isPrimary ? "bg-emerald-500 text-white" : "bg-white/20 backdrop-blur-md text-white hover:bg-white/40"
                                  )}
                                  title={isPrimary ? "الصورة الأساسية" : "تعيين كصورة أساسية"}
                                >
                                  <Star size={18} fill={isPrimary ? "currentColor" : "none"} />
                                </button>
                                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
                                  <Eye size={18} />
                                </button>
                              </div>
                              {isPrimary && (
                                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                  الأساسية
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <button className="aspect-video rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all bg-slate-50/50">
                          <Plus size={24} />
                          <span className="text-xs font-bold">إضافة صورة</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Drivers & Actions */}
                  <div className="space-y-8">
                    
                    {/* Linked Drivers */}
                    <div className="bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm relative">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-slate-900">السائقون المرتبطون</h3>
                        <button 
                          onClick={() => setIsLinkingDriver(!isLinkingDriver)}
                          className={cn(
                            "p-2 rounded-xl transition-colors",
                            isLinkingDriver ? "bg-slate-900 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          )}
                        >
                          {isLinkingDriver ? <X size={16} /> : <LinkIcon size={16} />}
                        </button>
                      </div>

                      {isLinkingDriver && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-16 left-6 right-6 z-20 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 space-y-3"
                        >
                          <p className="text-[10px] font-black text-slate-400 uppercase">اختر سائقاً للربط</p>
                          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                            {availableDrivers
                              .filter(d => !selectedVehicle.drivers.some((sd: any) => sd.id === d.id))
                              .map(driver => (
                                <button
                                  key={driver.id}
                                  onClick={() => handleLinkDriver(driver)}
                                  className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors text-right"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                                    {driver.avatar}
                                  </div>
                                  <span className="text-xs font-bold text-slate-700">{driver.name}</span>
                                </button>
                              ))}
                            {availableDrivers.filter(d => !selectedVehicle.drivers.some((sd: any) => sd.id === d.id)).length === 0 && (
                              <p className="text-[10px] text-slate-400 text-center py-2">جميع السائقين مضافون بالفعل</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                      
                      <div className="space-y-4">
                        {selectedVehicle.drivers.length > 0 ? (
                          selectedVehicle.drivers.map((driver: any) => (
                            <div key={driver.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                                  {driver.avatar}
                                </div>
                                <div className="text-xs font-bold text-slate-900">{driver.name}</div>
                              </div>
                              <button 
                                onClick={() => handleUnlinkDriver(driver.id)}
                                className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 px-4 border-2 border-dashed border-slate-100 rounded-2xl">
                            <User size={24} className="mx-auto text-slate-300 mb-2" />
                            <p className="text-[10px] font-bold text-slate-400">لا يوجد سائقين مرتبطين حالياً</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-slate-900 rounded-[32px] p-6 text-white shadow-xl shadow-slate-200">
                      <h3 className="text-sm font-black mb-6 flex items-center gap-2">
                        <Settings size={18} className="text-emerald-400" />
                        إجراءات سريعة
                      </h3>
                      <div className="space-y-3">
                        <button 
                          onClick={handleStartEdit}
                          className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                          تعديل البيانات
                        </button>
                        <button 
                          onClick={() => setShowMaintenance(!showMaintenance)}
                          className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                          سجل الصيانة
                        </button>
                        <button 
                          onClick={handleSuspendVehicle}
                          className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/20 text-amber-400 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                          {selectedVehicle.status === "Suspended" ? "تنشيط المركبة" : "تعليق المركبة"}
                        </button>
                        <button 
                          onClick={handleDeleteVehicle}
                          className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                          حذف المركبة
                        </button>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-[32px] border border-slate-200 p-6">
                      <h3 className="text-sm font-black text-slate-900 mb-6">آخر التحديثات</h3>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">تم تحديث حالة المركبة إلى نشط</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">منذ ساعتين • بواسطة Admin</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">إضافة صورة جديدة للمركبة</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">أمس • بواسطة السائق سعد</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
                <button 
                  onClick={handleSaveChanges}
                  className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  حفظ التغييرات
                </button>
                <button 
                  onClick={() => setSelectedVehicle(null)}
                  className="flex-1 bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all"
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
