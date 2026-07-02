const features = [
  {
    icon: "📊",
    title: "Market Intelligence",
    description:
      "Access detailed property data including area, pricing, amenities and comparable listings to inform your decision.",
  },
  {
    icon: "🔍",
    title: "Smart Search",
    description: "Filter by location, property type, listing type, area and price to find exactly what your business needs.",
  },
  {
    icon: "📞",
    title: "Direct Agent Access",
    description: "Every listing connects you directly with a dedicated commercial property agent — no middlemen, no delays.",
  },
];

export function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>About OzBiz Properties</h1>
          <p>Connecting Australian businesses with the right commercial spaces since 2011</p>
        </div>
      </div>

      <div className="container content-page">
        <p className="lead">
          OzBiz Properties is Australia&apos;s dedicated commercial real estate platform, specialising in office, retail,
          warehouse and industrial properties across every state and territory.
        </p>

        <div className="two-col" style={{ marginBottom: 48 }}>
          <div>
            <h2 style={{ color: "var(--navy)", marginBottom: 12, fontSize: "1.3rem" }}>Our Mission</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
              We believe finding the right business premises shouldn&apos;t be complicated. Whether you&apos;re a startup
              looking for your first office, a retailer expanding into a new market, or an investor acquiring industrial
              assets — OzBiz Properties provides the tools, data and expert guidance to make confident decisions.
            </p>
          </div>
          <div>
            <h2 style={{ color: "var(--navy)", marginBottom: 12, fontSize: "1.3rem" }}>What We Do</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
              From CBD towers in Sydney and Melbourne to logistics hubs in Brisbane and Perth, our portfolio covers the
              full spectrum of Australian commercial property. Our agents are local market specialists who understand the
              nuances of each precinct, council requirement and lease structure.
            </p>
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
    </>
  );
}