import React from "react";
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  XCircle,
  Save
} from "lucide-react";

const roles = ["Super Admin", "Ops Manager", "Support", "Finance", "ReadOnly"];
const modules = [
  { id: "users", name: "إدارة المستخدمين", perms: ["read", "write", "delete"] },
  { id: "trips", name: "إدارة الرحلات", perms: ["read", "write", "cancel"] },
  { id: "finance", name: "المالية والتقارير", perms: ["read", "export"] },
  { id: "audit", name: "سجلات النظام", perms: ["read"] },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = React.useState("Super Admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">الأدوار والصلاحيات</h1>
          <p className="text-slate-500">تحديد مستويات الوصول لكل دور في النظام.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          <Save size={16} />
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-2 mb-4">الأدوار</h3>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                selectedRole === role 
                  ? "bg-white border-emerald-500 border-2 text-emerald-700 shadow-sm" 
                  : "bg-transparent border-transparent border-2 text-slate-600 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                <Shield size={16} className={selectedRole === role ? "text-emerald-500" : "text-slate-400"} />
                {role}
              </div>
              {selectedRole === role && <CheckCircle2 size={14} />}
            </button>
          ))}
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-lg">مصفوفة الصلاحيات: {selectedRole}</h3>
            <p className="text-sm text-slate-500">تحكم في ما يمكن لهذا الدور فعله في كل وحدة.</p>
          </div>
          
          <div className="p-0">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">الوحدة</th>
                  <th className="px-6 py-4 font-medium text-center">قراءة</th>
                  <th className="px-6 py-4 font-medium text-center">كتابة</th>
                  <th className="px-6 py-4 font-medium text-center">حذف / إلغاء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modules.map((mod) => (
                  <tr key={mod.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{mod.name}</td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="checkbox" 
                        disabled={!mod.perms.includes("write")}
                        defaultChecked={selectedRole === "Super Admin"}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 disabled:bg-slate-100" 
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="checkbox" 
                        disabled={!mod.perms.includes("delete") && !mod.perms.includes("cancel")}
                        defaultChecked={selectedRole === "Super Admin"}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 disabled:bg-slate-100" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/src/lib/utils";
