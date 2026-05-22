import { Menu, RotateCw, Search, Plus, Bell } from "lucide-react";

export default function Header({ toggleDrawer }: { toggleDrawer: () => void }) {
  return (
    <div className="flex items-center justify-between bg-dark-blue p-4 text-white shadow-md">
      <div className="flex items-center gap-4">
        <Menu className="cursor-pointer" size={22} onClick={toggleDrawer} />
        <h1 className="text-xl font-semibold">الغفاري سوفت...</h1>
      </div>
      <div className="flex gap-5 text-lg">
        <Plus className="cursor-pointer" size={20} />
        <Search className="cursor-pointer" size={20} />
        <Bell className="cursor-pointer" size={20} />
        <RotateCw className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}
