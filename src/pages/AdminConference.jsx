import { useMemo, useState } from "react";
import { useConferenceBookings } from "../hooks/useConferenceBookings";
import { usePayments } from "../hooks/usePayments";
import MiniMonthCalendar from "../components/admin/MiniMonthCalendar";
import { toDateKey, formatDisplayDate, formatTime } from "../utils/date";
import { SOURCE_OPTIONS } from "../utils/bookingSource";
import { getPaymentsForBooking, sumPayments } from "../utils/payments";

const initialFormState = {
  clientName: "",
  phone: "",
  startTime: "",
  endTime: "",
  totalPrice: "",
  initialPayment: "",
  paymentDate: "",
  source: "walk-in",
};

export default function AdminConference() {
  const { bookings, isLoading, error, addBooking } = useConferenceBookings();
  const { payments, addPayment } = usePayments();
  const [selectedDateKey, setSelectedDateKey] = useState(() => toDateKey(new Date()));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(() => ({ ...initialFormState, paymentDate: toDateKey(new Date()) }));
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [payingBookingId, setPayingBookingId] = useState(null);
  const [payAmount, setPayAmount] = useState("");
  const [payDate, setPayDate] = useState(() => toDateKey(new Date()));

  const bookedDateKeys = useMemo(() => new Set(bookings.map((b) => b.booking_date)), [bookings]);

  const bookingsForSelectedDate = useMemo(
    () => bookings.filter((b) => b.booking_date === selectedDateKey),
    [bookings, selectedDateKey]
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
    if (!form.startTime) errors.startTime = "Required";
    if (!form.endTime) errors.endTime = "Required";
    if (form.startTime && form.endTime && form.endTime <= form.startTime) {
      errors.endTime = "Must be after start time";
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
      booking_date: selectedDateKey,
      start_time: form.startTime,
      end_time: form.endTime,
      total_price: Number(form.totalPrice),
      source: form.source,
    });

    if (!bookingResult.success) {
      setIsSubmitting(false);
      setSubmitError(bookingResult.message);
      return;
    }

    const paymentResult = await addPayment({
      conference_booking_id: bookingResult.data.id,
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
      conference_booking_id: booking.id,
      amount: Number(payAmount),
      paid_on: payDate,
    });
    setPayingBookingId(null);
    setPayAmount("");
    setPayDate(toDateKey(new Date()));
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)] mb-6">Conference hall</h1>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
        <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-5">
          <MiniMonthCalendar
            bookedDateKeys={bookedDateKeys}
            selectedDateKey={selectedDateKey}
            onSelectDate={(dateKey) => {
              setSelectedDateKey(dateKey);
              setIsFormOpen(false);
            }}
          />
        </div>

        <div className="bg-white rounded-xl border border-[color:var(--color-neutral-200)] p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-semibold text-[color:var(--color-neutral-900)]">
              {formatDisplayDate(selectedDateKey)}
            </p>
            {!isFormOpen && (
              <button onClick={() => setIsFormOpen(true)} className="btn-secondary text-sm px-4 py-2">
                Add booking
              </button>
            )}
          </div>

          {isLoading ? (
            <p className="text-sm text-[color:var(--color-neutral-500)]">Loading...</p>
          ) : bookingsForSelectedDate.length === 0 && !isFormOpen ? (
            <p className="text-sm text-[color:var(--color-neutral-500)]">No bookings for this date.</p>
          ) : (
            <div className="space-y-3 mb-2">
              {bookingsForSelectedDate.map((booking) => {
                const paidSoFar = sumPayments(getPaymentsForBooking(payments, "conference", booking.id));
                const balance = booking.total_price - paidSoFar;

                return (
                  <div
                    key={booking.id}
                    className="border border-[color:var(--color-neutral-200)] rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[color:var(--color-neutral-900)]">
                          {booking.client_name}
                        </p>
                        <p className="text-xs text-[color:var(--color-neutral-500)]">
                          {formatTime(booking.start_time)} – {formatTime(booking.end_time)} · {booking.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[color:var(--color-neutral-900)]">
                          KSh {Number(booking.total_price).toLocaleString()}
                        </p>
                        {balance > 0 ? (
                          <p className="text-xs text-[color:var(--color-accent-600)]">
                            Balance: KSh {balance.toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-xs text-[color:var(--color-neutral-400)]">Paid in full</p>
                        )}
                      </div>
                    </div>

                    {balance > 0 &&
                      (payingBookingId === booking.id ? (
                        <div className="flex items-end gap-2 mt-3 pt-3 border-t border-[color:var(--color-neutral-100)]">
                          <div className="flex-1">
                            <label className="form-label">Amount (KSh)</label>
                            <input
                              type="number"
                              min="0"
                              max={balance}
                              value={payAmount}
                              onChange={(e) => setPayAmount(e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="form-label">Date</label>
                            <input
                              type="date"
                              value={payDate}
                              onChange={(e) => setPayDate(e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <button
                            onClick={() => handleAddPayment(booking)}
                            className="btn-primary text-sm px-4 py-2.5"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setPayingBookingId(null)}
                            className="text-sm text-[color:var(--color-neutral-500)] px-2 py-2.5"
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

          {isFormOpen && (
            <form onSubmit={handleSubmit} className="mt-5 pt-5 border-t border-[color:var(--color-neutral-100)]">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Client name</label>
                  <input
                    type="text"
                    value={form.clientName}
                    onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.clientName && <p className="text-xs text-red-600 mt-1">{formErrors.clientName}</p>}
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.phone && <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="form-label">Start time</label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.startTime && <p className="text-xs text-red-600 mt-1">{formErrors.startTime}</p>}
                </div>
                <div>
                  <label className="form-label">End time</label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.endTime && <p className="text-xs text-red-600 mt-1">{formErrors.endTime}</p>}
                </div>
                <div>
                  <label className="form-label">Total price (KSh)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.totalPrice}
                    onChange={(e) => setForm((f) => ({ ...f, totalPrice: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.totalPrice && <p className="text-xs text-red-600 mt-1">{formErrors.totalPrice}</p>}
                </div>
                <div>
                  <label className="form-label">Initial payment (KSh)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.initialPayment}
                    onChange={(e) => setForm((f) => ({ ...f, initialPayment: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.initialPayment && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.initialPayment}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Payment date</label>
                  <input
                    type="date"
                    value={form.paymentDate}
                    onChange={(e) => setForm((f) => ({ ...f, paymentDate: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.paymentDate && <p className="text-xs text-red-600 mt-1">{formErrors.paymentDate}</p>}
                </div>
                <div>
                  <label className="form-label">Source</label>
                  <select
                    value={form.source}
                    onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                    className="form-input"
                  >
                    {SOURCE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {submitError && <p className="text-sm text-red-600 mb-3">{submitError}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-sm px-5 py-2.5 disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save booking"}
                </button>
                <button type="button" onClick={resetForm} className="text-sm text-[color:var(--color-neutral-500)]">
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