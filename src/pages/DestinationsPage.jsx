import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import FeaturedDestinations from "../components/FeaturedDestinations";
import FiltersBar from "../components/FiltersBar";
import ErrorBanner from "../components/ErrorBanner";
import { DestinationCardSkeleton } from "../components/Skeletons";

export default function DestinationsPage() {
  // removed: const [query, setQuery] = useState("");
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [filters, setFilters] = useState({ country: "All", sort: "az" });

  const items = useMemo(() => {
    let arr = [...raw];
    if (filters.country && filters.country !== "All") {
      arr = arr.filter((x) => x.country === filters.country);
    }
    if (filters.sort === "az") arr.sort((a, b) => a.name.localeCompare(b.name));
    if (filters.sort === "za") arr.sort((a, b) => b.name.localeCompare(a.name));
    return arr;
  }, [raw, filters]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Destinations</h1>
            <p className="text-gray-600">Discover places around the world</p>
          </div>
          <div>
            <SearchBar
              onResults={setRaw}
              onLoading={setLoading}
              onError={setErr}
            />
          </div>
        </header>

        <ErrorBanner message={err} onClose={() => setErr("")} />

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <DestinationCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && !raw.length && (
          <>
            <FeaturedDestinations />
            <p className="mt-6 text-sm text-gray-500">
              Tip: Use the search bar above to look up any city (e.g. "Paris", "Tokyo").
            </p>
          </>
        )}

        {!loading && raw.length > 0 && (
          <>
            <FiltersBar items={raw} value={filters} onChange={setFilters} />
            <ResultsList items={items} />
            <p className="mt-4 text-sm text-gray-500">
              Showing {items.length} of {raw.length} results
            </p>
          </>
        )}
      </main>
    </>
  );
}
