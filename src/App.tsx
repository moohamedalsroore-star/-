/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Splash from "./components/Splash";
import Header from "./components/Header";
import { QuickActions } from "./components/QuickActions";
import DashboardCard from "./components/DashboardCard";
import Drawer from "./components/Drawer";
import Fab from "./components/Fab";
import ActionModal from "./components/ActionModal";
import { AdvancedSearchModal } from "./components/AdvancedSearchModal";
import { Users, User, Briefcase, HandCoins, Wallet, ShoppingBasket, Ruler, Compass } from "lucide-react";

export default function App() {
  const [showMain, setShowMain] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  // حفظ ومزامنة البيانات في ذاكرة الـ LocalStorage تلقائياً
  const [transactions, setTransactions] = useState<any[]>(() => {
    const saved = localStorage.getItem('ghaffari_soft_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [balances, setBalances] = useState({
    customers: 0, suppliers: 0, employees: 0, debts: 0, expenses: 0, others: 0
  });

  // تحديث البطاقات والعدادات فوراً عند إدخال أي عملية جديدة
  useEffect(() => {
    localStorage.setItem('ghaffari_soft_v1', JSON.stringify(transactions));
    
    const newBalances = { customers: 0, suppliers: 0, employees: 0, debts: 0, expenses: 0, others: 0 };
    transactions.forEach((tx: any) => {
      if (tx.account === 'العملاء') newBalances.customers += tx.amount;
      if (tx.account === 'الموردين') newBalances.suppliers += tx.amount;
      if (tx.account === 'الموظفين') newBalances.employees += tx.amount;
      if (tx.account === 'الديون') newBalances.debts += tx.amount;
      if (tx.account === 'الصرفيات') newBalances.expenses += tx.amount;
      if (tx.account === 'أخرى') newBalances.others += tx.amount;
    });
    setBalances(newBalances);
  }, [transactions]);

  const handleSaveTransaction = (newTx: any) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  const handleAdvancedSearch = (criteria: any) => {
    const results = transactions.filter(tx => {
      let match = true;
      if (criteria.accountType && tx.account !== criteria.accountType) match = false;
      if (criteria.keyword && !tx.description.includes(criteria.keyword)) match = false;
      if (criteria.minAmount && tx.amount < criteria.minAmount) match = false;
      if (criteria.maxAmount && tx.amount > criteria.maxAmount) match = false;
      return match;
    });
    setSearchResults(results);
    alert(`تم العثور على ${results.length} نتائج`);
  };

  const cards = [
    { icon: <Users size={30} />, title: "العملاء", amount: `${balances.customers.toLocaleString()} ر.ي`, iconColor: "#2b7afc" },
    { icon: <User size={30} />, title: "الموردين", amount: `${balances.suppliers.toLocaleString()} ر.ي`, iconColor: "#10b981" },
    { icon: <Briefcase size={30} />, title: "الموظفين", amount: `${balances.employees.toLocaleString()} ر.ي`, iconColor: "#f59e0b" },
    { icon: <HandCoins size={30} />, title: "الديون", amount: `${balances.debts.toLocaleString()} ر.ي`, iconColor: "#ef4444" },
    { icon: <Wallet size={30} />, title: "الصرفيات", amount: `${balances.expenses.toLocaleString()} ر.ي`, iconColor: "#8b5cf6" },
    { icon: <ShoppingBasket size={30} />, title: "أخرى", amount: `${balances.others.toLocaleString()} ر.ي`, iconColor: "#ec4899" },
    { icon: <Ruler size={30} />, title: "تمتير ومقاسات", iconColor: "#06b6d4" },
    { icon: <Compass size={30} />, title: "مقاس جديد", iconColor: "#64748b" },
  ];

  if (!showMain) {
    return <Splash onFinish={() => setShowMain(true)} />;
  }

  const handleSelectAction = (actionName: string) => {
    if (actionName === 'البحث السريع') {
      setIsSearchModalOpen(true);
    } else {
      setActiveAction(actionName);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-bg-light" dir="rtl">
      <Header toggleDrawer={() => setIsDrawerOpen(true)} />
      <QuickActions onSelectAction={handleSelectAction} />
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
      </div>
      <Fab />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <ActionModal 
        isOpen={!!activeAction} 
        onClose={() => setActiveAction(null)} 
        actionType={activeAction} 
        onSave={handleSaveTransaction} 
      />
      <AdvancedSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} onSearch={handleAdvancedSearch} />
    </div>
  );
}

