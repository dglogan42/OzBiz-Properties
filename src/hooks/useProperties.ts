import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchFeaturedProperties, fetchProperties, fetchProperty, fetchStats } from "@/api/properties";
import { submitContact, submitEnquiry } from "@/api/forms";
import type { ContactPayload, EnquiryPayload } from "@/api/forms";
import type { PropertyFilters } from "@/types/property";

export const propertyKeys = {
  all: ["properties"] as const,
  lists: () => [...propertyKeys.all, "list"] as const,
  list: (filters: PropertyFilters) => [...propertyKeys.lists(), filters] as const,
  details: () => [...propertyKeys.all, "detail"] as const,
  detail: (id: string) => [...propertyKeys.details(), id] as const,
  featured: () => [...propertyKeys.all, "featured"] as const,
  stats: () => [...propertyKeys.all, "stats"] as const,
};

export function useProperties(filters: PropertyFilters = {}) {
  return useQuery({
    queryKey: propertyKeys.list(filters),
    queryFn: () => fetchProperties(filters),
  });
}

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: propertyKeys.detail(id ?? ""),
    queryFn: () => fetchProperty(id!),
    enabled: Boolean(id),
  });
}

export function useFeaturedProperties() {
  return useQuery({
    queryKey: propertyKeys.featured(),
    queryFn: fetchFeaturedProperties,
  });
}

export function useStats() {
  return useQuery({
    queryKey: propertyKeys.stats(),
    queryFn: fetchStats,
  });
}

export function useSubmitEnquiry() {
  return useMutation({
    mutationFn: (payload: EnquiryPayload) => submitEnquiry(payload),
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: (payload: ContactPayload) => submitContact(payload),
  });
}