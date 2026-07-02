export function LoadingGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="property-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="property-card skeleton-card">
          <div className="skeleton-image" />
          <div className="property-body">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-short" />
            <div className="skeleton-line skeleton-medium" />
          </div>
        </div>
      ))}
    </div>
  );
}