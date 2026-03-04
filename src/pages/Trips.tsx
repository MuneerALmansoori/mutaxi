import React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download,
  Car,
  ShieldAlert,
  MapPin,
  Clock,
  X,
  User,
  DollarSign,
  Map as MapIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

const initialTrips = [
  { id: "TRP-9021", driver: "سعد القحطاني", passenger: "أحمد علي", status: "Ongoing", pickup: "مطار الملك خالد", dropoff: "حي النخيل", fare: "SAR 85.00", time: "12:30 PM" },
  { id: "TRP-9022", driver: "محمد العتيبي", passenger: "سارة خالد", status: "Completed", pickup: "برج المملكة", dropoff: "حي الملقا", fare: "SAR 42.00", time: "11:15 AM" },
  { id: "TRP-9023", driver: "خالد الشمري", passenger: "فهد العبدالله", status: "Cancelled", pickup: "الرياض بارك", dropoff: "حي الياسمين", fare: "SAR 0.00", time: "10:45 AM" },
  { id: "TRP-9024", driver: "بندر الدوسري", passenger: "نورة القحطاني", status: "Ongoing", pickup: "حي السفارات", dropoff: "الدرعية", fare: "SAR 65.00", time: "01:05 PM" },
];

const availableDrivers = [
  "سعد القحطاني",
  "محمد العتيبي",
  "خالد الشمري",
  "بندر الدوسري",
  "فهد العنزي",
  "عبدالله الرويلي"
];

export default function TripsPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries
  });

  const [trips, setTrips] = React.useState(initialTrips);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [newTrip, setNewTrip] = React.useState({
    driver: "",
    passenger: "",
    pickup: "",
    dropoff: "",
    fare: ""
  });

  const pickupAutocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null);
  const dropoffAutocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null);

  const onPickupLoad = (autocomplete: google.maps.places.Autocomplete) => {
    pickupAutocompleteRef.current = autocomplete;
  };

  const onDropoffLoad = (autocomplete: google.maps.places.Autocomplete) => {
    dropoffAutocompleteRef.current = autocomplete;
  };

  const onPickupPlaceChanged = () => {
    if (pickupAutocompleteRef.current !== null) {
      const place = pickupAutocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setNewTrip(prev => ({ ...prev, pickup: place.formatted_address || "" }));
      }
    }
  };

  const onDropoffPlaceChanged = () => {
    if (dropoffAutocompleteRef.current !== null) {
      const place = dropoffAutocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setNewTrip(prev => ({ ...prev, dropoff: place.formatted_address || "" }));
      }
    }
  };

  const filteredTrips = trips.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.driver.includes(searchQuery) ||
    t.passenger.includes(searchQuery)
  );

  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TRP-${Math.floor(1000 + Math.random() * 9000)}`;
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const tripToAdd = {
      id,
      ...newTrip,
      status: "Ongoing",
      fare: `SAR ${parseFloat(newTrip.fare).toFixed(2)}`,
      time
    };

    setTrips([tripToAdd, ...trips]);
    setIsAddModalOpen(false);
    setNewTrip({ driver: "", passenger: "", pickup: "", dropoff: "", fare: "" });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">إدارة الرحلات</h1>
          <p className="text-slate-500">متابعة حالة الرحلات الحية والمكتملة.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Download size={16} />
            تصدير البيانات
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            <Plus size={16} />
            إضافة رحلة جديدة
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500 text-white rounded-xl">
            <Car size={24} />
          </div>
          <div>
            <div className="text-emerald-600 text-xs font-bold uppercase">رحلات نشطة</div>
            <div className="text-2xl font-bold text-emerald-900">{trips.filter(t => t.status === 'Ongoing').length}</div>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-slate-900 text-white rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-slate-500 text-xs font-bold uppercase">متوسط الوقت</div>
            <div className="text-2xl font-bold text-slate-900">18 min</div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-red-500 text-white rounded-xl">
            <ShieldAlert size={24} />
          </div>
          <div>
            <div className="text-red-600 text-xs font-bold uppercase">بلاغات نشطة</div>
            <div className="text-2xl font-bold text-red-900">3</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="بحث برقم الرحلة، السائق، أو الراكب..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
              <Filter size={16} />
              تصفية
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">الرحلة</th>
                <th className="px-6 py-4 font-medium">السائق / الراكب</th>
                <th className="px-6 py-4 font-medium">المسار</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">التكلفة</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{trip.id}</div>
                    <div className="text-xs text-slate-500">{trip.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">س: {trip.driver}</div>
                    <div className="text-xs text-slate-500">ر: {trip.passenger}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin size={12} className="text-emerald-500" />
                      {trip.pickup}
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <MapPin size={12} className="text-red-500" />
                      {trip.dropoff}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold uppercase",
                      trip.status === 'Ongoing' ? 'bg-blue-50 text-blue-600' :
                      trip.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-red-50 text-red-600'
                    )}>
                      {trip.status === 'Ongoing' ? 'جارية' : trip.status === 'Completed' ? 'مكتملة' : 'ملغاة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm">
                    {trip.fare}
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

      {/* Add Trip Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">إضافة رحلة جديدة</h2>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddTrip} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Car size={16} className="text-emerald-500" />
                    السائق
                  </label>
                  <select 
                    required
                    value={newTrip.driver}
                    onChange={(e) => setNewTrip({...newTrip, driver: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                  >
                    <option value="">اختر السائق</option>
                    {availableDrivers.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-blue-500" />
                    الراكب
                  </label>
                  <input 
                    required
                    type="text"
                    placeholder="اسم الراكب"
                    value={newTrip.passenger}
                    onChange={(e) => setNewTrip({...newTrip, passenger: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <MapPin size={16} className="text-emerald-500" />
                      نقطة الانطلاق
                    </label>
                    {isLoaded ? (
                      <Autocomplete
                        onLoad={onPickupLoad}
                        onPlaceChanged={onPickupPlaceChanged}
                      >
                        <input 
                          required
                          type="text"
                          placeholder="ابحث عن موقع الانطلاق..."
                          value={newTrip.pickup}
                          onChange={(e) => setNewTrip({...newTrip, pickup: e.target.value})}
                          className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </Autocomplete>
                    ) : (
                      <input 
                        disabled
                        type="text"
                        placeholder="جاري تحميل الخرائط..."
                        className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-slate-50 cursor-not-allowed"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <MapPin size={16} className="text-red-500" />
                      نقطة الوصول
                    </label>
                    {isLoaded ? (
                      <Autocomplete
                        onLoad={onDropoffLoad}
                        onPlaceChanged={onDropoffPlaceChanged}
                      >
                        <input 
                          required
                          type="text"
                          placeholder="ابحث عن وجهة الوصول..."
                          value={newTrip.dropoff}
                          onChange={(e) => setNewTrip({...newTrip, dropoff: e.target.value})}
                          className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </Autocomplete>
                    ) : (
                      <input 
                        disabled
                        type="text"
                        placeholder="جاري تحميل الخرائط..."
                        className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-slate-50 cursor-not-allowed"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <DollarSign size={16} className="text-yellow-600" />
                    التكلفة التقديرية (SAR)
                  </label>
                  <input 
                    required
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newTrip.fare}
                    onChange={(e) => setNewTrip({...newTrip, fare: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
                  >
                    إنشاء الرحلة
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

