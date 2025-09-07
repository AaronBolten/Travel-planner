import { useState } from "react";
import { searchLocations } from "../features/search/api";

export default function SearchBar({ onResults, onLoading, onError }) {
  const [q, setQ] = useState("");

  async function go() {
    const term = q.trim();
    if (!term) return;
    onError?.("");          // clear
    onLoading?.(true);
    try {
      const items = await searchLocations(term);
      onResults?.(items ?? []);
    } catch (e) {
      onError?.(e?.message ?? "Unable to fetch destinations.");
    } finally {
      onLoading?.(false);
    }
  }

  return (
    <div className="flex gap-2">
      <input
        className="w-full md:w-96 rounded border px-3 py-2"
        placeholder="Search city or country"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && go()}
      />
      <button
        onClick={go}
        className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}
