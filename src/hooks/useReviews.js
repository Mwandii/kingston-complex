import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Manages review state for the Reviews section.
 *
 * PHASE 2 (current): reviews are fetched from and written to a real
 * Supabase table (`reviews`) — no longer resets on refresh. Replaces
 * the PHASE 1 in-memory version; the return shape (reviews / addReview
 * / isSubmitting / error) is unchanged, so nothing else in the app
 * needed to change.
 */
export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      const { data, error: fetchError } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (fetchError) {
        setError("Couldn't load reviews right now. Please refresh the page.");
      } else {
        setReviews(data.map(mapRow));
      }
      setIsLoading(false);
    }

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const addReview = async ({ name, rating, text }) => {
    setError(null);
    setIsSubmitting(true);

    const { data, error: insertError } = await supabase
      .from("reviews")
      .insert({ name, rating, text })
      .select()
      .single();

    setIsSubmitting(false);

    if (insertError) {
      setError("Something went wrong submitting your review. Please try again.");
      return false;
    }

    setReviews((current) => [mapRow(data), ...current]);
    return true;
  };

  return { reviews, addReview, isLoading, isSubmitting, error };
}

/**
 * Maps a Supabase row (id / name / rating / text / created_at) to the
 * shape the UI components expect (id / name / rating / text / date).
 */
function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    rating: row.rating,
    text: row.text,
    date: row.created_at,
  };
}