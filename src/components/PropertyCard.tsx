import { Link } from "react-router-dom";
import { PROPERTY_TYPES } from "@/constants/property";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types/property";

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function PropertyCard({ property }: { property: Property }) {
  const listingLabel = property.listingType === "sale" ? "For Sale" : "For Lease";
  const listingClass = property.listingType === "sale" ? "badge-sale" : "badge-lease";

  return (
    <article className="property-card" data-id={property.id}>
      <Link to={`/property/${property.id}`} className="property-card-link">
        <div className={`property-image img-${property.image}`}>
          <span className={`property-badge ${listingClass}`}>{listingLabel}</span>
          <span className="property-type">{PROPERTY_TYPES[property.type]}</span>
        </div>
        <div className="property-body">
          <h3 className="property-title">{property.title}</h3>
          <p className="property-location">
            <LocationIcon />
            {property.suburb}, {property.state} {property.postcode}
          </p>
          <div className="property-meta">
            <span>{property.area.toLocaleString()} m²</span>
            {property.parking > 0 && <span>{property.parking} car spaces</span>}
          </div>
          <p className="property-price">{formatPrice(property)}</p>
        </div>
      </Link>
    </article>
  );
}