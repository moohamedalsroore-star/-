import { Calculator } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function Splash({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 7000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-2000 flex flex-col items-center justify-center bg-gradient-to-br from-[#003366] to-[#0056b3] text-white"
    >
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="text-center"
      >
        <Calculator className="mx-auto mb-6 h-30 w-30 text-accent-orange" />
        <div className="mb-2 text-4xl font-bold tracking-wider">الغفاري سوفت</div>
        <div className="text-lg text-gray-200 opacity-90">نظام المحاسب الذكي المتكامل</div>
      </motion.div>

      <div className="absolute bottom-12 w-4/5 max-w-md border-t border-white/20 pt-5 text-center text-lg leading-relaxed opacity-90">
        إعداد وتنفيذ: <strong className="text-accent-orange">م / محمد عبد الغفار السروري</strong><br />
        تحت إشراف: <strong className="text-accent-orange">م / محمد عبد الغفار السروري</strong>
      </div>
    </motion.div>
  );
}
