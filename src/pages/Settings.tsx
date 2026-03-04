import React from "react";
import { 
  Settings as SettingsIcon, 
  Map as MapIcon, 
  DollarSign, 
  Shield, 
  Bell, 
  Globe, 
  Save,
  Key,
  Smartphone,
  Mail,
  User,
  Info,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

const SettingSection = ({ title, description, icon: Icon, children }: any) => (
  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-6">
    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
          <Icon size={20} className="text-slate-700" />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const InputGroup = ({ label, description, children }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
    <div className="md:col-span-1">
      <label className="text-sm font-bold text-slate-900">{label}</label>
      {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
    </div>
    <div className="md:col-span-2">
      {children}
    </div>
  </div>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("general");
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: "general", label: "عام", icon: Globe },
    { id: "maps", label: "الخرائط", icon: MapIcon },
    { id: "pricing", label: "التسعير", icon: DollarSign },
    { id: "drivers", label: "السائقين", icon: User },
    { id: "notifications", label: "التنبيهات", icon: Bell },
    { id: "security", label: "الأمان", icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">إعدادات النظام</h1>
          <p className="text-slate-500 mt-1">قم بتخصيص إعدادات المنصة والتحكم في العمليات</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg",
            isSaving ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100"
          )}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
          ) : (
            <Save size={20} />
          )}
          {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>

      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-700"
        >
          <CheckCircle2 size={20} />
          <span className="text-sm font-bold">تم حفظ الإعدادات بنجاح!</span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "general" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SettingSection title="الإعدادات العامة" description="تخصيص المعلومات الأساسية للمنصة" icon={Globe}>
              <InputGroup label="اسم المنصة" description="الاسم الذي سيظهر في التطبيق ولوحة التحكم">
                <input type="text" defaultValue="UBER OPS Admin" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </InputGroup>
              <InputGroup label="البريد الإلكتروني للدعم" description="سيتم استخدامه للتواصل مع المستخدمين">
                <input type="email" defaultValue="support@uberops.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </InputGroup>
              <InputGroup label="اللغة الافتراضية" description="اللغة الأساسية لواجهة المستخدم">
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>العربية</option>
                  <option>English</option>
                </select>
              </InputGroup>
              <InputGroup label="العملة" description="العملة المستخدمة في جميع المعاملات المالية">
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>ريال سعودي (SAR)</option>
                  <option>درهم إماراتي (AED)</option>
                  <option>دولار أمريكي (USD)</option>
                </select>
              </InputGroup>
            </SettingSection>
          </motion.div>
        )}

        {activeTab === "maps" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SettingSection title="إعدادات الخرائط" description="ربط خدمات جوجل ماب والتحكم في النطاق الجغرافي" icon={MapIcon}>
              <InputGroup label="Google Maps API Key" description="مفتاح الربط الخاص بخدمات الخرائط">
                <div className="relative">
                  <Key className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="password" value="************************" className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </InputGroup>
              <InputGroup label="نطاق العمل الافتراضي" description="المدينة أو المنطقة الأساسية للعمليات">
                <input type="text" defaultValue="الرياض، المملكة العربية السعودية" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </InputGroup>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                <p className="text-xs text-amber-700 leading-relaxed">
                  تأكد من تفعيل <strong>Places API</strong> و <strong>Distance Matrix API</strong> في حساب جوجل كلاود لضمان عمل حسابات المسافات والأسعار بشكل صحيح.
                </p>
              </div>
            </SettingSection>
          </motion.div>
        )}

        {activeTab === "pricing" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SettingSection title="إعدادات التسعير" description="التحكم في هيكل الأسعار والرسوم" icon={DollarSign}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">سعر فتح العداد (Base Fare)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">SAR</span>
                    <input type="number" defaultValue="10" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">السعر لكل كيلومتر</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">SAR</span>
                    <input type="number" defaultValue="2.5" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">السعر لكل دقيقة انتظار</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">SAR</span>
                    <input type="number" defaultValue="0.5" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">الحد الأدنى للرحلة</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">SAR</span>
                    <input type="number" defaultValue="15" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>
              </div>
            </SettingSection>
          </motion.div>
        )}

        {activeTab === "drivers" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SettingSection title="إعدادات السائقين" description="قواعد العمل والعمولات للسائقين" icon={User}>
              <InputGroup label="عمولة المنصة (%)" description="النسبة المقتطعة من كل رحلة">
                <input type="number" defaultValue="20" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </InputGroup>
              <InputGroup label="التوثيق الإلزامي" description="تفعيل التحقق التلقائي من الوثائق">
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                  <span className="text-sm text-slate-600 font-medium">تفعيل مراجعة الوثائق قبل السماح بالعمل</span>
                </div>
              </InputGroup>
              <InputGroup label="نطاق البحث عن سائق" description="أقصى مسافة للبحث عن سائق قريب (كم)">
                <input type="number" defaultValue="5" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </InputGroup>
            </SettingSection>
          </motion.div>
        )}

        {activeTab === "notifications" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SettingSection title="إعدادات التنبيهات" description="التحكم في قنوات التواصل مع المستخدمين" icon={Bell}>
              <div className="space-y-4">
                {[
                  { label: "تنبيهات البريد الإلكتروني", icon: Mail, desc: "إرسال الفواتير والتقارير الأسبوعية" },
                  { label: "تنبيهات الجوال (Push)", icon: Smartphone, desc: "إرسال تحديثات الرحلات والعروض" },
                  { label: "رسائل SMS", icon: Smartphone, desc: "إرسال أكواد التحقق والتنبيهات العاجلة" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl">
                        <item.icon size={18} className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.label}</p>
                        <p className="text-[10px] text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </SettingSection>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SettingSection title="إعدادات الأمان" description="حماية حساب الإدارة وتأمين البيانات" icon={Shield}>
              <InputGroup label="تغيير كلمة المرور" description="تحديث كلمة مرور لوحة التحكم">
                <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors">
                  بدء عملية التغيير
                </button>
              </InputGroup>
              <InputGroup label="التحقق بخطوتين (2FA)" description="إضافة طبقة حماية إضافية عند تسجيل الدخول">
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                  <span className="text-sm text-slate-600 font-medium">غير مفعل</span>
                </div>
              </InputGroup>
              <div className="p-4 bg-slate-900 rounded-2xl text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info size={20} className="text-emerald-400" />
                  <div>
                    <p className="text-sm font-bold">سجل الدخول الأخير</p>
                    <p className="text-[10px] text-white/60">آخر دخول من الرياض، السعودية - منذ ساعة</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold underline">عرض السجلات</button>
              </div>
            </SettingSection>
          </motion.div>
        )}
      </div>
    </div>
  );
}
