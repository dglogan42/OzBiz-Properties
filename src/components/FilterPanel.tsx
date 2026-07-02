import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "@/stores/filterStore";
import { filtersToSearchParams } from "@/lib/utils";
import type { PropertyFilters } from "@/types/property";

export function FilterPanel({ initialFilters }: { initialFilters: PropertyFilters }) {
  const navigate = useNavigate();
  const { filters, setFilters, updateFilter, clearFilters, addRecentSearch } = useFilterStore();

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters, setFilters]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (filters.query) addRecentSearch(filters.query);
    const params = filtersToSearchParams(filters);
    const qs = params.toString();
    navigate(qs ? `/listings?${qs}` : "/listings");
  }

  function handleClear() {
    clearFilters();
    navigate("/listings");
  }

  return (
    <aside className="filter-panel">
      <h3>Filter Properties</h3>
      <form id="filter-form" onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="query">Keyword</label>
          <input
            type="text"
            id="query"
            name="query"
            placeholder="Suburb, city, keyword…"
            value={filters.query ?? ""}
            onChange={(e) => updateFilter("query", e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="state">State</label>
          <select id="state" name="state" value={filters.state ?? ""} onChange={(e) => updateFilter("state", e.target.value)}>
            <option value="">All States</option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="QLD">QLD</option>
            <option value="SA">SA</option>
            <option value="WA">WA</option>
            <option value="ACT">ACT</option>
            <option value="TAS">TAS</option>
            <option value="NT">NT</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="type">Property Type</label>
          <select id="type" name="type" value={filters.type ?? ""} onChange={(e) => updateFilter("type", e.target.value)}>
            <option value="">All Types</option>
            <option value="office">Office</option>
            <option value="retail">Retail</option>
            <option value="warehouse">Warehouse</option>
            <option value="industrial">Industrial</option>
            <option value="mixed-use">Mixed Use</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="listingType">Listing Type</label>
          <select
            id="listingType"
            name="listingType"
            value={filters.listingType ?? ""}
            onChange={(e) => updateFilter("listingType", e.target.value)}
          >
            <option value="">Buy or Lease</option>
            <option value="lease">For Lease</option>
            <option value="sale">For Sale</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="minArea">Min Area (m²)</label>
          <input
            type="number"
            id="minArea"
            name="minArea"
            placeholder="e.g. 100"
            min={0}
            value={filters.minArea ?? ""}
            onChange={(e) => updateFilter("minArea", e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="maxPrice">Max Price ($/sqm/year)</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="e.g. 800"
            min={0}
            value={filters.maxPrice ?? ""}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <button type="submit" className="btn-primary">
            Apply Filters
          </button>
          <button type="button" id="clear-filters" className="btn-secondary" onClick={handleClear}>
            Clear All
          </button>
        </div>
      </form>
    </aside>
  );
}