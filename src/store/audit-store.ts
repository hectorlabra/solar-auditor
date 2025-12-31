// Zustand Store - Global state for the audit wizard
import { create } from "zustand";
import { AuditStore, WizardStep, UserInput } from "@/types";
import { calculateFullAudit, getSolarData } from "@/lib/solar-logic";

const initialInput: UserInput = {
  comuna: "",
  monthlyBill: 80000,
  propertyType: null,
  isQualified: true,
};

export const useAuditStore = create<AuditStore>((set, get) => ({
  // Initial state
  input: initialInput,
  result: null,
  solarData: null,
  currentStep: "location",

  // Actions
  setComuna: (comuna: string) => {
    const solarData = getSolarData(comuna);
    set((state) => ({
      input: { ...state.input, comuna },
      solarData,
    }));
  },

  setMonthlyBill: (monthlyBill: number) => {
    set((state) => ({
      input: { ...state.input, monthlyBill },
    }));
  },

  setPropertyType: (propertyType: UserInput["propertyType"]) => {
    const isQualified = propertyType !== "departamento";
    set((state) => ({
      input: { ...state.input, propertyType, isQualified },
    }));
  },

  setContact: (name: string, email: string) => {
    set((state) => ({
      input: { ...state.input, name, email },
    }));
  },

  setStep: (step: WizardStep) => {
    set({ currentStep: step });
  },

  calculate: () => {
    const { input } = get();
    const result = calculateFullAudit(input.monthlyBill, input.comuna);
    set({ result });
  },

  reset: () => {
    set({
      input: initialInput,
      result: null,
      solarData: null,
      currentStep: "location",
    });
  },
}));
