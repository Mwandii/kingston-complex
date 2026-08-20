import { brand, location } from "../../data/siteData";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";
import { IconPin, IconPhone } from "../ui/icons";

/**
 * Location section — reuses `brand` (address/phone/whatsappNumber),
 * already defined in siteData.js for the Navbar, instead of duplicating
 * those fields here.
 */
export default function Location() {
  return (
    <section id="contact" className="bg-[color:var(--color-neutral-50)] py-24">
      <div className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copy column */}
        <div>
          <FadeIn direction="up">
            <Badge tone="dark">{location.badge}</Badge>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h2 className="section-heading mt-6">{location.heading}</h2>
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <p className="text-[color:var(--color-neutral-600)] mb-6">{location.subheading}</p>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <div className="space-y-3 text-sm text-[color:var(--color-neutral-700)] mb-8">
              <div className="flex items-center gap-2">
                <IconPin className="w-4 h-4 text-[color:var(--color-brand-800)]" />
                {brand.address}
              </div>
              <div className="flex items-center gap-2">
                <IconPhone className="w-4 h-4 text-[color:var(--color-brand-800)]" />
                {brand.phone}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={250}>
            <a
              href={`https://wa.me/${brand.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex"
            >
              Chat on WhatsApp
            </a>
          </FadeIn>
        </div>

        {/* Map column */}
        <FadeIn direction="left" delay={150}>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <iframe
              title="Kingston Complex location"
              src={location.mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}