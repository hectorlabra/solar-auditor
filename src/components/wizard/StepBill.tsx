"use client";

import { useState } from "react";
import { useAuditStore } from "@/store/audit-store";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";

// Format CLP currency
function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

// Get emoji based on bill amount
function getBillEmoji(bill: number): { emoji: string; label: string } {
  if (bill < 50000) return { emoji: "🙂", label: "Consumo bajo" };
  if (bill < 100000) return { emoji: "😐", label: "Consumo moderado" };
  if (bill < 200000) return { emoji: "😰", label: "Consumo alto" };
  if (bill < 400000) return { emoji: "💸", label: "Consumo muy alto" };
  return { emoji: "🔥", label: "¡Consume mucho!" };
}

export function StepBill() {
  const { input, setMonthlyBill, setStep } = useAuditStore();
  const [bill, setBill] = useState(input.monthlyBill);

  const { emoji, label } = getBillEmoji(bill);

  const handleNext = () => {
    setMonthlyBill(bill);
    setStep("property");
  };

  const handleBack = () => {
    setStep("location");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Icon */}
      <Zap className="w-12 h-12 text-amber-500 mb-4" />

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        ¿Cuánto pagas de luz al mes?
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Mueve el slider para indicar tu boleta promedio
      </p>

      {/* Emoji feedback */}
      <AnimatePresence mode="wait">
        <motion.div
          key={emoji}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className="text-6xl mb-2"
        >
          {emoji}
        </motion.div>
      </AnimatePresence>
      <p className="text-sm text-muted-foreground mb-4">{label}</p>

      {/* Bill amount */}
      <motion.div
        key={bill}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        className="text-4xl md:text-5xl font-bold text-primary mb-8"
      >
        {formatCLP(bill)}
      </motion.div>

      {/* Slider */}
      <div className="w-full max-w-md px-4 mb-8">
        <Slider
          value={[bill]}
          onValueChange={(values) => setBill(values[0])}
          min={20000}
          max={600000}
          step={5000}
          className="touch-none"
        />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>$20.000</span>
          <span>$600.000</span>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleNext}
        size="lg"
        className="w-full max-w-sm h-14 text-lg font-semibold"
      >
        Siguiente
      </Button>
    </motion.div>
  );
}
