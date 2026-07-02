import type { PropertyType } from "@/types/property";

export const PROPERTY_TYPES: Record<PropertyType, string> = {
  office: "Office",
  retail: "Retail",
  warehouse: "Warehouse",
  industrial: "Industrial",
  "mixed-use": "Mixed Use",
};

export const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "ACT", "TAS", "NT"] as const;