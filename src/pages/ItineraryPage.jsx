import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { addItem, loadItinerary, removeItem } from "../features/itinerary/storage";
import Footer from "../components/footer";
const TRIP_TYPES = ["Adventure", "Relaxing", "Cultural", "Foodie", "Family", "Romantic"];

export default function ItineraryPage() {
  // form state
  const [where, setWhere] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [types, setTypes] = useState(new Set());

  // list state
  const [items, setItems] = useState([]);
  useEffect(() => setItems(loadItinerary()), []);

  const valid = useMemo(() => where.trim() && start && end && new Date(start) <= new Date(end), [where, start, end]);

  function toggleType(label) {
    const next = new Set(types);
    next.has(label) ? next.delete(label) : next.add(label);
    setTypes(next);
  }

  function submit(e) {
    e.preventDefault();
    if (!valid) return;
    const entry = {
      title: where.trim(),
      date: start, // we’ll keep both dates in notes as well
      type: "Trip",
      notes: `${start} → ${end} • ${Array.from(types).join(", ") || "General"}`,
    };
    const next = addItem(entry);
    setItems(next);

    // clear form
    setWhere("");
    setStart("");
    setEnd("");
    setTypes(new Set());
  }

  function onRemove(id) {
    const next = removeItem(id);
    setItems(next);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Figma-style blue planning panel */}
        <section className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-[#6b85a8] text-white shadow-lg">
            <div className="px-6 pt-6 text-center">
              <h1 className="text-3xl font-bold">Plan your Dream Trip</h1>
              <p className="mt-1 text-white/90">
                Tell us about your ideal getaway and we’ll help you start planning
              </p>
            </div>

            <form onSubmit={submit} className="px-6 pb-6 pt-4">
              {/* Where */}
              <div className="mt-3">
                <label className="block text-sm mb-1" htmlFor="where">Where do you want to go?</label>
                <input
                  id="where"
                  className="w-full rounded-md border border-white/30 bg-white text-gray-900 px-3 py-2 placeholder:text-gray-400"
                  placeholder="e.g., Paris, Japan, Coastal California"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                />
              </div>

              {/* Dates */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm mb-1" htmlFor="start">Start Date:</label>
                  <input
                    id="start"
                    type="date"
                    className="w-full rounded-md border border-white/30 bg-white text-gray-900 px-3 py-2"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="end">End Date:</label>
                  <input
                    id="end"
                    type="date"
                    className="w-full rounded-md border border-white/30 bg-white text-gray-900 px-3 py-2"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
              </div>

              {/* Trip type checkboxes (two columns on desktop) */}
              <div className="mt-5">
                <p className="text-sm mb-2">What kind of trip are you looking for?</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {TRIP_TYPES.map((t) => {
                    const checked = types.has(t);
                    return (
                      <label
                        key={t}
                        className={`flex items-center gap-2 rounded-md border px-3 py-2 ${
                          checked ? "bg-white text-gray-900 border-white" : "bg-[#7c96b7] border-white/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-blue-600"
                          checked={checked}
                          onChange={() => toggleType(t)}
                        />
                        <span className="text-sm">{t}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex justify-center">
                <button
                  disabled={!valid}
                  className="rounded-md bg-[#ffd200] text-gray-900 font-semibold px-5 py-2 shadow hover:brightness-95 disabled:opacity-60"
                >
                  Start Planning My Trip
                </button>
              </div>

              {/* Helper text for validation */}
              {!valid && (where || start || end) && (
                <p className="mt-2 text-center text-sm text-white/90">
                  Please enter a destination and valid start/end dates.
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Itinerary list below the panel */}
        <section className="mx-auto max-w-3xl mt-10">
          <h2 className="text-xl font-semibold mb-3">Your Itinerary</h2>
          {!items.length ? (
            <p className="text-gray-600">No items yet. Use the planner above to add your first trip.</p>
          ) : (
            <ul className="space-y-2">
              {items
                .slice()
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((it) => (
                  <li key={it.id} className="border rounded-lg px-3 py-2 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{it.type}</span>
                    <span className="font-medium">{it.title}</span>
                    {it.notes && <span className="text-gray-500 text-sm">· {it.notes}</span>}
                    <button className="ml-auto text-red-600 hover:underline" onClick={() => onRemove(it.id)}>
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
