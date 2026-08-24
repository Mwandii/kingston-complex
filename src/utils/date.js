/**
 * Formats a Date as "YYYY-MM-DD" using local time (not toISOString,
 * which uses UTC and can shift the day near midnight).
 */
export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** "2026-08-21" -> Date at local midnight */
export function parseDateKey(dateKey) {
  return new Date(`${dateKey}T00:00:00`);
}

export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * Expands a [checkIn, checkOut) date range into individual date keys —
 * checkout day itself isn't counted as an occupied night (guest leaves
 * that morning, so the room is bookable again from that date).
 */
export function getOccupiedDateKeys(checkInKey, checkOutKey) {
  const keys = [];
  let current = parseDateKey(checkInKey);
  const end = parseDateKey(checkOutKey);

  while (current < end) {
    keys.push(toDateKey(current));
    current = addDays(current, 1);
  }
  return keys;
}

/** True if `dateKey` falls within [checkInKey, checkOutKey). */
export function isDateWithinStay(dateKey, checkInKey, checkOutKey) {
  return dateKey >= checkInKey && dateKey < checkOutKey;
}
/** Sunday of the current week, as a date key. */
export function getWeekStartKey(date = new Date()) {
  const d = new Date(date);
  return toDateKey(addDays(d, -d.getDay()));
}

export function getWeekEndKey(date = new Date()) {
  return toDateKey(addDays(parseDateKey(getWeekStartKey(date)), 6));
}

export function getMonthEndKey(date = new Date()) {
  return toDateKey(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function getYearEndKey(date = new Date()) {
  return toDateKey(new Date(date.getFullYear(), 11, 31));
}

/** "2026-08-21" -> "21 Aug" (no year — compact for chart axes) */
export function formatShortDate(dateKey) {
  return parseDateKey(dateKey).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/** "2026-08" -> "Aug" */
export function formatMonthLabel(yearMonthKey) {
  const [year, month] = yearMonthKey.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-GB", { month: "short" });
}

/** First day of the current month, as a date key. */
export function getMonthStartKey(date = new Date()) {
  return toDateKey(new Date(date.getFullYear(), date.getMonth(), 1));
}

/** First day of the current year, as a date key. */
export function getYearStartKey(date = new Date()) {
  return toDateKey(new Date(date.getFullYear(), 0, 1));
}

/** "2026-08-21" -> "21 Aug 2026" */
export function formatDisplayDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** "14:00:00" -> "2:00 PM" */
export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}