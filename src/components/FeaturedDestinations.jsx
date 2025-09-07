import { FEATURED } from "../data/featured";
import DestinationCard from "./DestinationCard";

export default function FeaturedDestinations() {
  return (
    <section className="mt-12" id="featured">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Featured Destinations</h2>
        <span className="text-sm text-gray-500">Curated for you</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((it) => (
          <DestinationCard key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
}