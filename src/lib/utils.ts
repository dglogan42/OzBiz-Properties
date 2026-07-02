import type { Property } from "@/types/property";

export function formatPrice(property: Property): string {
  if (property.priceUnit === "total") {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(property.price);
  }
  return `$${property.price.toLocaleString("en-AU")} / ${property.priceUnit}`;
}

export function filtersToSearchParams(filters: { [key: string]: string | undefined }): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params;
}

export function searchParamsToFilters(params: URLSearchParams): Record<string, string | undefined> {
  return {
    query: params.get("query") ?? undefined,
    state: params.get("state") ?? undefined,
    type: params.get("type") ?? undefined,
    listingType: params.get("listingType") ?? undefined,
    minArea: params.get("minArea") ?? undefined,
    maxPrice: params.get("maxPrice") ?? undefined,
  };
}