import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingGrid } from "@/components/LoadingGrid";
import { PROPERTY_TYPES } from "@/constants/property";
import { useProperty } from "@/hooks/useProperties";
import { formatPrice } from "@/lib/utils";

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, isError, error, refetch } = useProperty(id);

  useEffect(() => {
    document.title = property
      ? `${property.title} — OzBiz Properties`
      : "Property Details — OzBiz Properties";
  }, [property]);

  if (isLoading) {
    return (
      <div className="container property-detail">
        <LoadingGrid count={1} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container property-detail">
        <ErrorMessage message={error.message} onRetry={() => refetch()} />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container property-detail">
        <div className="empty-state">
          <h3>Property not found</h3>
          <p>The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link to="/listings" className="btn-outline" style={{ marginTop: 16, display: "inline-flex" }}>
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  const listingLabel = property.listingType === "sale" ? "For Sale" : "For Lease";
  const listingClass = property.listingType === "sale" ? "badge-sale" : "badge-lease";
  const initials = property.agent.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="container property-detail">
      <div className="detail-layout">
        <div>
          <div className={`detail-gallery img-${property.image}`}>
            <span className={`property-badge ${listingClass}`} style={{ top: 20, left: 20 }}>
              {listingLabel}
            </span>
          </div>
          <div className="detail-header">
            <h1>{property.title}</h1>
            <p className="detail-address">
              <LocationIcon />
              {property.address}, {property.suburb} {property.state} {property.postcode}
            </p>
            <p className="detail-price">{formatPrice(property)}</p>
          </div>
          <div className="detail-stats">
            <div className="detail-stat">
              <strong>{property.area.toLocaleString()}</strong>
              <span>Area (m²)</span>
            </div>
            <div className="detail-stat">
              <strong>{PROPERTY_TYPES[property.type]}</strong>
              <span>Type</span>
            </div>
            <div className="detail-stat">
              <strong>{property.parking || "—"}</strong>
              <span>Car Spaces</span>
            </div>
            <div className="detail-stat">
              <strong>{property.floors}</strong>
              <span>Floor{property.floors > 1 ? "s" : ""}</span>
            </div>
          </div>
          <div className="detail-section">
            <h2>About This Property</h2>
            <p>{property.description}</p>
          </div>
          <div className="detail-section">
            <h2>Features & Amenities</h2>
            <ul className="amenities-list">
              {property.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <aside>
          <div className="sidebar-card">
            <div className="agent-info">
              <div className="agent-avatar">{initials}</div>
              <div>
                <h3>{property.agent.name}</h3>
                <p>Commercial Property Agent</p>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: 20 }}>
              <strong>Phone:</strong> {property.agent.phone}
              <br />
              <strong>Email:</strong> {property.agent.email}
            </p>
            <EnquiryForm property={property} />
          </div>
        </aside>
      </div>
    </div>
  );
}