"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface SavingsChartProps {
  monthlyBill: number;
  annualSavings: number;
}

function formatMillions(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
}

export function SavingsChart({
  monthlyBill,
  annualSavings,
}: SavingsChartProps) {
  // Generate 20-year projection data with slightly more optimistic solar inflation protection
  const data = Array.from({ length: 21 }, (_, year) => {
    // Grid prices often rise faster than general inflation
    const inflationFactor = Math.pow(1.06, year); // 6% energy inflation
    const yearlyBillGrid = monthlyBill * 12 * inflationFactor;

    // Solar degradation is minimal (linear 0.5%)
    const degradationFactor = Math.pow(0.995, year);

    // Cumulative costs
    const cumulativeGrid = Array.from(
      { length: year + 1 },
      (_, y) => monthlyBill * 12 * Math.pow(1.06, y)
    ).reduce((a, b) => a + b, 0);

    const cumulativeSolar =
      year === 0
        ? 0
        : Array.from({ length: year }, (_, y) =>
            Math.max(
              0,
              monthlyBill * 12 * Math.pow(1.06, y) -
                annualSavings * Math.pow(1.06, y) * Math.pow(0.995, y) // Savings grow with energy price
            )
          ).reduce((a, b) => a + b, 0);

    return {
      year: year === 0 ? "Hoy" : `Año ${year}`,
      "Costo Red": Math.round(cumulativeGrid),
      "Con Solar": Math.round(cumulativeSolar),
    };
  });

  const twentyYearDiff = data[20]["Costo Red"] - data[20]["Con Solar"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="h-full"
    >
      <Card className="p-6 glass-card border-none bg-card/50 h-full flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full" />
            Proyección Financiera (20 Años)
          </h3>
          <p className="text-sm text-muted-foreground mt-1 ml-4">
            Comparativa acumulada: Red Eléctrica vs. Tu Sistema Solar
          </p>
        </div>

        <div className="flex-1 w-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--destructive)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--destructive)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="opacity-10"
                stroke="currentColor"
              />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickFormatter={formatMillions}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                formatter={(value) => [
                  typeof value === "number" ? formatMillions(value) : "",
                  "",
                ]}
                labelStyle={{ color: "var(--foreground)", fontWeight: "bold" }}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                }}
                itemStyle={{ padding: 0 }}
              />
              <Legend iconType="circle" />
              <Area
                type="monotone"
                dataKey="Costo Red"
                name="Sin Paneles (Gasto Red)"
                stroke="var(--destructive)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGrid)"
              />
              <Area
                type="monotone"
                dataKey="Con Solar"
                name="Con Paneles (Gasto Residual)"
                stroke="var(--primary)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSolar)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 bg-primary/10 rounded-xl border border-primary/10">
          <p className="text-xs text-center font-medium text-primary">
            🚀 El costo de la energía sube un 6% anual aprox. Solar Auditor
            congela tu precio.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
