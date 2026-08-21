import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useRoomBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await supabase
      .from("room_bookings")
      .select("*")
      .order("check_in", { ascending: true });

    if (fetchError) {
      setError("Couldn't load room bookings.");
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
    const { error: insertError } = await supabase.from("room_bookings").insert(booking);
    if (insertError) return { success: false, message: "Couldn't save the booking. Please try again." };

    await fetchBookings();
    return { success: true };
  };

  return { bookings, isLoading, error, addBooking };
}