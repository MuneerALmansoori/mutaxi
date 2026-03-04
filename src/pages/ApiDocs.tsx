import React from "react";
import { 
  Code2, 
  Globe, 
  Lock, 
  Zap, 
  Copy, 
  Check,
  ExternalLink,
  Terminal
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const apiEndpoints = [
  {
    group: "المصادقة (Authentication)",
    endpoints: [
      { method: "POST", path: "/api/v1/auth/login", desc: "تسجيل الدخول والحصول على JWT Token", body: "{ email, password }", response: "{ token, user }" },
      { method: "GET", path: "/api/v1/me", desc: "الحصول على بيانات المستخدم الحالي", auth: true },
    ]
  },
  {
    group: "المستخدمين (Users)",
    endpoints: [
      { method: "GET", path: "/api/v1/users", desc: "قائمة بجميع المستخدمين (Admin only)", auth: true, permission: "users:read" },
      { method: "POST", path: "/api/v1/users", desc: "إضافة مستخدم جديد للنظام", auth: true, permission: "users:write" },
    ]
  },
  {
    group: "العمليات والرحلات (Ops & Trips)",
    endpoints: [
      { method: "GET", path: "/api/v1/trips", desc: "قائمة بجميع الرحلات الحالية والسابقة", auth: true },
      { method: "GET", path: "/api/v1/drivers", desc: "قائمة بجميع السائقين وحالاتهم الحية", auth: true },
      { method: "POST", path: "/api/v1/trips/dispatch", desc: "توجيه رحلة جديدة لسائق", auth: true, permission: "ops:write" },
    ]
  },
  {
    group: "المالية (Finance)",
    endpoints: [
      { method: "GET", path: "/api/v1/finance/stats", desc: "إحصائيات الإيرادات والمحافظ", auth: true, permission: "finance:read" },
      { method: "POST", path: "/api/v1/finance/payout", desc: "تنفيذ عملية دفع لسائق", auth: true, permission: "finance:write" },
    ]
  }
];

export default function ApiDocsPage() {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div id="api-docs-page" className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">توثيق واجهة البرمجيات (API Docs)</h1>
          <p className="text-slate-500">دليل المطور لربط التطبيقات الخارجية والأنظمة الفرعية.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
            <Terminal size={16} />
            فتح الـ Console
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {apiEndpoints.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe size={20} className="text-emerald-500" />
                {group.group}
              </h3>
              <div className="space-y-3">
                {group.endpoints.map((api, apiIdx) => (
                  <div key={apiIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold uppercase",
                          api.method === 'GET' ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                        )}>
                          {api.method}
                        </span>
                        <code className="text-sm font-mono font-bold text-slate-700">{api.path}</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(api.path)}
                        className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
                      >
                        {copied === api.path ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      <p className="text-sm text-slate-600">{api.desc}</p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        {api.auth && (
                          <div className="flex items-center gap-1 text-orange-600 font-medium">
                            <Lock size={12} />
                            يتطلب JWT Token
                          </div>
                        )}
                        {api.permission && (
                          <div className="flex items-center gap-1 text-slate-500">
                            <Zap size={12} />
                            الصلاحية: <code className="bg-slate-100 px-1 rounded">{api.permission}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Code2 size={18} className="text-emerald-400" />
              إعدادات الربط
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-slate-400 text-xs mb-1 uppercase tracking-wider">Base URL</div>
                <code className="bg-slate-800 px-2 py-1 rounded block truncate">https://api.uberops.com/v1</code>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1 uppercase tracking-wider">Authentication Header</div>
                <code className="bg-slate-800 px-2 py-1 rounded block">Authorization: Bearer {'<token>'}</code>
              </div>
              <div className="pt-4">
                <button className="w-full bg-emerald-500 text-white py-2 rounded-lg font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                  تحميل ملف Postman
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold mb-4">أكواد الاستجابة (HTTP Status)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-emerald-600 font-bold">200 OK</span>
                <span className="text-slate-500">تمت العملية بنجاح</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-bold">201 Created</span>
                <span className="text-slate-500">تم إنشاء المورد بنجاح</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-600 font-bold">401 Unauthorized</span>
                <span className="text-slate-500">خطأ في المصادقة</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-bold">403 Forbidden</span>
                <span className="text-slate-500">لا تملك الصلاحية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
