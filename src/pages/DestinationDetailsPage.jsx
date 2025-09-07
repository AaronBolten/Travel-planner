import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { loadItinerary, saveItinerary } from "../features/itinerary/storage";
import ErrorBanner from "../components/ErrorBanner";
import { DetailsPageSkeleton } from "../components/Skeletons";
import { getCityImage } from "../services/imagesProvider";
export default function DestinationDetailsPage(){
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    setItems(loadItinerary());

    // Simulate/replace with real API fetch for details
  (async () => {
      try {
        // For now infer name from id; real impl would pass proper name/country
        const name = id;
        const image = await getCityImage(name, "");
        const mock = { id, name, country: "—", image };
        if (alive) setCity(mock);
      } catch (e) {
        if (alive) setErr(e?.message ?? "Unable to load destination.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [id]);

  function addToTrip(){
    if (!city) return;
    const next = [...items, { type: "destination", id: city.id, name: city.name }];
    setItems(next); saveItinerary(next);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <ErrorBanner message={err} onClose={() => setErr("")} />
        {loading && <DetailsPageSkeleton />}

        {!loading && city && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <img src={city.image} alt="" className="rounded-xl h-64 w-full object-cover" />
              <h1 className="mt-4 text-3xl font-bold">{city.name}</h1>
              <p className="text-gray-600">{city.country}</p>

              <section className="mt-8">
                <h2 className="text-xl font-semibold">Top Attractions</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Attraction A</li><li>Attraction B</li><li>Attraction C</li>
                </ul>
              </section>
            </div>

            <aside className="border rounded-xl p-4 h-fit">
              <h3 className="font-semibold mb-2">Trip Planner</h3>
              <button
                onClick={addToTrip}
                className="w-full rounded bg-blue-600 text-white px-3 py-2 hover:bg-blue-700"
              >
                Add to Itinerary
              </button>
              <p className="text-xs text-gray-500 mt-2">Items in trip: {items.length}</p>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
