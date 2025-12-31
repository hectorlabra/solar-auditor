"use client";

import { useAuditStore } from "@/store/audit-store";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Building2, Building } from "lucide-react";

const propertyOptions = [
  {
    type: "casa" as const,
    icon: Home,
    title: "Casa",
    description: "Techo propio",
    qualified: true,
  },
  {
    type: "comercial" as const,
    icon: Building2,
    title: "Comercial",
    description: "Negocio o empresa",
    qualified: true,
  },
  {
    type: "departamento" as const,
    icon: Building,
    title: "Departamento",
    description: "Arriendo",
    qualified: false,
  },
];

export function StepProperty() {
  const { setPropertyType, setStep } = useAuditStore();

  const handleSelect = (
    type: "casa" | "comercial" | "departamento",
    qualified: boolean
  ) => {
    setPropertyType(type);
    // Still proceed but mark as not qualified if apartment
    setStep("loading");
  };

  const handleBack = () => {
    setStep("bill");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        ¿Qué tipo de propiedad tienes?
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Esto nos ayuda a personalizar tu análisis
      </p>

      {/* Property cards */}
      <div className="grid gap-4 w-full max-w-md">
        {propertyOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => handleSelect(option.type, option.qualified)}
                className="p-6 cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
