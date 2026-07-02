import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/listings", label: "Listings" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us", cta: true },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">Oz</div>
          OzBiz <span>Properties</span>
        </NavLink>
        <button
          className={`nav-toggle${menuOpen ? " active" : ""}`}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {navItems.map(({ to, label, end, cta }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [cta ? "nav-cta" : "", isActive ? "active" : ""].filter(Boolean).join(" ") || undefined
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}