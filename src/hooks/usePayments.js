import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function usePayments() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    const { data, error: fetchError } = await supabase
      .from("payments")
      .select("*")
      .order("paid_on", { ascending: true });

    if (fetchError) {
      setError("Couldn't load payments.");
    } else {
      setError(null);
      setPayments(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  /**
   * @param {object} payment - { amount, paid_on, room_booking_id | conference_booking_id | bar_booking_id }
   */
  const addPayment = async (payment) => {
    const { error: insertError } = await supabase.from("payments").insert(payment);
    if (insertError) return { success: false, message: "Couldn't record the payment. Please try again." };

    await fetchPayments();
    return { success: true };
  };

  return { payments, isLoading, error, addPayment };
}