import { highlights } from "../../data/siteData";
import { IconCard, IconWifi, IconClock, IconParking } from "../ui/icons";

const iconMap = {
  card: IconCard,
  wifi: IconWifi,
  clock: IconClock,
  parking: IconParking,
};

/**
 * Thin full-width band of quick logistics/amenity signals — payment,
 * WiFi, hours, parking. No FadeIn here on purpose: a persistent trust
 * strip like this should always be visible, not wait to scroll into
 * view like the larger story sections do.
 */
export default function Highlights() {
  return (
    <section className="bg-[color:var(--color-brand-900)]">
      <div className="section-container py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {highlights.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div
              key={item.label}
              className="flex items-center justify-center md:justify-start gap-3 text-center md:text-left"
            >
              <Icon className="w-5 h-5 text-[color:var(--color-accent-400)] shrink-0" />
              <p className="text-sm font-medium text-white/90">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}