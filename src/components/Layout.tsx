import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Settings, 
  LogOut,
  Wallet,
  Activity,
  Menu,
  X,
  Bell,
  Search,
  Code2
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/" },
  { icon: Users, label: "المستخدمين", href: "/users" },
  { icon: Car, label: "السائقين", href: "/drivers" },
  { icon: Car, label: "الأسطول والمركبات", href: "/vehicles" },
  { icon: Users, label: "الركاب", href: "/passengers" },
  { icon: MapPin, label: "الرحلات", href: "/trips" },
  { icon: Activity, label: "العمليات الحية", href: "/ops" },
  { icon: Wallet, label: "المالية", href: "/finance" },
  { icon: ShieldCheck, label: "الصلاحيات", href: "/roles" },
  { icon: FileText, label: "سجلات النظام", href: "/audit" },
  { icon: Code2, label: "واجهة الـ API", href: "/api-docs" },
  { icon: Settings, label: "الإعدادات", href: "/settings" },
];

export default function Layout({ children, user, onLogout }: { children: React.ReactNode, user: any, onLogout: () => void }) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900" dir="rtl">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 right-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out",
        !isSidebarOpen && "translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
          <span className="text-xl font-bold tracking-tight text-emerald-400">UBER OPS</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors group"
            >
              <item.icon size={18} className="text-slate-400 group-hover:text-emerald-400" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        isSidebarOpen ? "pr-64" : "pr-0"
      )}>
        {/* Topbar */}
        <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="بحث سريع..." 
                className="pr-10 pl-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-slate-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-left hidden sm:block">
                <div className="text-sm font-bold">{user?.name}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">{user?.role}</div>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
