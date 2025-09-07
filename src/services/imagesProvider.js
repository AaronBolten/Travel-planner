const CACHE = new Map();

function slugifyCity(city = "") {
  return city
    .toLowerCase()
    .replace(/\./g, "")          // "st. louis" -> "st louis"
    .replace(/\s+/g, "-")        // spaces to dashes
    .replace(/[^\w-]/g, "");     // keep a-z0-9_
}


function unsplashFallback(city, country) {
  const q = encodeURIComponent(`${city} ${country || ""} skyline`);
  // Randomized image per load; append &auto=format to get webp/jpg
  return `https://source.unsplash.com/featured/800x600?${q}&auto=format`;
}

/** Try Teleport Urban Areas first, else Unsplash */
export async function getCityImage(city, country) {
  if (!city) return "/placeholder.jpg";
  const key = `${city}|${country || ""}`;
  if (CACHE.has(key)) return CACHE.get(key);

  // Teleport slug examples: "paris" => "paris", "rio de janeiro" => "rio-de-janeiro"
  const slug = slugifyCity(city);
  const teleportURL = `https://api.teleport.org/api/urban_areas/slug:${slug}/images/`;

  try {
    const res = await fetch(teleportURL, { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      const link = data?.photos?.[0]?.image?.web || data?.photos?.[0]?.image?.mobile;
      if (link) {
        CACHE.set(key, link);
        return link;
      }
    }
    // If Teleport 404s or returns empty, fall through
  } catch {
    // network issue -> continue to fallback
  }

  const url = unsplashFallback(city, country);
  CACHE.set(key, url);
  return url;
}

export async function enrichWithImages(items = []) {
  const enriched = await Promise.all(
    items.map(async (it) => ({
      ...it,
      image: it.image || (await getCityImage(it.name, it.country)),
    }))
  );
  return enriched;
}