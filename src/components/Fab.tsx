import { Plus } from "lucide-react";

export default function Fab() {
  return (
    <div className="fixed bottom-6 left-6 flex h-15 w-15 items-center justify-center rounded-full bg-accent-orange text-white shadow-lg cursor-pointer">
      <Plus size={30} />
    </div>
  );
}
