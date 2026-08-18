import { hero } from "../../data/siteData";
import { scrollToSection } from "../../utils/scrollToSection";
import FadeIn from "../ui/FadeIn";
import Badge from "../ui/Badge";
import HeroStats from "../ui/HeroStats";

/**
 * OPTION B — warm light background, text on one side, a layered collage
 * of three photos on the other (room / conference hall / exterior).
 * Borrows the Yow Island pattern: no single photo has to represent the
 * whole business — a few smaller ones, offset and layered, do it together.
 */
export default function HeroCollage() {
  const [roomImg, conferenceImg, exteriorImg] = hero.collageImages;

  return (
    <section className="relative min-h-screen bg-[color:var(--color-neutral-50)] flex items-center pt-24 pb-16 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/4 w-[420px] h-[420px] rounded-full bg-[color:var(--color-accent-500)]/10 blur-3xl"
      />

      <div className="relative section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copy column */}
        <div className="max-w-xl">
          <FadeIn direction="up">
            <Badge tone="dark">📍 {hero.eyebrow}</Badge>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h1 className="text-5xl md:text-6xl font-semibold text-[color:var(--color-neutral-900)] leading-[1.05] mt-6 mb-5">
              {hero.headingPrefix}{" "}
              <span className="text-[color:var(--color-accent-600)]">{hero.headingAccent}</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <p className="text-lg text-[color:var(--color-neutral-600)] mb-8">{hero.subheading}</p>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={hero.primaryCta.href}
                onClick={(event) => scrollToSection(event, hero.primaryCta.href)}
                className="btn-primary"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                onClick={(event) => scrollToSection(event, hero.secondaryCta.href)}
                className="btn-secondary"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <HeroStats stats={hero.stats} tone="dark" />
          </FadeIn>
        </div>

        {/* Photo collage column */}
        <FadeIn direction="left" delay={150} className="relative h-[480px] hidden lg:block">
          {/* Back card — conference hall, offset top-right */}
          <div className="absolute top-0 right-0 w-[62%] h-[55%] rounded-3xl overflow-hidden shadow-xl rotate-3">
            <img
              src={conferenceImg.url}
              alt={conferenceImg.alt}
              loading="eager"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>

          {/* Front card — room, offset bottom-left, layered over the back card */}
          <div className="absolute bottom-0 left-0 w-[58%] h-[62%] rounded-3xl overflow-hidden shadow-2xl -rotate-2">
            <img
              src={roomImg.url}
              alt={roomImg.alt}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>

          {/* Small accent card — exterior, tucked top-left */}
          <div className="absolute top-6 left-4 w-[34%] h-[30%] rounded-2xl overflow-hidden shadow-lg -rotate-6 border-4 border-white">
            <img
              src={exteriorImg.url}
              alt={exteriorImg.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>
        </FadeIn>

        {/* Mobile fallback — single photo, no layering (avoids a cramped stack on small screens) */}
        <FadeIn direction="up" delay={150} className="lg:hidden">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src={roomImg.url}
              alt={roomImg.alt}
              loading="eager"
              className="w-full h-full object-cover"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}