export default function Navbar() {
  return (
    <header className="border-b bg-white/60 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="font-semibold text-lg">Travel G</a>
        <nav className="hidden md:flex gap-6">
          <a href="/#discover" className="hover:underline">Discover</a>
          <a href="/#destinations" className="hover:underline">Destinations</a>
          <a href="/itinerary" className="hover:underline">Planning</a>
        </nav>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border">Sign in</button>
          <a href="/#start" className="px-3 py-1 rounded bg-blue-600 text-white">Get Started</a>
        </div>
      </div>
    </header>
  );
}

