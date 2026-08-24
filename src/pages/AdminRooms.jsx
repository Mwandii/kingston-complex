import { useMemo, useState } from "react";
import { useRoomBookings } from "../hooks/useRoomBookings";
import { usePayments } from "../hooks/usePayments";
import MiniMonthCalendar from "../components/admin/MiniMonthCalendar";
import {
  toDateKey,
  formatDisplayDate,
  getOccupiedDateKeys,
  isDateWithinStay,
} from "../utils/date";
import { SOURCE_OPTIONS } from "../utils/bookingSource";
import { getPaymentsForBooking, sumPayments } from "../utils/payments";

const ROOM_TYPES = [
  { value: "standard", label: "Standard" },
  { value: "deluxe", label: "Deluxe" },
  { value: "executive", label: "Executive" },
];

const initialFormState = {
  clientName: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  totalPrice: "",
  initialPayment: "",
  paymentDate: "",
  source: "walk-in",
};

export default function AdminRooms() {
  const { bookings, isLoading, error, addBooking } = useRoomBookings();
  const { payments, addPayment } = usePayments();
  const [roomType, setRoomType] = useState("standard");
  const [selectedDateKey, setSelectedDateKey] = useState(() => toDateKey(new Date()));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(() => ({ ...initialFormState, paymentDate: toDateKey(new Date()) }));
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [payingBookingId, setPayingBookingId] = useState(null);
  const [payAmount, setPayAmount] = useState("");
  const [payDate, setPayDate] = useState(() => toDateKey(new Date()));

  const bookingsForRoomType = useMemo(
    () => bookings.filter((b) => b.room_type === roomType),
    [bookings, roomType]
  );

  const bookedDateKeys = useMemo(() => {
    const keys = new Set();
    bookingsForRoomType.forEach((b) => {
      getOccupiedDateKeys(b.check_in, b.check_out).forEach((key) => keys.add(key));
    });
    return keys;
  }, [bookingsForRoomType]);

  const bookingsForSelectedDate = useMemo(
    () => bookingsForRoomType.filter((b) => isDateWithinStay(selectedDateKey, b.check_in, b.check_out)),
    [bookingsForRoomType, selectedDateKey]
  );

  const resetForm = () => {
    setForm({ ...initialFormState, paymentDate: toDateKey(new Date()) });
    setFormErrors({});
    setSubmitError(null);
    setIsFormOpen(false);
  };

  const validate = () => {
    const errors = {};
    if (!form.clientName.trim()) errors.clientName = "Required";
    if (!form.phone.trim()) errors.phone = "Required";
    if (!form.checkIn) errors.checkIn = "Required";
    if (!form.checkOut) errors.checkOut = "Required";
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) {
      errors.checkOut = "Must be after check-in";
    }
    if (!form.totalPrice || Number(form.totalPrice) <= 0) errors.totalPrice = "Required";
    if (!form.initialPayment || Number(form.initialPayment) <= 0) errors.initialPayment = "Required";
    if (Number(form.initialPayment) > Number(form.totalPrice)) {
      errors.initialPayment = "Can't exceed total price";
    }
    if (!form.paymentDate) errors.paymentDate = "Required";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    const bookingResult = await addBooking({
      client_name: form.clientName,
      phone: form.phone,
      room_type: roomType,
      check_in: form.checkIn,
      check_out: form.checkOut,
      total_price: Number(form.totalPrice),
      source: form.source,
    });

    if (!bookingResult.success) {
      setIsSubmitting(false);
      setSubmitError(bookingResult.message);
      return;
    }

    const paymentResult = await addPayment({
      room_booking_id: bookingResult.data.id,
      amount: Number(form.initialPayment),
      paid_on: form.paymentDate,
    });
    setIsSubmitting(false);

    if (paymentResult.success) {
      resetForm();
    } else {
      setSubmitError(`Booking saved, but the payment failed to record: ${paymentResult.message}`);
    }
  };

  const handleAddPayment = async (booking) => {
    if (!payAmount || Number(payAmount) <= 0) return;
    await addPayment({
      room_booking_id: booking.id,
      amount: Number(payAmount),
      paid_on: payDate,
    });
    setPayingBookingId(null);
    setPayAmount("");
    setPayDate(toDateKey(new Date()));
  };

  return (
    <div className="w-full min-w-0">
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)] mb-5 sm:mb-6">
        Rooms
      </h1>

      {error && <p className="text-sm text-red-600 mb-4 break-words">{error}</p>}

      {/* Room type filters */}
      <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
        {ROOM_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => {
              setRoomType(type.value);
              setIsFormOpen(false);
            }}
            className={`text-sm font-medium px-3 sm:px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              roomType === type.value
                ? "bg-[color:var(--color-brand-800)] text-white"
                : "bg-white border border-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-600)]"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Calendar + bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] gap-5 sm:gap-6 items-start min-w-0">
        <div className="w-full min-w-0 bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-4 sm:p-5">
          <MiniMonthCalendar
            bookedDateKeys={bookedDateKeys}
            selectedDateKey={selectedDateKey}
            onSelectDate={(dateKey) => {
              setSelectedDateKey(dateKey);
              setIsFormOpen(false);
            }}
          />
        </div>

        <div className="w-full min-w-0 bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <p className="font-semibold text-[color:var(--color-neutral-900)] break-words">
              {formatDisplayDate(selectedDateKey)} ·{" "}
              {ROOM_TYPES.find((t) => t.value === roomType).label}
            </p>

            {!isFormOpen && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="btn-secondary text-sm px-4 py-2 w-full sm:w-auto"
              >
                Add booking
              </button>
            )}
          </div>

          {isLoading ? (
            <p className="text-sm text-[color:var(--color-neutral-500)]">
              Loading...
            </p>
          ) : bookingsForSelectedDate.length === 0 && !isFormOpen ? (
            <p className="text-sm text-[color:var(--color-neutral-500)]">
              Room free on this date.
            </p>
          ) : (
            <div className="space-y-3 mb-2">
              {bookingsForSelectedDate.map((booking) => {
                const paidSoFar = sumPayments(
                  getPaymentsForBooking(payments, "room", booking.id)
                );
                const balance = booking.total_price - paidSoFar;

                return (
                  <div
                    key={booking.id}
                    className="min-w-0 border border-[color:var(--color-neutral-200)] rounded-lg px-3 sm:px-4 py-3"
                  >
                    {/* Booking details */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[color:var(--color-neutral-900)] break-words">
                          {booking.client_name}
                        </p>

                        <p className="text-xs text-[color:var(--color-neutral-500)] break-words">
                          {formatDisplayDate(booking.check_in)} –{" "}
                          {formatDisplayDate(booking.check_out)} · {booking.phone}
                        </p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-sm font-medium text-[color:var(--color-neutral-900)]">
                          KSh {Number(booking.total_price).toLocaleString()}
                        </p>

                        {balance > 0 ? (
                          <p className="text-xs text-[color:var(--color-accent-600)]">
                            Balance: KSh {balance.toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-xs text-[color:var(--color-neutral-400)]">
                            Paid in full
                          </p>
                        )}
                      </div>
                    </div>

                    {balance > 0 &&
                      (payingBookingId === booking.id ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] items-end gap-3 mt-3 pt-3 border-t border-[color:var(--color-neutral-100)]">
                          <div className="min-w-0">
                            <label className="form-label">Amount (KSh)</label>
                            <input
                              type="number"
                              min="0"
                              max={balance}
                              value={payAmount}
                              onChange={(e) => setPayAmount(e.target.value)}
                              className="form-input w-full"
                            />
                          </div>

                          <div className="min-w-0">
                            <label className="form-label">Date</label>
                            <input
                              type="date"
                              value={payDate}
                              onChange={(e) => setPayDate(e.target.value)}
                              className="form-input w-full"
                            />
                          </div>

                          <button
                            onClick={() => handleAddPayment(booking)}
                            className="btn-primary text-sm px-4 py-2.5 w-full sm:w-auto"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setPayingBookingId(null)}
                            className="text-sm text-[color:var(--color-neutral-500)] px-2 py-2.5 w-full sm:w-auto"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setPayingBookingId(booking.id)}
                          className="text-xs font-medium text-[color:var(--color-brand-800)] mt-2"
                        >
                          + Add payment
                        </button>
                      ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* Add booking form */}
          {isFormOpen && (
            <form
              onSubmit={handleSubmit}
              className="mt-5 pt-5 border-t border-[color:var(--color-neutral-100)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="min-w-0">
                  <label className="form-label">Client name</label>
                  <input
                    type="text"
                    value={form.clientName}
                    onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                    className="form-input w-full"
                  />
                  {formErrors.clientName && (
                    <p className="text-xs text-red-600 mt-1">
                      {formErrors.clientName}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="form-input w-full"
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-600 mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="form-label">Check-in</label>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={(e) => setForm((f) => ({ ...f, checkIn: e.target.value }))}
                    className="form-input w-full"
                  />
                  {formErrors.checkIn && (
                    <p className="text-xs text-red-600 mt-1">
                      {formErrors.checkIn}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="form-label">Check-out</label>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={(e) => setForm((f) => ({ ...f, checkOut: e.target.value }))}
                    className="form-input w-full"
                  />
                  {formErrors.checkOut && (
                    <p className="text-xs text-red-600 mt-1">
                      {formErrors.checkOut}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="form-label">Total price (KSh)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.totalPrice}
                    onChange={(e) => setForm((f) => ({ ...f, totalPrice: e.target.value }))}
                    className="form-input w-full"
                  />
                  {formErrors.totalPrice && (
                    <p className="text-xs text-red-600 mt-1">
                      {formErrors.totalPrice}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="form-label">Initial payment (KSh)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.initialPayment}
                    onChange={(e) => setForm((f) => ({ ...f, initialPayment: e.target.value }))}
                    className="form-input w-full"
                  />
                  {formErrors.initialPayment && (
                    <p className="text-xs text-red-600 mt-1">
                      {formErrors.initialPayment}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="form-label">Payment date</label>
                  <input
                    type="date"
                    value={form.paymentDate}
                    onChange={(e) => setForm((f) => ({ ...f, paymentDate: e.target.value }))}
                    className="form-input w-full"
                  />
                  {formErrors.paymentDate && (
                    <p className="text-xs text-red-600 mt-1">
                      {formErrors.paymentDate}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label className="form-label">Source</label>
                  <select
                    value={form.source}
                    onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                    className="form-input w-full"
                  >
                    {SOURCE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {submitError && (
                <p className="text-sm text-red-600 mb-3 break-words">
                  {submitError}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-sm px-5 py-2.5 disabled:opacity-60 w-full sm:w-auto"
                >
                  {isSubmitting ? "Saving..." : "Save booking"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-[color:var(--color-neutral-500)] px-2 py-2.5 w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
