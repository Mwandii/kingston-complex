import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useBarBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await supabase
      .from("bar_bookings")
      .select("*")
      .order("event_date", { ascending: true });

    if (fetchError) {
      setError("Couldn't load bar bookings.");
    } else {
      setError(null);
      setBookings(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const addBooking = async (booking) => {
    const { data, error: insertError } = await supabase.from("bar_bookings").insert(booking).select().single();
    if (insertError) return { success: false, message: "Couldn't save the booking. Please try again." };

    await fetchBookings();
    return { success: true, data };
  };

  return { bookings, isLoading, error, addBooking };
}