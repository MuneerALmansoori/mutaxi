import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from "react-leaflet";
import L from "leaflet";
import { 
  Activity, 
  Navigation, 
  AlertTriangle, 
  CheckCircle2, 
  Search,
  Filter,
  MoreVertical,
  Car
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Mock Data
const liveDrivers = [
  { id: 1, name: "سعد القحطاني", status: "BUSY", lat: 24.7136, lng: 46.6753, tripId: "TRP-9021" },
  { id: 2, name: "محمد العتيبي", status: "ONLINE", lat: 24.7236, lng: 46.6853 },
  { id: 3, name: "خالد الشمري", status: "ONLINE", lat: 24.7036, lng: 46.6653 },
  { id: 4, name: "بندر الدوسري", status: "BUSY", lat: 24.7336, lng: 46.6953, tripId: "TRP-9024" },
];

const activeIncidents = [
  { id: 1, type: "ACCIDENT", severity: "HIGH", location: "طريق الملك فهد", time: "منذ 5 دقائق" },
  { id: 2, type: "DELAY", severity: "MEDIUM", location: "حي النخيل", time: "منذ 12 دقيقة" },
];

const routeCoordinates: [number, number][] = [
  [24.7136, 46.6753],
  [24.7150, 46.6780],
  [24.7200, 46.6820],
  [24.7236, 46.6853],
];

export default function OpsPage() {
  const [selectedDriver, setSelectedDriver] = React.useState<any>(null);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">العمليات الحية (Live Ops)</h1>
          <p className="text-slate-500">متابعة فورية للسائقين، الرحلات، والبلاغات الميدانية.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button className="px-4 py-1.5 text-sm font-bold bg-slate-900 text-white rounded-lg">الخريطة</button>
          <button className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">القائمة</button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
          <MapContainer 
            center={[24.7136, 46.6753]} 
            zoom={13} 
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {liveDrivers.map((driver) => (
              <Marker 
                key={driver.id} 
                position={[driver.lat, driver.lng]}
                eventHandlers={{
                  click: () => setSelectedDriver(driver),
                }}
              >
                <Popup>
                  <div className="text-right font-sans" dir="rtl">
                    <div className="font-bold">{driver.name}</div>
                    <div className="text-xs text-slate-500">الحالة: {driver.status === 'BUSY' ? 'في رحلة' : 'متوفر'}</div>
                    {driver.tripId && <div className="text-xs text-emerald-600 font-bold mt-1">رقم الرحلة: {driver.tripId}</div>}
                  </div>
                </Popup>
              </Marker>
            ))}

            <Polyline positions={routeCoordinates} color="#10b981" weight={4} opacity={0.6} dashArray="10, 10" />
            
            {/* Incident Zone */}
            <Circle 
              center={[24.7236, 46.6853]} 
              radius={500} 
              pathOptions={{ fillColor: 'red', color: 'red', fillOpacity: 0.1 }} 
            />
          </MapContainer>

          {/* Map Overlays */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><Navigation size={20} /></button>
              <div className="h-px bg-slate-100 mx-2" />
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><Filter size={20} /></button>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-[1000] bg-white p-4 rounded-2xl shadow-xl border border-slate-200 w-64">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">ملخص الأسطول</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-slate-900">124</div>
                <div className="text-[10px] text-slate-500">سائق متصل</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-500">86</div>
                <div className="text-[10px] text-slate-500">في رحلة نشطة</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-6 overflow-y-auto pr-2">
          {/* Incidents */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-red-50/50">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <AlertTriangle size={16} />
                بلاغات نشطة
              </div>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">2</span>
            </div>
            <div className="divide-y divide-slate-100">
              {activeIncidents.map((incident) => (
                <div key={incident.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm font-bold text-slate-900">{incident.type === 'ACCIDENT' ? 'حادث مروري' : 'تأخر في الرحلة'}</div>
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase",
                      incident.severity === 'HIGH' ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {incident.severity === 'HIGH' ? 'عالي' : 'متوسط'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">{incident.location}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{incident.time}</span>
                    <button className="text-[10px] font-bold text-emerald-600 hover:underline">عرض التفاصيل</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drivers List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm">السائقين القريبين</h3>
              <button className="text-slate-400 hover:text-slate-600"><Search size={16} /></button>
            </div>
            <div className="divide-y divide-slate-100 overflow-y-auto">
              {liveDrivers.map((driver) => (
                <div 
                  key={driver.id} 
                  onClick={() => setSelectedDriver(driver)}
                  className={cn(
                    "p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-3",
                    selectedDriver?.id === driver.id && "bg-emerald-50/50"
                  )}
                >
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      {driver.name.charAt(0)}
                    </div>
                    <span className={cn(
                      "absolute bottom-0 left-0 w-3 h-3 rounded-full border-2 border-white",
                      driver.status === 'ONLINE' ? "bg-emerald-500" : "bg-blue-500"
                    )}></span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-900">{driver.name}</div>
                    <div className="text-[10px] text-slate-500">{driver.status === 'ONLINE' ? 'متوفر' : 'في رحلة'}</div>
                  </div>
                  <button className="p-1 hover:bg-slate-200 rounded text-slate-400">
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
