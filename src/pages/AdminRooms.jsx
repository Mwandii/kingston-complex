import { useMemo, useState } from "react";
import { useRoomBookings } from "../hooks/useRoomBookings";
import MiniMonthCalendar from "../components/admin/MiniMonthCalendar";
import {
  toDateKey,
  formatDisplayDate,
  getOccupiedDateKeys,
  isDateWithinStay,
} from "../utils/date";

const ROOM_TYPES = [
  { value: "standard", label: "Standard" },
  { value: "deluxe", label: "Deluxe" },
  { value: "executive", label: "Executive" },
];

const initialFormState = { clientName: "", phone: "", checkIn: "", checkOut: "", amountPaid: "" };

export default function AdminRooms() {
  const { bookings, isLoading, error, addBooking } = useRoomBookings();
  const [roomType, setRoomType] = useState("standard");
  const [selectedDateKey, setSelectedDateKey] = useState(() => toDateKey(new Date()));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
    setForm(initialFormState);
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
      room_type: roomType,
      check_in: form.checkIn,
      check_out: form.checkOut,
      amount_paid: Number(form.amountPaid),
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
      <h1 className="text-xl font-semibold text-[color:var(--color-neutral-900)] mb-6">Rooms</h1>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="flex gap-2 mb-6">
        {ROOM_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => {
              setRoomType(type.value);
              setIsFormOpen(false);
            }}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
              roomType === type.value
                ? "bg-[color:var(--color-brand-800)] text-white"
                : "bg-white border border-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-600)]"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

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
              {formatDisplayDate(selectedDateKey)} · {ROOM_TYPES.find((t) => t.value === roomType).label}
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
            <p className="text-sm text-[color:var(--color-neutral-500)]">Room free on this date.</p>
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
                      {formatDisplayDate(booking.check_in)} – {formatDisplayDate(booking.check_out)} ·{" "}
                      {booking.phone}
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
                  <label className="form-label">Check-in</label>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={(e) => setForm((f) => ({ ...f, checkIn: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.checkIn && <p className="text-xs text-red-600 mt-1">{formErrors.checkIn}</p>}
                </div>
                <div>
                  <label className="form-label">Check-out</label>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={(e) => setForm((f) => ({ ...f, checkOut: e.target.value }))}
                    className="form-input"
                  />
                  {formErrors.checkOut && <p className="text-xs text-red-600 mt-1">{formErrors.checkOut}</p>}
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