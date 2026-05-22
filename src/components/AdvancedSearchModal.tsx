import React, { useState } from 'react';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (criteria: any) => void;
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [accountType, setAccountType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch({ accountType, keyword, minAmount: parseFloat(minAmount), maxAmount: parseFloat(maxAmount) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4" dir="rtl">
        <h2 className="text-xl font-bold text-[#005088]">بحث متقدم</h2>
        
        <input type="text" placeholder="البيان / تفاصيل العملية..." value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full p-3 border rounded-xl" />
        
        <select value={accountType} onChange={(e) => setAccountType(e.target.value)} className="w-full p-3 border rounded-xl">
          <option value="">جميع الحسابات</option>
          <option value="العملاء">العملاء</option>
          <option value="الموردين">الموردين</option>
          <option value="الموظفين">الموظفين</option>
          <option value="الديون">الديون والالتزامات</option>
          <option value="الصرفيات">الصرفيات والمصاريف</option>
        </select>

        <div className="flex gap-2">
          <input type="number" placeholder="من مبلغ..." value={minAmount} onChange={(e) => setMinAmount(e.target.value)} className="w-1/2 p-3 border rounded-xl" />
          <input type="number" placeholder="إلى مبلغ..." value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className="w-1/2 p-3 border rounded-xl" />
        </div>

        <div className="flex gap-2 pt-2">
            <button onClick={handleSearch} className="flex-1 bg-[#005088] text-white p-3 rounded-xl font-bold">بحث</button>
            <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-xl font-bold">إلغاء</button>
        </div>
      </div>
    </div>
  );
};
