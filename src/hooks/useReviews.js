import { useState } from "react";
import { initialReviews } from "../data/siteData";

/**
 * Manages review state for the Reviews section.
 *
 * PHASE 1 (current): reviews live in React state, seeded from
 * siteData.js. New submissions append instantly — feels dynamic, but
 * resets on page reload since nothing is persisted.
 *
 * PHASE 2 (later): swap the body of `addReview` for a Supabase insert,
 * and seed `reviews` from a fetch instead of `initialReviews`. The
 * return shape (reviews / addReview / isSubmitting / error) stays the
 * same, so ReviewForm and Reviews.jsx don't need to change at all.
 */
export function useReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const addReview = async ({ name, rating, text }) => {
    setError(null);
    setIsSubmitting(true);

    try {
      // Simulated network delay so the loading state behaves the same
      // way it will once this is a real API call in Phase 2.
      await new Promise((resolve) => setTimeout(resolve, 400));

      const newReview = {
        id: `local-${Date.now()}`,
        name,
        rating,
        text,
        date: new Date().toISOString().slice(0, 10),
      };

      setReviews((current) => [newReview, ...current]);
      return true;
    } catch {
      setError("Something went wrong submitting your review. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { reviews, addReview, isSubmitting, error };
}