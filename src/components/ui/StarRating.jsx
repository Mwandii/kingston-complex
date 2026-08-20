import { useState } from "react";
import { IconStar } from "./icons";

/**
 * Star rating. Two modes:
 * - Read-only (default): displays a fixed rating, used in ReviewCard.
 * - Interactive (`onChange` provided): click to set, hover to preview,
 *   used in ReviewForm's rating picker.
 */
export default function StarRating({ rating, onChange, size = "w-4 h-4" }) {
  const [hoverRating, setHoverRating] = useState(0);
  const isInteractive = typeof onChange === "function";
  const displayRating = isInteractive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={isInteractive ? () => setHoverRating(0) : undefined}
      role={isInteractive ? "radiogroup" : undefined}
      aria-label={isInteractive ? "Rating" : `Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) =>
        isInteractive ? (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            aria-pressed={rating === star}
            className="text-[color:var(--color-accent-500)] p-0.5"
          >
            <IconStar className={size} filled={star <= displayRating} />
          </button>
        ) : (
          <span key={star} className="text-[color:var(--color-accent-500)]" aria-hidden="true">
            <IconStar className={size} filled={star <= displayRating} />
          </span>
        )
      )}
    </div>
  );
}