import { hero } from "../../data/siteData";
import { scrollToSection } from "../../utils/scrollToSection";
import FadeIn from "../ui/FadeIn";

/**
 * Full-bleed hero. Works here because the photo is a clean, calm stock
 * shot (not the busy real-site photo) — a gradient scrim is enough to
 * keep the text legible without needing to frame the image separately.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[color:var(--color-brand-950)]"
    >
      <img
        src={hero.imageUrl}
        alt="Kingston Complex — hotel, bar, accommodation and conference hall in Makindu"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      {/* Scrim for text legibility over the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />

      <div className="relative h-full section-container flex flex-col justify-center items-start max-w-3xl">
        <FadeIn direction="up">
          <p className="overline text-[color:var(--color-accent-400)]">{hero.eyebrow}</p>
        </FadeIn>

        <FadeIn direction="up" delay={100}>
          <h1 className="text-5xl md:text-7xl font-semibold text-white leading-[1.05] mb-5">
            {hero.heading}
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          <p className="text-lg text-white/85 mb-9 max-w-xl">{hero.subheading}</p>
        </FadeIn>

        <FadeIn direction="up" delay={300}>
          <div className="flex flex-wrap gap-4">
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
              className="btn-outline-light"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}