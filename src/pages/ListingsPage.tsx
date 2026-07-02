import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage } from "@/components/ErrorMessage";
import { FilterPanel } from "@/components/FilterPanel";
import { LoadingGrid } from "@/components/LoadingGrid";
import { PropertyGrid } from "@/components/PropertyGrid";
import { useProperties } from "@/hooks/useProperties";
import { searchParamsToFilters } from "@/lib/utils";
import type { PropertyFilters } from "@/types/property";

export function ListingsPage() {
  const [searchParams] = useSearchParams();
  const filters = useMemo(
    () => searchParamsToFilters(searchParams) as PropertyFilters,
    [searchParams]
  );
  const { data, isLoading, isError, error, refetch } = useProperties(filters);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Commercial Property Listings</h1>
          <p>Browse office, retail, warehouse and industrial properties across Australia</p>
        </div>
      </div>

      <div className="container listings-layout">
        <FilterPanel initialFilters={filters} />
        <div>
          <div className="results-header">
            <p className="results-count">
              {isLoading ? "Loading…" : `${data?.length ?? 0} propert${data?.length === 1 ? "y" : "ies"} found`}
            </p>
          </div>
          {isLoading && <LoadingGrid count={6} />}
          {isError && <ErrorMessage message={error.message} onRetry={() => refetch()} />}
          {data && <PropertyGrid properties={data} />}
        </div>
      </div>
    </>
  );
}