import { Link } from "react-router-dom";

export function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="footer-bottom" style={{ border: "none", paddingTop: 0 }}>
            <span>&copy; 2026 OzBiz Properties Pty Ltd. ABN 60 667 794 934</span>
            <span>
              <Link to="/" style={{ color: "rgba(255,255,255,0.7)" }}>
                Back to Home
              </Link>
            </span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo" style={{ color: "white" }}>
              <div className="logo-icon">Oz</div>
              OzBiz <span>Properties</span>
            </Link>
            <p>
              Australia&apos;s trusted platform for commercial property. Connecting businesses with premium office,
              retail, warehouse and industrial spaces since 2011.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/listings">All Listings</Link>
              </li>
              <li>
                <Link to="/listings?type=office">Offices</Link>
              </li>
              <li>
                <Link to="/listings?type=retail">Retail</Link>
              </li>
              <li>
                <Link to="/listings?type=warehouse">Warehouses</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:1300693249">1300 OZBIZ (693249)</a>
              </li>
              <li>
                <a href="mailto:hello@ozbiz.com.au">hello@ozbiz.com.au</a>
              </li>
              <li>
                Level 12, 1 Martin Place
                <br />
                Sydney NSW 2000
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 OzBiz Properties Pty Ltd. ABN 60 667 794 934</span>
          <span>ACN 667 794 934</span>
        </div>
      </div>
    </footer>
  );
}