import { formatDisplayDate, formatTime } from "./date";
import { getPaymentsForBooking, sumPayments } from "./payments";

export const ROOM_LABELS = { standard: "Standard room", deluxe: "Deluxe room", executive: "Executive room" };

/**
 * Normalizes room + conference + bar bookings into one shape so the
 * Bookings table, Dashboard's schedule/activity feed, and the Finance
 * page can all share the same merge logic.
 *
 * `amount` is the booking's TOTAL agreed price — this is what revenue
 * reporting uses, attributed to the service date (sortKey), regardless
 * of when it was actually paid. `paidSoFar`/`balance` (from `payments`,
 * when provided) are for operational display only — "has this booking
 * been fully paid yet" — not for revenue timing.
 */
export function mergeBookings(roomBookings, conferenceBookings, barBookings = [], payments = []) {
  const withPaymentStatus = (row, bookingType, bookingId) => {
    const paidSoFar = sumPayments(getPaymentsForBooking(payments, bookingType, bookingId));
    return { ...row, paidSoFar, balance: row.amount - paidSoFar };
  };

  const roomRows = roomBookings.map((b) =>
    withPaymentStatus(
      {
        id: `room-${b.id}`,
        bookingId: b.id,
        bookingType: "room",
        category: "rooms",
        service: ROOM_LABELS[b.room_type] ?? b.room_type,
        client: b.client_name,
        phone: b.phone,
        dateDisplay: formatDisplayDate(b.check_in),
        detail: `${formatDisplayDate(b.check_in)} – ${formatDisplayDate(b.check_out)}`,
        amount: b.total_price,
        sortKey: b.check_in,
        createdAt: b.created_at,
        source: b.source,
      },
      "room",
      b.id
    )
  );

  const conferenceRows = conferenceBookings.map((b) =>
    withPaymentStatus(
      {
        id: `conf-${b.id}`,
        bookingId: b.id,
        bookingType: "conference",
        category: "conference",
        service: "Conference hall",
        client: b.client_name,
        phone: b.phone,
        dateDisplay: formatDisplayDate(b.booking_date),
        detail: `${formatTime(b.start_time)} – ${formatTime(b.end_time)}`,
        amount: b.total_price,
        sortKey: b.booking_date,
        createdAt: b.created_at,
        source: b.source,
      },
      "conference",
      b.id
    )
  );

  const barRows = barBookings.map((b) =>
    withPaymentStatus(
      {
        id: `bar-${b.id}`,
        bookingId: b.id,
        bookingType: "bar",
        category: "bar",
        service: "Bar (private event)",
        client: b.client_name,
        phone: b.phone,
        dateDisplay: formatDisplayDate(b.event_date),
        detail: b.occasion || "Private event",
        amount: b.total_price,
        sortKey: b.event_date,
        createdAt: b.created_at,
        source: b.source,
      },
      "bar",
      b.id
    )
  );

  return [...roomRows, ...conferenceRows, ...barRows];
}