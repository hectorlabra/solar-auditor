"use client";

import { useEffect, useState } from "react";
import { useAuditStore } from "@/store/audit-store";
import { motion } from "framer-motion";
import { CopyCheck, Database, Satellite, Server, Sun, Zap } from "lucide-react";

const technicalSteps = [
  { icon: Satellite, label: "Conectando con satélite Sentinel-5P..." },
  { icon: Sun, label: "Analizando Irradiancia Horizontal Global (GHI)..." },
  { icon: Database, label: "Cruzando datos con tarifas CNE vigentes..." },
  { icon: Zap, label: "Simulando curva de generación fotovoltaica..." },
  { icon: Server, label: "Calculando ROI y Amortización..." },
  { icon: CopyCheck, label: "Generando reporte de ingeniería..." },
];

export function StepLoading() {
  const { solarData, setStep, calculate } = useAuditStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Run calculations
    calculate();

    const stepDuration = 800; // ms per step
    const totalDuration = stepDuration * technicalSteps.length;

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= technicalSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    const navigationTimer = setTimeout(() => {
      setStep("contact");
    }, totalDuration + 500);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(navigationTimer);
    };
  }, [calculate, setStep]);

  const CurrentIcon = technicalSteps[currentStepIndex].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] w-full px-4"
    >
      {/* Scanner Visual */}
      <div className="relative w-40 h-40 mb-12">
        {/* Radar Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-primary/30 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "linear",
            }}
          />
        ))}

        {/* Central Hub */}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/50 shadow-[0_0_30px_rgba(245,158,11,0.3)] z-10">
          <motion.div
            key={currentStepIndex}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-primary"
          >
            <CurrentIcon className="w-16 h-16" />
          </motion.div>
        </div>

        {/* Orbiting Dot */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
        </motion.div>
      </div>

      {/* Engineering Terminal Text */}
      <div className="h-16 flex flex-col items-center justify-center">
        <motion.p
          key={currentStepIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm md:text-base text-primary/90 tracking-wide text-center"
        >
          {">"} {technicalSteps[currentStepIndex].label}
          <span className="animate-pulse">_</span>
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md h-1 bg-muted/30 mt-8 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.8, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
