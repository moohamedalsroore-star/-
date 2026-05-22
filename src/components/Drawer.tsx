import { Calculator, Bell, Mail, MessageCircle, PieChart, Warehouse, Tags, FileUp, Settings } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const menuItems = [
    { icon: <Bell size={18} />, text: "الإشعارات" },
    { icon: <Mail size={18} />, text: "الرسائل الفورية SMS" },
    { icon: <MessageCircle size={18} />, text: "رسائل واتس اب" },
    { icon: <PieChart size={18} />, text: "التقارير" },
    { icon: <Warehouse size={18} />, text: "المخازن" },
    { icon: <Tags size={18} />, text: "الأصناف" },
    { icon: <FileUp size={18} />, text: "استيراد من إكسل" },
    { icon: <Settings size={18} />, text: "الإعدادات" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-1100 bg-black/50 transition-opacity ${isOpen ? "block" : "hidden"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 z-1200 h-full w-75 bg-white shadow-lg transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center gap-4 bg-dark-blue p-8 text-white">
          <Calculator className="h-10 w-10 text-accent-orange" />
          <div>
            <div className="text-lg font-bold">الغفاري سوفت</div>
            <div className="text-xs opacity-80">الإصدار 135.1.2</div>
          </div>
        </div>
        <div className="py-2">
          {menuItems.map((item) => (
            <a key={item.text} href="#" className="flex items-center justify-between p-4 border-b border-slate-100 text-text-dark no-underline hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <span className="text-slate-600">{item.icon}</span>
                {item.text}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
