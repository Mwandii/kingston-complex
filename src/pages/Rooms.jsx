import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { accommodation, roomsPage, brand } from "../data/siteData";
import { buildWhatsAppLink } from "../utils/whatsapp";
import FadeIn from "../components/ui/FadeIn";
import Badge from "../components/ui/Badge";
import { IconShower, IconTv, IconCoffee, IconDesk, IconWater, IconUsers } from "../components/ui/icons";

const amenityIconMap = {
  shower: { Icon: IconShower, label: "Hot shower" },
  tv: { Icon: IconTv, label: "TV" },
  coffee: { Icon: IconCoffee, label: "Breakfast included" },
  desk: { Icon: IconDesk, label: "Work desk" },
  water: { Icon: IconWater, label: "Bottled water" },
};

/**
 * Full room listing. Each tier gets its own anchor id so the homepage
 * teaser's "Deluxe" card (linking to /rooms#deluxe) lands directly on
 * that tier instead of the top of the page.
 */
export default function Rooms() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const timeoutId = setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [location.hash]);

  return (
    <div className="pt-24">
      <div className="section-container py-12">
        <FadeIn direction="up">
          <Badge tone="dark">{roomsPage.badge}</Badge>
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <h1 className="section-heading mt-6">{roomsPage.heading}</h1>
        </FadeIn>
        <FadeIn direction="up" delay={150}>
          <p className="text-[color:var(--color-neutral-600)] max-w-2xl">{roomsPage.subheading}</p>
        </FadeIn>
      </div>

      <div className="divide-y divide-[color:var(--color-neutral-200)]">
        {accommodation.rooms.map((room, index) => {
          const message = `Hi, I'd like to book the ${room.name} room (${room.price}${room.priceUnit}).`;
          const isImageLeft = index % 2 === 0;

          return (
            <section id={room.id} key={room.id} className="scroll-mt-24 py-16">
              <div className="section-container grid lg:grid-cols-2 gap-12 items-center">
                <FadeIn
                  direction={isImageLeft ? "right" : "left"}
                  className={isImageLeft ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                    <img
                      src={room.image.url}
                      alt={room.image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(event) => (event.currentTarget.style.display = "none")}
                    />
                  </div>
                </FadeIn>

                <div className={isImageLeft ? "lg:order-2" : "lg:order-1"}>
                  <FadeIn direction="up">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-semibold text-[color:var(--color-neutral-900)]">
                        {room.name}
                      </h2>
                      {room.featured && (
                        <span className="text-[11px] font-medium text-[color:var(--color-accent-600)] bg-[color:var(--color-accent-500)]/10 px-2 py-0.5 rounded-full">
                          Most booked
                        </span>
                      )}
                    </div>
                  </FadeIn>

                  <FadeIn direction="up" delay={50}>
                    <p className="text-lg mb-4">
                      <span className="font-semibold text-[color:var(--color-neutral-900)]">{room.price}</span>{" "}
                      <span className="text-[color:var(--color-neutral-500)]">{room.priceUnit}</span>
                    </p>
                  </FadeIn>

                  <FadeIn direction="up" delay={100}>
                    <p className="text-[color:var(--color-neutral-600)] mb-6">{room.description}</p>
                  </FadeIn>

                  <FadeIn direction="up" delay={150}>
                    <div className="flex flex-wrap gap-4 mb-8">
                      <span className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-neutral-600)]">
                        <IconUsers className="w-4 h-4" />
                        {room.capacity}
                      </span>
                      {room.amenities.map((key) => {
                        const amenity = amenityIconMap[key];
                        if (!amenity) return null;
                        const { Icon, label } = amenity;
                        return (
                          <span
                            key={key}
                            className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-neutral-600)]"
                          >
                            <Icon className="w-4 h-4" />
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  </FadeIn>

                  <FadeIn direction="up" delay={200}>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={buildWhatsAppLink(brand.whatsappNumber, message)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                      >
                        Book on WhatsApp
                      </a>
                      <a href={`tel:${brand.phone.replace(/\s+/g, "")}`} className="btn-outline-dark">
                        Call to book
                      </a>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}