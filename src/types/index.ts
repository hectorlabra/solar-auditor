// Types & Interfaces for Solar Auditor

// Solar data per comuna
export interface SolarData {
  name: string;
  slug: string;
  generationFactor: number; // kWh/kWp/año
  priceKwh: number; // CLP
}

// User inputs collected during wizard
export interface UserInput {
  comuna: string;
  monthlyBill: number; // CLP
  propertyType: "casa" | "comercial" | "departamento" | null;
  isQualified: boolean;
  name?: string;
  email?: string;
}

// Calculation results
export interface CalculationResult {
  annualConsumption: number; // kWh/año
  requiredPower: number; // kWp
  panelCount: number;
  annualSavings: number; // CLP/año
  monthlyBillWithSolar: number; // CLP
  paybackYears: number;
  twentyYearSavings: number; // CLP
  co2Avoided: number; // kg/año
}

// Complete audit data
export interface AuditData {
  input: UserInput;
  result: CalculationResult | null;
  solarData: SolarData | null;
}

// Wizard step types
export type WizardStep =
  | "location"
  | "bill"
  | "property"
  | "loading"
  | "contact"
  | "result";

// Store interface
export interface AuditStore extends AuditData {
  currentStep: WizardStep;
  setComuna: (comuna: string) => void;
  setMonthlyBill: (bill: number) => void;
  setPropertyType: (type: UserInput["propertyType"]) => void;
  setContact: (name: string, email: string) => void;
  setStep: (step: WizardStep) => void;
  calculate: () => void;
  reset: () => void;
}
