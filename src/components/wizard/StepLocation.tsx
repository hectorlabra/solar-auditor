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
import { MapPin, Sun } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      {/* Hero Icon */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-6"
      >
        <Sun className="w-16 h-16 text-amber-400" />
      </motion.div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-2 text-foreground">
        ¿Es rentable la energía solar
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-primary">
        en tu comuna?
      </h2>

      {/* Subtitle */}
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Descubre cuánto podrías ahorrar con paneles solares. Análisis gratuito
        en menos de 2 minutos.
      </p>

      {/* Comuna Selector */}
      <div className="w-full max-w-sm mb-6">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="pl-10 h-14 text-lg">
              <SelectValue placeholder="Selecciona tu comuna" />
            </SelectTrigger>
            <SelectContent>
              {COMUNAS_LIST.map((comuna) => (
                <SelectItem key={comuna.value} value={comuna.value}>
                  {comuna.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={handleNext}
        disabled={!selected}
        size="lg"
        className="w-full max-w-sm h-14 text-lg font-semibold"
      >
        Calcular mi Ahorro
      </Button>

      {/* Trust badge */}
      <p className="text-xs text-muted-foreground mt-6 text-center">
        ✓ Sin compromiso &nbsp;•&nbsp; ✓ 100% Gratuito &nbsp;•&nbsp; ✓
        Resultados inmediatos
      </p>
    </motion.div>
  );
}
