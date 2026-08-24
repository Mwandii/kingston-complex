/**
 * Filters the full payments list down to those belonging to one
 * specific booking (identified by its type and id).
 */
export function getPaymentsForBooking(payments, bookingType, bookingId) {
  const fkColumn = `${bookingType}_booking_id`;
  return payments.filter((p) => p[fkColumn] === bookingId);
}

export function sumPayments(payments) {
  return payments.reduce((sum, p) => sum + Number(p.amount), 0);
}