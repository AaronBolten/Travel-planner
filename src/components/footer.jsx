// src/components/Footer.jsx
import { NavLink } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  const nav = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/itinerary", label: "Planning" },
  ];

  return (
    <footer className="border-t bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="font-semibold text-lg">Travel G</div>
            <p className="mt-2 text-sm text-gray-600">
              Discover places. Plan trips. Travel smarter.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-2">
            {nav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm text-gray-700 hover:underline"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Contact & social */}
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <a
                href="mailto:hello@example.com"
                className="text-sm text-gray-700 hover:underline"
              >
                travelplan@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-4">
              {/* Twitter/X */}
              <a aria-label="X" href="#" className="text-gray-600 hover:text-gray-900">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.244 2H21l-6.56 7.5L22 22h-6.778l-4.39-5.6L5.6 22H3l7.043-8.06L2 2h6.89l3.94 5.2L18.244 2zm-2.373 18h2.108L8.27 4H6.162l9.709 16z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a aria-label="LinkedIn" href="#" className="text-gray-600 hover:text-gray-900">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95C20.07 8.69 21 11 21 14.34V21h-4v-5.7c0-1.36-.03-3.12-1.9-3.12-1.9 0-2.2 1.49-2.2 3.02V21H9z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {year} Travel G. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:underline"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
