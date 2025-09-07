const AMA_BASE = "https://test.api.amadeus.com";

let tokenCache = { token: "", exp: 0 };

async function getToken() {
  const now = Date.now();
  if (tokenCache.token && now < tokenCache.exp) return tokenCache.token;

  const key = import.meta.env.VITE_AMADEUS_API_KEY;
  const secret = import.meta.env.VITE_AMADEUS_API_SECRET;

  if (!key || !secret) {
    throw new Error("Missing Amadeus credentials. Set VITE_AMADEUS_API_KEY and VITE_AMADEUS_API_SECRET.");
  }

  const res = await fetch(`${AMA_BASE}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: key,
      client_secret: secret,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token error ${res.status}: ${text}`);
  }

  const data = await res.json();
  tokenCache = { token: data.access_token, exp: now + (data.expires_in - 60) * 1000 };
  return tokenCache.token;
}

export async function amaFetch(path, params = {}) {
  const token = await getToken();
  const url = new URL(`${AMA_BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Amadeus ${res.status}: ${text}`);
  }
  return res.json();
}
