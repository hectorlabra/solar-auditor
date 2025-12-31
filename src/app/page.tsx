"use client";

import { WizardContainer } from "@/components/wizard/WizardContainer";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, TrendingUp, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 aurora-bg z-0 pointer-events-none opacity-50 dark:opacity-30" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-12 pb-6 px-4">
        {/* Floating Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card px-4 py-1.5 rounded-full flex items-center gap-2 mb-6"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-background"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            +500 hogares analizados hoy
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-center max-w-3xl mb-4 tracking-tight"
        >
          Convierte el sol en{" "}
          <span className="text-gradient">Activos Financieros</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground text-center max-w-xl mb-12"
        >
          Ingeniería de precisión para calcular tu ahorro solar real. Sin
          vendedores, solo datos.
        </motion.p>

        {/* Wizard Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="w-full max-w-2xl"
        >
          <WizardContainer />
        </motion.div>

        {/* Trust Indicators / Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {/* Logos placeholders using Icons */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="font-semibold tracking-widest">SEC</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="font-semibold tracking-widest">CER</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold tracking-widest">ACERA</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            <span className="font-semibold tracking-widest">ACESOL</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
