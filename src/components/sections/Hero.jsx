import { hero } from "../../data/siteData";
import { scrollToSection } from "../../utils/scrollToSection";
import FadeIn from "../ui/FadeIn";

/**
 * Hero. Deliberately NOT a full-bleed photo with text overlaid on top —
 * the real site photo is busy (signage, trees, parked cars) and text
 * laid over it fights for attention with whatever's in frame. Instead:
 * solid brand-colour panel carries the copy, and the photo sits in its
 * own framed card alongside it. Legible everywhere, no scrim needed.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[color:var(--color-brand-950)] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Soft decorative glow, purely for depth — doesn't affect text contrast */}
      <div
        aria-hidden="true"
        className="absolute -right-24 top-1/3 w-[420px] h-[420px] rounded-full bg-[color:var(--color-accent-500)]/20 blur-3xl"
      />

      <div className="relative section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copy column */}
        <div className="max-w-xl">
          <FadeIn direction="up">
            <p className="overline text-[color:var(--color-accent-400)]">{hero.eyebrow}</p>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h1 className="text-5xl md:text-6xl font-semibold text-white leading-[1.05] mb-5">
              {hero.heading}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <p className="text-lg text-white/80 mb-9">{hero.subheading}</p>
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

        {/* Photo column — framed, not full-bleed */}
        <FadeIn direction="left" delay={150} className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[5/4]">
            <img
              src={hero.imageUrl}
              alt="Kingston Complex — hotel, bar, accommodation and conference hall in Makindu"
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.parentElement.style.backgroundColor = "var(--color-brand-800)";
                event.currentTarget.style.display = "none";
              }}
            />
            {/* Gentle bottom scrim inside the frame only — keeps the card grounded, not for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          {/* Floating location badge */}
          <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-2 max-w-[80%]">
            <span aria-hidden="true">📍</span>
            <p className="text-sm font-medium text-[color:var(--color-neutral-900)]">{hero.badge}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}