import React from 'react';

interface QuickActionsProps {
  onSelectAction: (actionName: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onSelectAction }) => {
  // الأزرار التسعة متطابقة تماماً مع ترتيب الألوان والأسماء في واجهة تطبيقك الأصلية
  const actions = [
    { name: 'سند جديد', isOrange: false },
    { name: 'حوالة جديدة', isOrange: false },
    { name: 'كشف حساب', isOrange: false },
    { name: 'قيد بسيط', isOrange: true },
    { name: 'الحركة اليومية', isOrange: true },
    { name: 'صناديق النقدية', isOrange: true },
    { name: 'فاتورة جديدة', isOrange: false },
    { name: 'صرف عملات', isOrange: false },
    { name: 'البحث السريع', isOrange: false },
  ];

  return (
    <div className="w-full bg-[#005088] p-3 grid grid-cols-3 gap-2" dir="rtl">
      {actions.map((btn, index) => (
        <button
          key={index}
          onClick={() => onSelectAction(btn.name)}
          className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-transform text-center truncate ${
            btn.isOrange 
              ? 'bg-[#ff8c00] hover:bg-orange-600' 
              : 'bg-[#0077c2] hover:bg-blue-600'
          }`}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
};
