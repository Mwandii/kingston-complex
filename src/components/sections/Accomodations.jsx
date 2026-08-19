import { Link } from "react-router-dom";
import { accommodation } from "../../data/siteData";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";
import RoomCard from "../ui/RoomCard";

/**
 * Homepage teaser for accommodation — three room-tier cards. Deliberately
 * light on detail (no per-room description) since the full listing with
 * booking flow lives on /rooms; this section's job is just to get people
 * to click through.
 */
export default function Accommodation() {
  return (
    <section id="accommodation" className="bg-[color:var(--color-neutral-50)] py-24">
      <div className="section-container">
        <FadeIn direction="up">
          <Badge tone="dark">{accommodation.badge}</Badge>
        </FadeIn>

        <FadeIn direction="up" delay={100}>
          <h2 className="section-heading mt-6">{accommodation.heading}</h2>
        </FadeIn>

        <FadeIn direction="up" delay={150}>
          <p className="text-[color:var(--color-neutral-600)] max-w-2xl mb-10">{accommodation.subheading}</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {accommodation.rooms.map((room, index) => (
            <FadeIn direction="up" delay={200 + index * 100} key={room.id}>
              <RoomCard room={room} />
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={500}>
          <Link
            to={accommodation.viewAllHref}
            className="inline-flex items-center gap-2 text-[color:var(--color-brand-800)] font-semibold text-sm border-b-2 border-[color:var(--color-accent-500)] pb-1 hover:gap-3 transition-all"
          >
            View all rooms →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}