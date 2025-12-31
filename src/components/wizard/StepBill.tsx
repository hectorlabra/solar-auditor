"use client";

import { useState } from "react";
import { useAuditStore } from "@/store/audit-store";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Flame } from "lucide-react";

// Format CLP currency
function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

// Get reaction based on bill amount
function getBillReaction(bill: number): {
  emoji: string;
  label: string;
  color: string;
} {
  if (bill < 50000)
    return { emoji: "🌱", label: "Consumo eficiente", color: "text-green-500" };
  if (bill < 100000)
    return { emoji: "🙂", label: "Consumo normal", color: "text-emerald-500" };
  if (bill < 200000)
    return { emoji: "😐", label: "Podrías ahorrar", color: "text-amber-500" };
  if (bill < 400000)
    return { emoji: "😰", label: "Gasto alto", color: "text-orange-500" };
  return {
    emoji: "🔥",
    label: "¡Estás quemando dinero!",
    color: "text-red-500",
  };
}

export function StepBill() {
  const { input, setMonthlyBill, setStep } = useAuditStore();
  const [bill, setBill] = useState(input.monthlyBill);

  const { emoji, label, color } = getBillReaction(bill);

  const handleNext = () => {
    setMonthlyBill(bill);
    setStep("property");
  };

  const handleBack = () => {
    setStep("location");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center text-center px-2 py-4"
    >
      <button
        onClick={handleBack}
        className="absolute top-0 left-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <h2 className="text-3xl font-bold mb-2">Tu Gasto Mensual</h2>
      <p className="text-muted-foreground mb-8">
        ¿Cuánto pagas de luz en promedio?
      </p>

      {/* Dynamic Money Display */}
      <div className="relative mb-10">
        <motion.div
          key={bill}
          className="text-5xl md:text-6xl font-black tracking-tight text-foreground"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
        >
          {formatCLP(bill)}
        </motion.div>

        {/* Status Badge */}
        <motion.div
          className={`absolute -bottom-8 left-0 right-0 text-center text-sm font-semibold ${color} flex items-center justify-center gap-2`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>
            {emoji} {label}
          </span>
          {bill > 300000 && <Flame className="w-4 h-4 animate-pulse" />}
        </motion.div>
      </div>

      {/* Custom Slider Container */}
      <div className="w-full max-w-sm space-y-8">
        <Slider
          value={[bill]}
          onValueChange={(values) => setBill(values[0])}
          min={20000}
          max={600000}
          step={5000}
          className="cursor-pointer"
        />

        <div className="flex justify-between text-xs font-mono text-muted-foreground/50 uppercase">
          <span>Eficiente</span>
          <span>Critico</span>
        </div>

        <Button
          onClick={handleNext}
          size="lg"
          className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20"
        >
          Continuar
        </Button>
      </div>
    </motion.div>
  );
}
