import { useMemo } from "react";

export default function FiltersBar({ items = [], value, onChange }) {
  const countries = useMemo(() => {
    const set = new Set(items.map(x => x.country).filter(Boolean));
    return ["All", ...Array.from(set).sort((a,b)=>a.localeCompare(b))];
  }, [items]);

  const handle = (patch) => onChange?.({ ...value, ...patch });

  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Country</label>
        <select
          className="rounded border px-3 py-2"
          value={value.country || "All"}
          onChange={(e)=>handle({ country: e.target.value })}
        >
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Sort</label>
        <select
          className="rounded border px-3 py-2"
          value={value.sort || "az"}
          onChange={(e)=>handle({ sort: e.target.value })}
        >
          <option value="az">Name A → Z</option>
          <option value="za">Name Z → A</option>
        </select>
      </div>
    </div>
  );
}
