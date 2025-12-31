// Solar Data Constants - Based on Global Solar Atlas & CNE Chile
import { SolarData } from "@/types";

// Database of solar data per comuna (slug -> data)
export const DATA_SOLAR: Record<string, SolarData> = {
  // Región Metropolitana
  santiago: {
    name: "Santiago",
    slug: "santiago",
    generationFactor: 1600,
    priceKwh: 165,
  },
  providencia: {
    name: "Providencia",
    slug: "providencia",
    generationFactor: 1600,
    priceKwh: 165,
  },
  "las-condes": {
    name: "Las Condes",
    slug: "las-condes",
    generationFactor: 1620,
    priceKwh: 165,
  },
  nunoa: {
    name: "Ñuñoa",
    slug: "nunoa",
    generationFactor: 1600,
    priceKwh: 165,
  },
  maipu: {
    name: "Maipú",
    slug: "maipu",
    generationFactor: 1580,
    priceKwh: 162,
  },
  "puente-alto": {
    name: "Puente Alto",
    slug: "puente-alto",
    generationFactor: 1610,
    priceKwh: 160,
  },
  "la-florida": {
    name: "La Florida",
    slug: "la-florida",
    generationFactor: 1600,
    priceKwh: 163,
  },
  vitacura: {
    name: "Vitacura",
    slug: "vitacura",
    generationFactor: 1630,
    priceKwh: 165,
  },
  // Norte
  antofagasta: {
    name: "Antofagasta",
    slug: "antofagasta",
    generationFactor: 2100,
    priceKwh: 155,
  },
  calama: {
    name: "Calama",
    slug: "calama",
    generationFactor: 2200,
    priceKwh: 150,
  },
  copiapo: {
    name: "Copiapó",
    slug: "copiapo",
    generationFactor: 2050,
    priceKwh: 158,
  },
  "la-serena": {
    name: "La Serena",
    slug: "la-serena",
    generationFactor: 1900,
    priceKwh: 160,
  },
  // Centro
  valparaiso: {
    name: "Valparaíso",
    slug: "valparaiso",
    generationFactor: 1550,
    priceKwh: 168,
  },
  "vina-del-mar": {
    name: "Viña del Mar",
    slug: "vina-del-mar",
    generationFactor: 1540,
    priceKwh: 168,
  },
  rancagua: {
    name: "Rancagua",
    slug: "rancagua",
    generationFactor: 1650,
    priceKwh: 158,
  },
  // Sur
  concepcion: {
    name: "Concepción",
    slug: "concepcion",
    generationFactor: 1350,
    priceKwh: 170,
  },
  talca: {
    name: "Talca",
    slug: "talca",
    generationFactor: 1500,
    priceKwh: 162,
  },
  temuco: {
    name: "Temuco",
    slug: "temuco",
    generationFactor: 1250,
    priceKwh: 175,
  },
  "puerto-montt": {
    name: "Puerto Montt",
    slug: "puerto-montt",
    generationFactor: 1100,
    priceKwh: 180,
  },
};

// Helper to get all comunas for selector
export const COMUNAS_LIST = Object.values(DATA_SOLAR).map((d) => ({
  value: d.slug,
  label: d.name,
}));

// Installation cost per kWp (CLP) - average market price
export const COST_PER_KWP = 950000;

// Panel specs
export const PANEL_WATTAGE = 550; // Watts per panel

// System efficiency margin
export const EFFICIENCY_MARGIN = 0.85;

// CO2 factor (kg CO2 per kWh from grid)
export const CO2_FACTOR = 0.4;
