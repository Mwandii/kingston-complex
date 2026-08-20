import { useState } from "react";
import StarRating from "./StarRating";

const initialFormState = { name: "", rating: 0, text: "" };

/**
 * Review submission form. Validates locally before calling `onSubmit`
 * (wired to useReviews().addReview by the Reviews section) — empty
 * name/text, and a rating is required. Shows a brief success message
 * and resets after a successful submit.
 */
export default function ReviewForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    if (form.rating === 0) nextErrors.rating = "Please pick a rating.";
    if (!form.text.trim()) nextErrors.text = "Please share a few words about your visit.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSuccess(false);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const succeeded = await onSubmit(form);
    if (succeeded) {
      setForm(initialFormState);
      setShowSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6">
      <h3 className="font-semibold text-[color:var(--color-neutral-900)] mb-5">Leave a review</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="review-name" className="form-label">
            Your name
          </label>
          <input
            id="review-name"
            type="text"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="form-input"
            placeholder="e.g. Peter Kamau"
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <p className="form-label">Rating</p>
          <StarRating
            rating={form.rating}
            onChange={(value) => setForm((current) => ({ ...current, rating: value }))}
            size="w-6 h-6"
          />
          {errors.rating && <p className="text-xs text-red-600 mt-1">{errors.rating}</p>}
        </div>

        <div>
          <label htmlFor="review-text" className="form-label">
            Your review
          </label>
          <textarea
            id="review-text"
            rows={4}
            value={form.text}
            onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
            className="form-input resize-none"
            placeholder="Tell us about your stay, event, or meal..."
          />
          {errors.text && <p className="text-xs text-red-600 mt-1">{errors.text}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
          {isSubmitting ? "Submitting..." : "Submit review"}
        </button>

        {showSuccess && (
          <p className="text-sm text-[color:var(--color-brand-800)] text-center">
            Thanks for the feedback — your review has been added.
          </p>
        )}
      </div>
    </form>
  );
}