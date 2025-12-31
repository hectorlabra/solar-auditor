// Solar Calculation Engine - Pure functions for financial calculations
import {
  DATA_SOLAR,
  COST_PER_KWP,
  PANEL_WATTAGE,
  EFFICIENCY_MARGIN,
  CO2_FACTOR,
} from "./constants";
import { CalculationResult, SolarData } from "@/types";

/**
 * Get solar data for a specific comuna
 */
export function getSolarData(comunaSlug: string): SolarData | null {
  return DATA_SOLAR[comunaSlug] || null;
}

/**
 * Calculate annual electricity consumption in kWh
 * Formula: (Monthly Bill / Price per kWh) * 12
 */
export function calculateAnnualConsumption(
  monthlyBill: number,
  priceKwh: number
): number {
  return (monthlyBill / priceKwh) * 12;
}

/**
 * Calculate required solar system power in kWp
 * Formula: Annual Consumption / (Generation Factor * Efficiency Margin)
 */
export function calculateRequiredPower(
  annualConsumption: number,
  generationFactor: number
): number {
  return annualConsumption / (generationFactor * EFFICIENCY_MARGIN);
}

/**
 * Calculate number of solar panels needed
 * Formula: Ceil(Required Power * 1000 / Panel Wattage)
 */
export function calculatePanelCount(requiredPowerKwp: number): number {
  return Math.ceil((requiredPowerKwp * 1000) / PANEL_WATTAGE);
}

/**
 * Calculate annual savings in CLP
 * Formula: Installed Power * Generation Factor * Efficiency * Price per kWh
 */
export function calculateAnnualSavings(
  installedPowerKwp: number,
  generationFactor: number,
  priceKwh: number
): number {
  return installedPowerKwp * generationFactor * EFFICIENCY_MARGIN * priceKwh;
}

/**
 * Calculate installation cost
 */
export function calculateInstallationCost(powerKwp: number): number {
  return powerKwp * COST_PER_KWP;
}

/**
 * Calculate payback period in years
 */
export function calculatePaybackYears(
  installationCost: number,
  annualSavings: number
): number {
  if (annualSavings <= 0) return 999;
  return installationCost / annualSavings;
}

/**
 * Calculate CO2 avoided per year in kg
 */
export function calculateCO2Avoided(annualConsumption: number): number {
  return annualConsumption * CO2_FACTOR;
}

/**
 * Run complete solar audit calculation
 */
export function calculateFullAudit(
  monthlyBill: number,
  comunaSlug: string
): CalculationResult | null {
  const solarData = getSolarData(comunaSlug);
  if (!solarData) return null;

  const { generationFactor, priceKwh } = solarData;

  // Core calculations
  const annualConsumption = calculateAnnualConsumption(monthlyBill, priceKwh);
  const requiredPower = calculateRequiredPower(
    annualConsumption,
    generationFactor
  );
  const panelCount = calculatePanelCount(requiredPower);

  // Real installed power based on panel count
  const installedPowerKwp = (panelCount * PANEL_WATTAGE) / 1000;

  // Financial calculations
  const annualSavings = calculateAnnualSavings(
    installedPowerKwp,
    generationFactor,
    priceKwh
  );
  const installationCost = calculateInstallationCost(installedPowerKwp);
  const paybackYears = calculatePaybackYears(installationCost, annualSavings);
  const monthlyBillWithSolar = Math.max(0, monthlyBill - annualSavings / 12);
  const twentyYearSavings = annualSavings * 20 - installationCost;

  // Environmental impact
  const co2Avoided = calculateCO2Avoided(annualConsumption);

  return {
    annualConsumption: Math.round(annualConsumption),
    requiredPower: Math.round(requiredPower * 100) / 100,
    panelCount,
    annualSavings: Math.round(annualSavings),
    monthlyBillWithSolar: Math.round(monthlyBillWithSolar),
    paybackYears: Math.round(paybackYears * 10) / 10,
    twentyYearSavings: Math.round(twentyYearSavings),
    co2Avoided: Math.round(co2Avoided),
  };
}
