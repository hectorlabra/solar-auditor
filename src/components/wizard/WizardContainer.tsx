"use client";

import { useAuditStore } from "@/store/audit-store";
import { AnimatePresence, motion } from "framer-motion";
import { StepLocation } from "./StepLocation";
import { StepBill } from "./StepBill";
import { StepProperty } from "./StepProperty";
import { StepLoading } from "./StepLoading";
import { StepContact } from "./StepContact";

export function WizardContainer() {
  const { currentStep } = useAuditStore();

  // Progress logic
  const steps = [
    "location",
    "bill",
    "property",
    "loading",
    "contact",
    "result",
  ];
  const currentIndex = steps.indexOf(currentStep);
  // Don't show progress on result or loading, or normalize it
  const progress = Math.min(
    100,
    Math.max(5, (currentIndex / (steps.length - 2)) * 100)
  );

  const showProgress = currentStep !== "result" && currentStep !== "loading";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Liquid Progress Bar */}
      {showProgress && (
        <div className="absolute -top-8 left-0 right-0 h-1.5 bg-muted rounded-full overflow-hidden mb-8 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-600 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>
      )}

      {/* Glass Container for Wizard Steps */}
      <div className="glass rounded-2xl md:rounded-3xl p-1 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col justify-center">
        {/* Subtle internal glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="p-4 md:p-8 relative z-10 w-full">
          <AnimatePresence mode="wait">
            {currentStep === "location" && <StepLocation key="location" />}
            {currentStep === "bill" && <StepBill key="bill" />}
            {currentStep === "property" && <StepProperty key="property" />}
            {currentStep === "loading" && <StepLoading key="loading" />}
            {currentStep === "contact" && <StepContact key="contact" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
