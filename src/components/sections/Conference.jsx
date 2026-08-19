import { Link } from "react-router-dom";
import { conference } from "../../data/siteData";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";
import { IconUsers } from "../ui/icons";

/**
 * Conference hall teaser. Text on the left this time (mirrors Hero's
 * side, opposite of About) — keeps the alternating rhythm going as the
 * page scrolls. Links through to /conference for the actual quote form.
 */
export default function Conference() {
  return (
    <section id="conference" className="bg-white py-24">
      <div className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copy column */}
        <div>
          <FadeIn direction="up">
            <Badge tone="dark">{conference.badge}</Badge>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h2 className="section-heading mt-6">{conference.heading}</h2>
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <p className="text-[color:var(--color-neutral-600)] mb-6">{conference.subheading}</p>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <div className="flex items-center gap-2 mb-6 text-sm font-medium text-[color:var(--color-neutral-900)]">
              <IconUsers className="w-4 h-4 text-[color:var(--color-brand-800)]" />
              Seats up to {conference.capacity}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={250}>
            <div className="flex flex-wrap gap-2 mb-8">
              {conference.addOns.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[color:var(--color-neutral-100)] border border-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-600)] px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <Link to={conference.ctaHref} className="btn-secondary inline-flex">
              {conference.ctaLabel}
            </Link>
          </FadeIn>
        </div>

        {/* Photo column */}
        <FadeIn direction="left" delay={150}>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src={conference.image.url}
              alt={conference.image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}