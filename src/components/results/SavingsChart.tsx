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
  // Generate 20-year projection data
  const data = Array.from({ length: 21 }, (_, year) => {
    // Assume 5% annual electricity price increase
    const inflationFactor = Math.pow(1.05, year);
    const yearlyBill = monthlyBill * 12 * inflationFactor;

    // Cumulative costs
    const cumulativeGrid = Array.from(
      { length: year + 1 },
      (_, y) => monthlyBill * 12 * Math.pow(1.05, y)
    ).reduce((a, b) => a + b, 0);

    // Solar savings grow with inflation too (you're avoiding higher prices)
    const cumulativeSolar =
      year === 0
        ? 0
        : Array.from({ length: year }, (_, y) =>
            Math.max(
              0,
              monthlyBill * 12 * Math.pow(1.05, y) -
                annualSavings * Math.pow(1.02, y)
            )
          ).reduce((a, b) => a + b, 0);

    return {
      year: `Año ${year}`,
      "Sin Solar": Math.round(cumulativeGrid),
      "Con Solar": Math.round(cumulativeSolar),
    };
  });

  const twentyYearDiff = data[20]["Sin Solar"] - data[20]["Con Solar"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-2">Proyección a 20 Años</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ahorro acumulado estimado:{" "}
          <span className="text-green-500 font-bold">
            {formatMillions(twentyYearDiff)}
          </span>
        </p>

        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 10 }}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickFormatter={formatMillions}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip
                formatter={(value: number) => [formatMillions(value), ""]}
                labelStyle={{ color: "var(--foreground)" }}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Sin Solar"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorGrid)"
              />
              <Area
                type="monotone"
                dataKey="Con Solar"
                stroke="#22c55e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSolar)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
