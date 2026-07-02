import { api } from "./client";
import type { Property, PropertyFilters } from "@/types/property";

export interface Stats {
  totalListings: number;
  states: number;
  propertyTypes: number;
  featured: number;
}

function buildQuery(filters: PropertyFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function fetchProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  return api.get<Property[]>(`/properties${buildQuery(filters)}`);
}

export function fetchProperty(id: string): Promise<Property> {
  return api.get<Property>(`/properties/${id}`);
}

export function fetchFeaturedProperties(): Promise<Property[]> {
  return api.get<Property[]>("/properties?featured=true");
}

export function fetchStats(): Promise<Stats> {
  return api.get<Stats>("/properties/stats");
}