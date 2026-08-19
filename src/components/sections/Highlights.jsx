import { highlights } from "../../data/siteData";
import FadeIn from "../ui/FadeIn";

/**
 * Thin full-width band of quick logistics/amenity signals — payment,
 * WiFi, hours, parking. Deliberately separate content from Hero's stat
 * strip (room tiers / hall capacity / open daily) so nothing repeats.
 */
export default function Highlights() {
  return (
    <section className="bg-[color:var(--color-brand-900)]">
      <div className="section-container py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <FadeIn direction="up" delay={index * 80} key={item.label}>
            <div className="flex items-center justify-center md:justify-start gap-3 text-center md:text-left">
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>
              <p className="text-sm font-medium text-white/90">{item.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}