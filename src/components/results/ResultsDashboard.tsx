"use client";

import { useAuditStore } from "@/store/audit-store";
import { SummaryCard } from "./SummaryCard";
import { SavingsChart } from "./SavingsChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sun, Phone, RotateCcw } from "lucide-react";

function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ResultsDashboard() {
  const { input, result, solarData, reset } = useAuditStore();

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
    <div className="w-full max-w-2xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <Sun className="w-10 h-10 text-amber-400 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-1">
          Análisis para {solarData.name}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold">Podrías ahorrar</h1>
        <p className="text-4xl md:text-5xl font-bold text-green-500 mt-2">
          {formatCLP(result.annualSavings)}/año
        </p>
      </motion.div>

      {/* Summary Stats */}
      <div className="mb-6">
        <SummaryCard
          annualSavings={result.annualSavings}
          panelCount={result.panelCount}
          paybackYears={result.paybackYears}
          co2Avoided={result.co2Avoided}
        />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <SavingsChart
          monthlyBill={input.monthlyBill}
          annualSavings={result.annualSavings}
        />
      </div>

      {/* Qualification warning */}
      {!input.isQualified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 mb-6 bg-amber-500/10 border-amber-500/30">
            <p className="text-sm text-amber-600 dark:text-amber-400">
              ⚠️ Los departamentos suelen tener restricciones para instalación
              solar. Consulta con tu administración o considera opciones de
              energía compartida.
            </p>
          </Card>
        </motion.div>
      )}

      {/* Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Detalles del Sistema</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Consumo anual estimado
              </span>
              <span>{result.annualConsumption.toLocaleString()} kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Potencia requerida</span>
              <span>{result.requiredPower} kWp</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tu boleta actual</span>
              <span>{formatCLP(input.monthlyBill)}/mes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Boleta con solar</span>
              <span className="text-green-500 font-medium">
                {formatCLP(result.monthlyBillWithSolar)}/mes
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Sticky CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t"
      >
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={reset}
            className="flex-shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button size="lg" className="flex-1 h-14 text-lg font-semibold">
            <Phone className="w-5 h-5 mr-2" />
            Solicitar Visita Técnica
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
