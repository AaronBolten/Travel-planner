import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import FeaturedDestinations from "../components/FeaturedDestinations";
import ErrorBanner from "../components/ErrorBanner";
import { DestinationCardSkeleton } from "../components/Skeletons";
import Footer from "../components/footer";
export default function HomePage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const hasResults = results && results.length > 0;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section id="discover" className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
              Find your next Adventure
            </h1>
            <p className="mt-2 text-gray-600">Search thousands of locations</p>
            <div className="mt-4">
              <SearchBar
                onResults={setResults}
                onLoading={setLoading}
                onError={setErr}
              />
            </div>
            <div className="mt-3 flex gap-2">
              {["Mountains", "Forests", "Parks"].map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-blue-50 border">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <img
            src="/rhino-new.jpg"
            alt="Hero"
             className="w-full h-[420px] object-cover" 
            loading="lazy"
          />
        </section>

        <section id="destinations" className="mt-12">
          <ErrorBanner message={err} onClose={() => setErr("")} />

          {loading && (
            <>
              <h2 className="text-2xl font-semibold mb-2">Searching…</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <DestinationCardSkeleton key={i} />
                ))}
              </div>
            </>
          )}

          {!loading && hasResults && (
            <>
              <h2 className="text-2xl font-semibold mb-2">Search Results</h2>
              <ResultsList items={results} />
            </>
          )}

          {!loading && !hasResults && <FeaturedDestinations />}
        </section>
      </main>
       <Footer />
    </>
  );
}
