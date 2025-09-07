import { amaFetch } from "../../services/amadeusClient";
import { enrichWithImages } from "../../services/imagesProvider";

const hasKeys = !!(import.meta.env.VITE_AMADEUS_API_KEY && import.meta.env.VITE_AMADEUS_API_SECRET);
const MOCK = import.meta.env.VITE_MOCK === "1" || !hasKeys;

export async function searchLocations(keyword) {
  const term = (keyword || "").trim();
  if (!term) return [];

  if (MOCK) {
    const base = [
      { id: "PAR", name: "Paris",  country: "France" },
      { id: "LON", name: "London", country: "United Kingdom" },
      { id: "NBO", name: "Nairobi", country: "Kenya" },
      { id: "DXB", name: "Dubai",  country: "United Arab Emirates" },
      { id: "TYO", name: "Tokyo",  country: "Japan" },
    ];
    const k = term.toLowerCase();
    const filtered = base.filter(
      (b) => b.name.toLowerCase().includes(k) || b.country.toLowerCase().includes(k)
    );
    return enrichWithImages(filtered);
  }

  const data = await amaFetch("/v1/reference-data/locations", {
    keyword: term,
    subType: "CITY",
  });

  const items = (data?.data || []).map((d) => ({
    id: d.iataCode || d.id || d.name,
    name: d.name,
    country: d.address?.countryName || d.address?.countryCode || "",
  }));

  return enrichWithImages(items);
}

