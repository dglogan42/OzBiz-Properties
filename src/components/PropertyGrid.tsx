import { Link } from "react-router-dom";
import type { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <div className="empty-state">
        <h3>No properties found</h3>
        <p>
          Try adjusting your search filters or <Link to="/listings">view all listings</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}