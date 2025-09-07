// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever route or hash changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  const links = [
    { to: "/#discover", label: "Discover" },
    { to: "/#destinations", label: "Destinations" },
    { to: "/itinerary", label: "Planning" },
  ];

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="font-semibold text-lg">Travel G</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-semibold" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex gap-2">
          <button className="px-3 py-1 rounded border">Sign in</button>
          <NavLink to="/#start" className="px-3 py-1 rounded bg-blue-600 text-white">
            Get Started
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 border"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {!open ? (
            // Hamburger icon
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            // Close icon
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t bg-white shadow-sm ${open ? "block" : "hidden"}`}
      >
        <nav className="px-4 py-3 grid gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="py-2 text-gray-800 hover:underline"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 pb-4 flex gap-2">
          <button className="px-3 py-1 rounded border w-full">Sign in</button>
          <NavLink to="/#start" className="px-3 py-1 rounded bg-blue-600 text-white w-full text-center">
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
}


