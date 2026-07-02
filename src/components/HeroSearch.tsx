import { useNavigate } from "react-router-dom";
import { useFilterStore } from "@/stores/filterStore";
import { filtersToSearchParams } from "@/lib/utils";

export function HeroSearch() {
  const navigate = useNavigate();
  const { filters, updateFilter, addRecentSearch } = useFilterStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (filters.query) addRecentSearch(filters.query);
    const params = filtersToSearchParams(filters);
    const qs = params.toString();
    navigate(qs ? `/listings?${qs}` : "/listings");
  }

  return (
    <form id="hero-search" className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search suburb, city or keyword…"
        aria-label="Search"
        value={filters.query ?? ""}
        onChange={(e) => updateFilter("query", e.target.value)}
      />
      <select
        name="type"
        aria-label="Property type"
        value={filters.type ?? ""}
        onChange={(e) => updateFilter("type", e.target.value)}
      >
        <option value="">All Types</option>
        <option value="office">Office</option>
        <option value="retail">Retail</option>
        <option value="warehouse">Warehouse</option>
        <option value="industrial">Industrial</option>
        <option value="mixed-use">Mixed Use</option>
      </select>
      <select
        name="listingType"
        aria-label="Listing type"
        value={filters.listingType ?? ""}
        onChange={(e) => updateFilter("listingType", e.target.value)}
      >
        <option value="">Buy or Lease</option>
        <option value="lease">For Lease</option>
        <option value="sale">For Sale</option>
      </select>
      <button type="submit">Search Properties</button>
    </form>
  );
}