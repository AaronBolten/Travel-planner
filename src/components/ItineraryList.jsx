export default function ItineraryList({ items = [], onRemove }) {
  if (!items.length) return <p className="text-sm text-gray-500">No items yet.</p>;
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="border rounded p-2 flex items-center justify-between">
          <span>{it.type}: {it.name}</span>
          <button className="text-red-600" onClick={() => onRemove?.(i)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
