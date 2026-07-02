import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PropertyFilters } from "@/types/property";

interface FilterState {
  filters: PropertyFilters;
  recentSearches: string[];
  setFilters: (filters: PropertyFilters) => void;
  updateFilter: (key: keyof PropertyFilters, value: string) => void;
  clearFilters: () => void;
  addRecentSearch: (query: string) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      filters: {},
      recentSearches: [],
      setFilters: (filters) => set({ filters }),
      updateFilter: (key, value) =>
        set({ filters: { ...get().filters, [key]: value || undefined } }),
      clearFilters: () => set({ filters: {} }),
      addRecentSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        const recent = [trimmed, ...get().recentSearches.filter((s) => s !== trimmed)].slice(0, 5);
        set({ recentSearches: recent });
      },
    }),
    { name: "ozbiz-filters", partialize: (state) => ({ recentSearches: state.recentSearches }) }
  )
);