import { useState } from "react";
import { conference, conferencePage, brand } from "../data/siteData";
import { buildWhatsAppLink } from "../utils/whatsapp";
import FadeIn from "../components/ui/FadeIn";
import Badge from "../components/ui/Badge";
import { IconUsers } from "../components/ui/icons";

const initialFormState = {
  name: "",
  phone: "",
  guests: "",
  date: "",
  timeSlot: "",
  addOns: [],
};

/**
 * Builds the WhatsApp message from the filled form — this is the
 * "quote request" itself; there's no backend involved, the form's only
 * job is to hand a clean, complete message off to WhatsApp.
 */
function buildQuoteMessage(form) {
  const lines = [
    "Hi, I'd like a quote for the conference hall.",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Guests: ${form.guests}`,
    `Date: ${form.date}`,
    `Time: ${form.timeSlot}`,
  ];
  if (form.addOns.length > 0) {
    lines.push(`Add-ons: ${form.addOns.join(", ")}`);
  }
  return lines.join("\n");
}

export default function Conference() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().slice(0, 10);

  const toggleAddOn = (label) => {
    setForm((current) => ({
      ...current,
      addOns: current.addOns.includes(label)
        ? current.addOns.filter((item) => item !== label)
        : [...current.addOns, label],
    }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    if (!form.phone.trim()) nextErrors.phone = "Please add a phone number.";
    if (!form.guests || Number(form.guests) < 1) nextErrors.guests = "Please add the number of guests.";
    if (!form.date) nextErrors.date = "Please pick a date.";
    if (!form.timeSlot) nextErrors.timeSlot = "Please pick a time.";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = buildQuoteMessage(form);
    window.open(buildWhatsAppLink(brand.whatsappNumber, message), "_blank", "noreferrer");
  };

  return (
    <div className="pt-24 pb-20 bg-[color:var(--color-neutral-50)] min-h-screen">
      <div className="section-container">
        <FadeIn direction="up">
          <Badge tone="dark">{conferencePage.badge}</Badge>
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <h1 className="section-heading mt-6">{conferencePage.heading}</h1>
        </FadeIn>
        <FadeIn direction="up" delay={150}>
          <p className="text-[color:var(--color-neutral-600)] max-w-2xl mb-4">{conferencePage.subheading}</p>
        </FadeIn>
        <FadeIn direction="up" delay={200}>
          <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-neutral-900)] mb-10">
            <IconUsers className="w-4 h-4 text-[color:var(--color-brand-800)]" />
            Seats up to {conference.capacity}
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={250}>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-[color:var(--color-neutral-200)] p-6 md:p-8 max-w-2xl"
          >
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="conf-name" className="form-label">
                  Your name
                </label>
                <input
                  id="conf-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="form-input"
                  placeholder="e.g. Peter Kamau"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="conf-phone" className="form-label">
                  Phone number
                </label>
                <input
                  id="conf-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  className="form-input"
                  placeholder="07xx xxx xxx"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-5">
              <div>
                <label htmlFor="conf-guests" className="form-label">
                  Number of guests
                </label>
                <input
                  id="conf-guests"
                  type="number"
                  min="1"
                  max="120"
                  value={form.guests}
                  onChange={(event) => setForm((current) => ({ ...current, guests: event.target.value }))}
                  className="form-input"
                  placeholder="e.g. 40"
                />
                {errors.guests && <p className="text-xs text-red-600 mt-1">{errors.guests}</p>}
              </div>

              <div>
                <label htmlFor="conf-date" className="form-label">
                  Date
                </label>
                <input
                  id="conf-date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                  className="form-input"
                />
                {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="conf-time" className="form-label">
                  Time
                </label>
                <select
                  id="conf-time"
                  value={form.timeSlot}
                  onChange={(event) => setForm((current) => ({ ...current, timeSlot: event.target.value }))}
                  className="form-input"
                >
                  <option value="">Select...</option>
                  {conferencePage.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.timeSlot && <p className="text-xs text-red-600 mt-1">{errors.timeSlot}</p>}
              </div>
            </div>

            <div className="mb-6">
              <p className="form-label">Add-ons (optional)</p>
              <div className="flex flex-wrap gap-3">
                {conference.addOns.map((label) => (
                  <label
                    key={label}
                    className={`inline-flex items-center gap-2 text-sm px-3.5 py-2 rounded-full border cursor-pointer transition-colors ${
                      form.addOns.includes(label)
                        ? "border-[color:var(--color-accent-500)] bg-[color:var(--color-accent-500)]/10 text-[color:var(--color-accent-600)]"
                        : "border-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-600)]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.addOns.includes(label)}
                      onChange={() => toggleAddOn(label)}
                      className="accent-[color:var(--color-accent-500)]"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto">
              Get a quote on WhatsApp
            </button>
          </form>
        </FadeIn>
      </div>
    </div>
  );
}