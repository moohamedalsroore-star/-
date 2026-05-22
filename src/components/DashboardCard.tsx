import { ReactNode } from "react";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  amount?: string;
  iconColor: string;
}

export default function DashboardCard({ icon, title, amount, iconColor }: DashboardCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 text-center shadow-sm border border-slate-200">
      <div style={{ color: iconColor }}>{icon}</div>
      <span className="mt-2 block font-bold text-gray-600">{title}</span>
      {amount && <span className="mt-1 text-sm text-red-700">{amount}</span>}
    </div>
  );
}
