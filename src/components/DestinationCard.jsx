import { Link } from "react-router-dom";

export default function DestinationCard({ item }) {
  return (
    <Link to={`/destination/${item.id}`} className="group block rounded-xl border hover:shadow transition">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-44 object-cover rounded-t-xl"
          loading="lazy"
        />
      )}
      <div className="p-3">
        <div className="text-xs text-gray-500">{item.country}</div>
        <div className="font-semibold group-hover:underline">{item.name}</div>
      </div>
    </Link>
  );
}
