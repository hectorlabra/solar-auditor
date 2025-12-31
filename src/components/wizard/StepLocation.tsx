"use client";

import { useState } from "react";
import { useAuditStore } from "@/store/audit-store";
import { COMUNAS_LIST } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Sun, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export function StepLocation() {
  const { input, setComuna, setStep } = useAuditStore();
  const [selected, setSelected] = useState(input.comuna);

  const handleNext = () => {
    if (selected) {
      setComuna(selected);
      setStep("bill");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center text-center px-2"
    >
      {/* Visual Map Context */}
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          className="absolute inset-0 bg-primary/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Sun className="w-12 h-12 text-primary" />
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute -right-2 -bottom-2 bg-background rounded-full p-1 shadow-lg"
            >
              <MapPin className="w-5 h-5 text-indigo-500" />
            </motion.div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-3">¿Dónde está tu propiedad?</h2>
      <p className="text-muted-foreground mb-8 max-w-xs">
        La radiación solar varía según tu comuna. Usamos datos satelitales para
        calcular tu potencial.
      </p>

      {/* Comuna Selector */}
      <div className="w-full max-w-sm mb-6 space-y-4">
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="h-14 text-lg bg-background/50 border-primary/20 focus:ring-primary/50 transition-all">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-muted-foreground" />
              <SelectValue placeholder="Selecciona tu comuna" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {COMUNAS_LIST.map((comuna) => (
              <SelectItem key={comuna.value} value={comuna.value}>
                {comuna.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleNext}
          disabled={!selected}
          size="lg"
          className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20"
        >
          Analizar Ubicación
        </Button>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
        <Sun className="w-3 h-3" />
        <span>Datos basados en Global Solar Atlas</span>
      </div>
    </motion.div>
  );
}
