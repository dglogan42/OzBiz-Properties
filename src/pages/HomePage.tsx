import { Link } from "react-router-dom";
import { ErrorMessage } from "@/components/ErrorMessage";
import { HeroSearch } from "@/components/HeroSearch";
import { LoadingGrid } from "@/components/LoadingGrid";
import { PropertyGrid } from "@/components/PropertyGrid";
import { useFeaturedProperties, useStats } from "@/hooks/useProperties";

const features = [
  {
    icon: "🏢",
    title: "Nationwide Coverage",
    description:
      "Commercial listings across Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Hobart and beyond.",
  },
  {
    icon: "📋",
    title: "Every Property Type",
    description: "From CBD office towers to industrial warehouses — find the right space for your business needs.",
  },
  {
    icon: "🤝",
    title: "Expert Agents",
    description:
      "Local specialists who understand your market. Get personalised advice on lease negotiations and acquisitions.",
  },
];

export function HomePage() {
  const featured = useFeaturedProperties();
  const stats = useStats();

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-badge">Australia&apos;s Commercial Property Specialists</span>
          <h1>
            Find Your Next <em>Business Space</em>
          </h1>
          <p>
            Office, retail, warehouse and industrial properties across every major Australian city. Lease or buy — we
            make commercial real estate simple.
          </p>
          <HeroSearch />
        </div>
      </section>

      <div className="container stats-bar">
        <div className="stat-card">
          <strong>{stats.data?.totalListings ?? "—"}+</strong>
          <span>Active Listings</span>
        </div>
        <div className="stat-card">
          <strong>{stats.data?.states ?? "—"}</strong>
          <span>States & Territories</span>
        </div>
        <div className="stat-card">
          <strong>{stats.data?.propertyTypes ?? "—"}</strong>
          <span>Property Types</span>
        </div>
        <div className="stat-card">
          <strong>15+</strong>
          <span>Years Experience</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Featured Properties</h2>
              <p>Hand-picked commercial spaces ready for your business</p>
            </div>
            <Link to="/listings" className="btn-outline">
              View All Listings →
            </Link>
          </div>
          {featured.isLoading && <LoadingGrid count={4} />}
          {featured.isError && (
            <ErrorMessage message={featured.error.message} onRetry={() => featured.refetch()} />
          )}
          {featured.data && <PropertyGrid properties={featured.data} />}
        </div>
      </section>

      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Why OzBiz Properties?</h2>
              <p>Trusted by Australian businesses nationwide</p>
            </div>
          </div>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}