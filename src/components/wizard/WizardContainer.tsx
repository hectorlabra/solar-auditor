"use client";

import { useAuditStore } from "@/store/audit-store";
import { AnimatePresence } from "framer-motion";
import { StepLocation } from "./StepLocation";
import { StepBill } from "./StepBill";
import { StepProperty } from "./StepProperty";
import { StepLoading } from "./StepLoading";
import { StepContact } from "./StepContact";

export function WizardContainer() {
  const { currentStep } = useAuditStore();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {currentStep === "location" && <StepLocation key="location" />}
        {currentStep === "bill" && <StepBill key="bill" />}
        {currentStep === "property" && <StepProperty key="property" />}
        {currentStep === "loading" && <StepLoading key="loading" />}
        {currentStep === "contact" && <StepContact key="contact" />}
      </AnimatePresence>
    </div>
  );
}
