"use client";

import { Card } from "@/components/ui/card";
import { motion, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Zap, Clock, Leaf } from "lucide-react";
import { useEffect, useState } from "react";

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

const AnimatedNumber = ({
  value,
  format = (v: number) => v.toString(),
}: {
  value: number;
  format?: (v: number) => string;
}) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    format(Math.round(current))
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

export function SummaryCard({
  annualSavings,
  panelCount,
  paybackYears,
  co2Avoided,
}: SummaryCardProps) {
  const stats = [
    {
      icon: TrendingUp,
      label: "Ahorro Anual Proyectado",
      value: annualSavings,
      format: (v: number) => formatCLP(v),
      color: "text-green-500",
      bg: "bg-green-500/10",
      delay: 0.1,
    },
    {
      icon: Zap,
      label: "Potencia Solar",
      value: panelCount,
      format: (v: number) => `${v} paneles`,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      delay: 0.2,
    },
    {
      icon: Clock,
      label: "Retorno de Inversión",
      value: paybackYears,
      format: (v: number) => `${v} años`,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      delay: 0.3,
    },
    {
      icon: Leaf,
      label: "Huella de Carbono",
      value: co2Avoided,
      format: (v: number) => `-${v} kg CO₂`,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: stat.delay, type: "spring" }}
          >
            <Card className="p-5 h-full glass-card border-none shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
              <div
                className={`absolute top-0 right-0 p-24 bg-gradient-to-br ${stat.bg.replace(
                  "/10",
                  "/5"
                )} to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div
                className={`p-2.5 w-fit rounded-xl ${stat.bg} mb-3 ring-1 ring-inset ring-white/10`}
              >
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-lg md:text-xl font-bold tracking-tight">
                <AnimatedNumber value={stat.value} format={stat.format} />
              </p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
