import { useMemo, useState } from "react";
import { useBarBookings } from "../hooks/useBarBookings";
import MiniMonthCalendar from "../components/admin/MiniMonthCalendar";
import { toDateKey, formatDisplayDate } from "../utils/date";
import { SOURCE_OPTIONS } from "../utils/bookingSource";

const initialFormState = { clientName: "", phone: "", occasion: "", amountPaid: "", source: "walk-in" };

export default function AdminBar() {
  const { bookings, isLoading, error, addBooking } = useBarBookings();
  const [selectedDateKey, setSelectedDateKey] = useState(() => toDateKey(new Date()));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const bookedDateKeys = useMemo(() => new Set(bookings.map((b) => b.event_date)), [bookings]);

  const bookingsForSelectedDate = useMemo(
    () => bookings.filter((b) => b.event_date === selectedDateKey),
    [bookings, selectedDateKey]
  );

  const resetForm = () => {
    setForm(initialFormState);
    setFormErrors({});
    setSubmitError(null);
    setIsFormOpen(false);
  };

  const validate = () => {
    const errors = {};
    if (!form.clientName.trim()) errors.clientName = "Required";
    if (!form.phone.trim()) errors.phone = "Required";
    if (!form.amountPaid || Number(form.amountPaid) <= 0) errors.amountPaid = "Required";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    const result = await addBooking({
      client_name: form.clientName,
      phone: form.phone,
      event_date: selectedDateKey,
      occasion: form.occasion.trim() || null,
      amount_paid: Number(form.amountPaid),
      source: form.source,
    });
    setIsSubmitting(false);

    if (result.success) {
      resetForm();
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)] mb-6">Bar</h1>
      <p className="text-sm text-[color:var(--color-neutral-500)] mb-6">
        Whole-bar reservations for private events — not individual tables.
      </p>

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
                Add reservation
              </button>
            )}
          </div>

          {isLoading ? (
            <p className="text-sm text-[color:var(--color-neutral-500)]">Loading...</p>
          ) : bookingsForSelectedDate.length === 0 && !isFormOpen ? (
            <p className="text-sm text-[color:var(--color-neutral-500)]">No reservation for this date.</p>
          ) : (
            <div className="space-y-3 mb-2">
              {bookingsForSelectedDate.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border border-[color:var(--color-neutral-200)] rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[color:var(--color-neutral-900)]">
                      {booking.client_name}
                    </p>
                    <p className="text-xs text-[color:var(--color-neutral-500)]">
                      {booking.occasion || "Private event"} · {booking.phone}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[color:var(--color-neutral-900)]">
                    KSh {Number(booking.amount_paid).toLocaleString()}
                  </p>
                </div>
              ))}
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
                  <label className="form-label">Occasion (optional)</label>
                  <input
                    type="text"
                    value={form.occasion}
                    onChange={(e) => setForm((f) => ({ ...f, occasion: e.target.value }))}
                    className="form-input"
                    placeholder="e.g. Birthday, send-off"
                  />
                </div>
                <div>
                  <label className="form-label">Amount paid (KSh)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.amountPaid}
                    onChange={(e) => setForm((f) => ({ ...f, amountPaid: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.amountPaid && <p className="text-xs text-red-600 mt-1">{formErrors.amountPaid}</p>}
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
                  {isSubmitting ? "Saving..." : "Save reservation"}
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