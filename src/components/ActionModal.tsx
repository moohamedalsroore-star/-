import React, { useState } from 'react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: string | null;
  onSave?: (data: any) => void;
}

export default function ActionModal({ isOpen, onClose, actionType, onSave }: ActionModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [targetAccount, setTargetAccount] = useState('العملاء');
  const [extraDetail, setExtraDetail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) {
      alert('يرجى ملاً الحقول المفتوحة لتثبيت العملية في النظام.');
      return;
    }
    
    if (onSave) {
        onSave({
          id: Date.now(),
          date: new Date().toLocaleDateString('ar-YE'),
          type: actionType,
          account: targetAccount,
          description: description,
          amount: parseFloat(amount),
          extra: extraDetail
        });
    }

    setAmount('');
    setDescription('');
    setExtraDetail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in" dir="rtl">
        
        <div className="bg-[#005088] text-white p-4 text-center font-bold text-lg flex justify-between items-center">
          <span>{actionType}</span>
          <button type="button" onClick={onClose} className="text-white hover:text-orange-400 text-xl font-light">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">الحساب المستهدف</label>
            <select 
              value={targetAccount} 
              onChange={(e) => setTargetAccount(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-[#005088] outline-none text-sm"
            >
              <option value="العملاء">العملاء</option>
              <option value="الموردين">الموردين</option>
              <option value="الموظفين">الموظفين</option>
              <option value="الديون">الديون والالتزامات</option>
              <option value="الصرفيات">الصرفيات والمصاريف</option>
              <option value="أخرى">أخرى / متنوعة</option>
            </select>
          </div>

          {actionType && actionType.includes('حوالة') && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">رقم الحوالة / شبكة الصرافة</label>
              <input 
                type="text" 
                placeholder="مثال: حوالة النجم، النجم إكسبرس..." 
                value={extraDetail}
                onChange={(e) => setExtraDetail(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-[#005088] text-sm"
              />
            </div>
          )}

          {(actionType && (actionType.includes('مخزن') || actionType.includes('توريد') || actionType.includes('صرف مخزني'))) && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">المستودع / المخزن الفرعي</label>
              <input 
                type="text" 
                placeholder="حدد المخزن (مثال: المخزن الرئيسي)..." 
                value={extraDetail}
                onChange={(e) => setExtraDetail(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-[#005088] text-sm"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">المبلغ / القيمة (ر.ي)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-[#005088] text-left text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">البيان / تفاصيل العملية</label>
            <input 
              type="text" 
              placeholder="اكتب شرحاً دقيقاً للحركة..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-[#005088] text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 bg-[#005088] text-white p-3 rounded-xl font-bold text-sm hover:bg-opacity-90 active:scale-95 transition-transform">
              تثبيت وحفظ القيد
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-xl font-bold text-sm hover:bg-gray-300">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
