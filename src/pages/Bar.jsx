import { useState } from "react";
import { barPage, brand } from "../data/siteData";
import { buildWhatsAppLink } from "../utils/whatsapp";
import FadeIn from "../components/ui/FadeIn";
import Badge from "../components/ui/Badge";
import MenuRow from "../components/ui/MenuRow";

const initialFormState = { name: "", phone: "", date: "", occasion: "" };

function buildReservationMessage(form) {
  const lines = [
    "Hi, I'd like to reserve the bar for a private event.",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Date: ${form.date}`,
  ];
  if (form.occasion.trim()) lines.push(`Occasion: ${form.occasion}`);
  return lines.join("\n");
}

export default function Bar() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().slice(0, 10);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    if (!form.phone.trim()) nextErrors.phone = "Please add a phone number.";
    if (!form.date) nextErrors.date = "Please pick a date.";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    window.open(
      buildWhatsAppLink(brand.whatsappNumber, buildReservationMessage(form)),
      "_blank",
      "noreferrer"
    );
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Header + banner */}
      <div className="section-container max-w-3xl">
        <FadeIn direction="up">
          <Badge tone="dark">{barPage.badge}</Badge>
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <h1 className="section-heading mt-6">{barPage.heading}</h1>
        </FadeIn>
        <FadeIn direction="up" delay={150}>
          <p className="text-[color:var(--color-neutral-600)] mb-8">{barPage.subheading}</p>
        </FadeIn>

        <FadeIn direction="up" delay={175}>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/9] mb-12">
            <img
              src={barPage.bannerImage.url}
              alt={barPage.bannerImage.alt}
              loading="eager"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>
        </FadeIn>

        {/* Menu */}
        <div className="space-y-10 mb-16">
          {barPage.menu.map((section, sectionIndex) => (
            <FadeIn direction="up" delay={100 + sectionIndex * 80} key={section.category}>
              <div>
                <h2 className="text-lg font-semibold text-[color:var(--color-neutral-900)] mb-4">
                  {section.category}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {section.items.map((item) => (
                    <MenuRow key={item.name} name={item.name} price={item.price} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Private event reservation — full-width tinted band, photo + form */}
      <section className="bg-[color:var(--color-neutral-50)] py-16">
        <div className="section-container grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src={barPage.reserveImage.url}
                alt={barPage.reserveImage.alt}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(event) => (event.currentTarget.style.display = "none")}
              />
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={100}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-[color:var(--color-neutral-200)] p-6 md:p-8"
            >
              <h3 className="font-semibold text-[color:var(--color-neutral-900)] mb-1">
                Reserve the bar
              </h3>
              <p className="text-sm text-[color:var(--color-neutral-500)] mb-5">
                No individual tables — this reserves the whole bar for your group.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="bar-name" className="form-label">
                    Your name
                  </label>
                  <input
                    id="bar-name"
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="form-input"
                    placeholder="e.g. James Otieno"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="bar-phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    id="bar-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    className="form-input"
                    placeholder="07xx xxx xxx"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="bar-date" className="form-label">
                    Date
                  </label>
                  <input
                    id="bar-date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                    className="form-input"
                  />
                  {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label htmlFor="bar-occasion" className="form-label">
                    Occasion (optional)
                  </label>
                  <input
                    id="bar-occasion"
                    type="text"
                    value={form.occasion}
                    onChange={(event) => setForm((current) => ({ ...current, occasion: event.target.value }))}
                    className="form-input"
                    placeholder="e.g. Birthday, send-off"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send reservation request
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}