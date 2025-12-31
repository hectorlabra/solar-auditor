"use client";

import { useEffect, useState } from "react";
import { useAuditStore } from "@/store/audit-store";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

const loadingMessages = [
  "Analizando radiación solar en tu zona...",
  "Consultando tarifas de distribuidora...",
  "Calculando dimensionamiento óptimo...",
  "Proyectando ahorro a 20 años...",
  "Generando tu informe personalizado...",
];

export function StepLoading() {
  const { solarData, setStep, calculate } = useAuditStore();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Run calculations
    calculate();

    // Simulate loading with progress
    const duration = 3000; // 3 seconds
    const interval = 50;
    const increment = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    // Cycle through messages
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 600);

    // Navigate to next step after loading
    const navigationTimer = setTimeout(() => {
      setStep("contact");
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
      clearTimeout(navigationTimer);
    };
  }, [calculate, setStep]);

  const comunaName = solarData?.name || "tu comuna";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      {/* Animated sun */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <Sun className="w-20 h-20 text-amber-400" />
      </motion.div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
        Analizando {comunaName}
      </h2>

      {/* Loading message */}
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-muted-foreground text-center mb-8 h-6"
      >
        {loadingMessages[messageIndex]}
      </motion.p>

      {/* Progress bar */}
      <div className="w-full max-w-sm h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Progress percentage */}
      <p className="text-sm text-muted-foreground mt-2">
        {Math.round(progress)}% completado
      </p>
    </motion.div>
  );
}
