import DestinationCard from "./DestinationCard";
export default function ResultsList({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-4">
      {items.map((it) => <DestinationCard key={it.id} item={it} />)}
    </div>
  );
}
