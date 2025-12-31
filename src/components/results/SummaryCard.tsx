"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Clock, Leaf } from "lucide-react";

interface SummaryCardProps {
  annualSavings: number;
  panelCount: number;
  paybackYears: number;
  co2Avoided: number;
}

function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function SummaryCard({
  annualSavings,
  panelCount,
  paybackYears,
  co2Avoided,
}: SummaryCardProps) {
  const stats = [
    {
      icon: TrendingUp,
      label: "Ahorro Anual",
      value: formatCLP(annualSavings),
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Zap,
      label: "Paneles Necesarios",
      value: `${panelCount} paneles`,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Clock,
      label: "Retorno de Inversión",
      value: `${paybackYears} años`,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Leaf,
      label: "CO₂ Evitado/Año",
      value: `${co2Avoided} kg`,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 h-full">
              <div className={`p-2 w-fit rounded-lg ${stat.bg} mb-2`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
