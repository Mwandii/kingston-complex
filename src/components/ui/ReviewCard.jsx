import StarRating from "./StarRating";

/**
 * Formats "2026-06-12" as "12 Jun 2026" without pulling in a date library.
 */
function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ReviewCard({ review }) {
  const { name, rating, text, date } = review;

  return (
    <div className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-[color:var(--color-neutral-900)]">{name}</p>
        <StarRating rating={rating} />
      </div>
      <p className="text-sm text-[color:var(--color-neutral-600)] leading-relaxed mb-4">{text}</p>
      <p className="text-xs text-[color:var(--color-neutral-400)]">{formatDate(date)}</p>
    </div>
  );
}