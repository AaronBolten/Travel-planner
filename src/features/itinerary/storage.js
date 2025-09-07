

const KEY = "travel_planner_itinerary";

export const loadItinerary = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

/** Persist the whole itinerary array to localStorage. */
export const saveItinerary = (items) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items || []));
  } catch {
    // ignore write errors (e.g., private mode quota)
  }
};

/** Generate a stable id if one isn’t provided on the item. */
const ensureId = (item) => {
  if (item && item.id) return item.id;

  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
};

/**
 * Add an item to the itinerary.
 * @param {Array} items 
 * @param {Object} item 
 * @returns {Array} 
 */
export const addItem = (items, item) => {
  const current = Array.isArray(items) ? items : [];
  const nextItem = { ...item, id: ensureId(item) };
  const next = [...current, nextItem];
  saveItinerary(next);
  return next;
};

/**
 * Remove an item by its index (legacy helper).
 * @param {Array} items
 * @param {number} idx
 * @returns {Array} 
 */
export const removeAtIndex = (items, idx) => {
  const current = Array.isArray(items) ? items : [];
  const next = current.filter((_, i) => i !== idx);
  saveItinerary(next);
  return next;
};

/**
 * Remove an item by its id (used by ItineraryPage).
 * @param {Array} items 
 * @param {string} id  
 * @returns {Array} 
 */
export const removeItem = (items, id) => {
  const current = Array.isArray(items) ? items : [];
  const next = current.filter((it) => it.id !== id);
  saveItinerary(next);
  return next;
};
