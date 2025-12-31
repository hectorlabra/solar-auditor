"use client";

import { useAuditStore } from "@/store/audit-store";
import { SummaryCard } from "./SummaryCard";
import { SavingsChart } from "./SavingsChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sun, Phone, RotateCcw, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ResultsDashboard() {
  const { input, result, solarData, reset } = useAuditStore();

  useEffect(() => {
    if (result) {
      // Trigger confetti on mount
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [result]);

  if (!result || !solarData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-muted-foreground">No hay resultados disponibles</p>
        <Button onClick={reset} className="mt-4">
          Empezar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-500/30"
        >
          <Sun className="w-8 h-8 text-white" />
        </motion.div>

        <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-widest">
          Informe Solar para {solarData.name}
        </p>
        <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">
          Tu Potencial de Ahorro
        </h1>
        <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mt-4 leading-tight">
          {formatCLP(result.annualSavings)}
          <span className="text-lg md:text-2xl text-muted-foreground font-medium ml-2">
            /año
          </span>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Summary Stats - Spans 2 cols on Desktop */}
        <div className="lg:col-span-3">
          <SummaryCard
            annualSavings={result.annualSavings}
            panelCount={result.panelCount}
            paybackYears={result.paybackYears}
            co2Avoided={result.co2Avoided}
          />
        </div>

        {/* Chart - Spans 2 cols */}
        <div className="lg:col-span-2 h-full">
          <SavingsChart
            monthlyBill={input.monthlyBill}
            annualSavings={result.annualSavings}
          />
        </div>

        {/* Details & Advice - Spans 1 col */}
        <div className="space-y-6">
          {/* System Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 h-full glass-card border-none bg-card/50">
              <h3 className="font-semibold mb-4 text-lg">Especificaciones</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Consumo Anual</span>
                  <span className="font-mono">
                    {result.annualConsumption.toLocaleString()} kWh
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">
                    Sistema Sugerido
                  </span>
                  <span className="font-mono">{result.requiredPower} kWp</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Boleta Actual</span>
                  <span className="font-mono">
                    {formatCLP(input.monthlyBill)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Nueva Boleta</span>
                  <span className="font-mono text-green-500 font-bold">
                    {formatCLP(result.monthlyBillWithSolar)}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Qualification Warning */}
          {!input.isQualified && (
            <Card className="p-4 bg-amber-500/10 border-amber-500/20">
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                ⚠️ Nota: Al vivir en departamento, la instalación requiere
                aprobación del edificio.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl z-50 p-2 rounded-2xl bg-foreground/90 backdrop-blur-md shadow-2xl border border-white/10 flex gap-2"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={reset}
          className="text-background hover:bg-white/10 rounded-xl w-12 h-12"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>

        <Button
          size="lg"
          className="flex-1 h-12 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
        >
          <Phone className="w-4 h-4 mr-2" />
          Agendar Asesoría Gratis
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-background hover:bg-white/10 rounded-xl w-12 h-12"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
}
